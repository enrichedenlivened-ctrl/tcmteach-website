import { type Episode, fallbackEpisodes } from "@/lib/episodes";
import { getYoutubeVideosByEpisode } from "@/lib/youtube";

const FEED_URL = process.env.PODCAST_RSS_URL;

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .trim();
}

function tag(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decodeEntities(match[1]) : undefined;
}

function attr(block: string, tagName: string, attrName: string) {
  const match = block.match(new RegExp(`<${tagName}[^>]*\\s${attrName}="([^"]*)"`, "i"));
  return match ? match[1] : undefined;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

// Show notes often end with boilerplate (a "Key Topics" list, a Patreon
// plug, etc.) after the actual summary — cut everything from whichever of
// those comes first so only the descriptive summary is shown.
function cleanSummary(rawSummary: string) {
  const text = stripHtml(rawSummary);
  const boilerplateMarkers = [/key topics/i, /patreon/i];

  let cutIndex = text.length;
  for (const marker of boilerplateMarkers) {
    const match = text.match(marker);
    if (match?.index !== undefined && match.index < cutIndex) {
      cutIndex = match.index;
    }
  }

  return text.slice(0, cutIndex).trim().slice(0, 400);
}

function parseDurationToMinutes(raw: string | undefined) {
  if (!raw) return undefined;
  const parts = raw.split(":").map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  const seconds =
    parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : parts.length === 2
        ? parts[0] * 60 + parts[1]
        : parts[0];
  return Math.round(seconds / 60);
}

function toIsoDate(pubDate: string | undefined) {
  if (!pubDate) return "";
  const date = new Date(pubDate);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function parseFeed(xml: string): Episode[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items
    .map((item): Episode | null => {
      const title = tag(item, "title");
      if (!title) return null;

      const episodeNumber = tag(item, "itunes:episode");
      const pubDate = tag(item, "pubDate");
      const summarySource =
        tag(item, "itunes:summary") ?? tag(item, "description") ?? "";
      const audioUrl = attr(item, "enclosure", "url");

      const numberMatch = title.match(/episode\s+(\d+)/i);

      return {
        number: episodeNumber
          ? Number(episodeNumber)
          : numberMatch
            ? Number(numberMatch[1])
            : 0,
        slug:
          tag(item, "itunes:episodeType") === "trailer"
            ? "trailer"
            : title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
        title: title.replace(/^episode\s+\d+:\s*/i, ""),
        summary: cleanSummary(summarySource),
        publishedAt: toIsoDate(pubDate),
        durationMinutes: parseDurationToMinutes(tag(item, "itunes:duration")),
        audioUrl,
      };
    })
    .filter((episode): episode is Episode => episode !== null && episode.title.length > 0)
    .sort((a, b) => {
      if (a.number > 0 && b.number > 0 && a.number !== b.number) {
        return b.number - a.number;
      }
      return a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0;
    });
}

function withYoutubeLinks(episodes: Episode[], youtubeByEpisode: Map<number, string>) {
  if (youtubeByEpisode.size === 0) return episodes;

  return episodes.map((episode) => {
    const youtubeUrl = youtubeByEpisode.get(episode.number);
    return youtubeUrl ? { ...episode, youtubeUrl } : episode;
  });
}

async function fetchPodcastFeed(): Promise<{ episodes: Episode[]; isLive: boolean }> {
  if (!FEED_URL) {
    return { episodes: fallbackEpisodes, isLive: false };
  }

  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "tcmteach.com" },
    });

    if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);

    const xml = await response.text();
    const episodes = parseFeed(xml);

    if (episodes.length === 0) throw new Error("Feed parsed to zero episodes");

    return { episodes, isLive: true };
  } catch (error) {
    console.error("Failed to load podcast RSS feed, using fallback episodes:", error);
    return { episodes: fallbackEpisodes, isLive: false };
  }
}

export async function getEpisodes(): Promise<{ episodes: Episode[]; isLive: boolean }> {
  const [{ episodes, isLive }, youtubeByEpisode] = await Promise.all([
    fetchPodcastFeed(),
    getYoutubeVideosByEpisode(),
  ]);

  return { episodes: withYoutubeLinks(episodes, youtubeByEpisode), isLive };
}
