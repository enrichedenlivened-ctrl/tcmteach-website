import type { Metadata } from "next";
import EpisodeCard from "@/components/EpisodeCard";
import { episodes } from "@/lib/episodes";

export const metadata: Metadata = {
  title: "Episodes",
  description: "All episodes of The TCM Teach Podcast.",
};

export default function EpisodesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Episodes
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Every episode, newest first.
      </p>
      <div className="mt-10 flex flex-col gap-4">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
    </div>
  );
}
