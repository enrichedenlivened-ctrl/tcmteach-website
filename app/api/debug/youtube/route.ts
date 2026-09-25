import { NextResponse } from "next/server";
import { getYoutubeDebugInfo } from "@/lib/youtube";

// Temporary diagnostic endpoint for wiring up YOUTUBE_API_KEY. Safe to
// remove once episode-to-video matching is confirmed working.
export async function GET() {
  const info = await getYoutubeDebugInfo();
  return NextResponse.json(info);
}
