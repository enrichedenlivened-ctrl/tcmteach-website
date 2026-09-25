const CHANNEL_ID = "UCbW3DMqWh5UOa_Z0-UqmAaw";
const API_KEY = process.env.YOUTUBE_API_KEY;
const MAX_PAGES = 10; // 10 * 50 = up to 500 videos, far more than the channel needs

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

export async function getYoutubeVideosByEpisode(): Promise<Map<number, string>> {
  const map = new Map<number, string>();

  if (!API_KEY) return map;

  const playlistId = uploadsPlaylistId(CHANNEL_ID);
  let pageToken: string | undefined;

  try {
    for (let page = 0; page < MAX_PAGES; page++) {
      const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("maxResults", "50");
      url.searchParams.set("key", API_KEY);
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status}`);
      }

      const data: PlaylistItemsResponse = await response.json();

      for (const item of data.items ?? []) {
        const title = item.snippet?.title;
        const videoId = item.snippet?.resourceId?.videoId;
        if (!title || !videoId) continue;

        const numberMatch = title.match(/episode\s+(\d+)/i);
        if (!numberMatch) continue;

        const number = Number(numberMatch[1]);
        if (!map.has(number)) {
          map.set(number, `https://www.youtube.com/watch?v=${videoId}`);
        }
      }

      if (!data.nextPageToken) break;
      pageToken = data.nextPageToken;
    }
  } catch (error) {
    console.error("Failed to load YouTube channel videos:", error);
  }

  return map;
}
