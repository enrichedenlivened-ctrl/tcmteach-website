const CHANNEL_ID = "UCbW3DMqWh5UOa_Z0-UqmAaw";
const API_KEY = process.env.YOUTUBE_API_KEY;
const MAX_PAGES = 10; // 10 * 50 = up to 500 videos, far more than the channel needs

type PlaylistItem = { title: string; videoId: string };

type PlaylistItemsResponse = {
  nextPageToken?: string;
  items?: {
    snippet?: {
      title?: string;
      resourceId?: { videoId?: string };
    };
  }[];
};

function uploadsPlaylistId(channelId: string) {
  // YouTube convention: a channel's "uploads" playlist ID is its channel ID
  // with the UC prefix swapped for UU. Avoids a separate channels.list call.
  return channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : channelId;
}

async function fetchAllPlaylistItems(useCache: boolean): Promise<PlaylistItem[]> {
  if (!API_KEY) throw new Error("YOUTUBE_API_KEY is not set");

  const playlistId = uploadsPlaylistId(CHANNEL_ID);
  const items: PlaylistItem[] = [];
  let pageToken: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", API_KEY);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await fetch(
      url,
      useCache ? { next: { revalidate: 3600 } } : { cache: "no-store" },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`YouTube API request failed: ${response.status} ${body.slice(0, 300)}`);
    }

    const data: PlaylistItemsResponse = await response.json();

    for (const item of data.items ?? []) {
      const title = item.snippet?.title;
      const videoId = item.snippet?.resourceId?.videoId;
      if (title && videoId) items.push({ title, videoId });
    }

    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  return items;
}

function matchEpisodeNumber(title: string) {
  // Anchored + requires a colon so short-form clips like "Episode 12 dropped
  // today..." don't get matched over the actual full episode upload.
  const numberMatch = title.match(/^episode\s+(\d+)\s*:/i);
  return numberMatch ? Number(numberMatch[1]) : null;
}

export async function getYoutubeVideosByEpisode(): Promise<Map<number, string>> {
  const map = new Map<number, string>();

  try {
    const items = await fetchAllPlaylistItems(true);
    for (const { title, videoId } of items) {
      const number = matchEpisodeNumber(title);
      if (number !== null && !map.has(number)) {
        map.set(number, `https://www.youtube.com/watch?v=${videoId}`);
      }
    }
  } catch (error) {
    console.error("Failed to load YouTube channel videos:", error);
  }

  return map;
}

export async function getYoutubeDebugInfo() {
  if (!API_KEY) {
    return { hasApiKey: false, error: "YOUTUBE_API_KEY is not set in this environment" };
  }

  try {
    const items = await fetchAllPlaylistItems(false);
    const matched = items
      .map(({ title, videoId }) => ({ title, videoId, episode: matchEpisodeNumber(title) }))
      .filter((item) => item.episode !== null);

    return {
      hasApiKey: true,
      playlistId: uploadsPlaylistId(CHANNEL_ID),
      totalVideosFetched: items.length,
      matchedEpisodeCount: matched.length,
      sampleTitles: items.slice(0, 5).map((item) => item.title),
      matchedEpisodes: matched,
    };
  } catch (error) {
    return {
      hasApiKey: true,
      playlistId: uploadsPlaylistId(CHANNEL_ID),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
