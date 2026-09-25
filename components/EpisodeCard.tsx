import { type Episode, formatDate } from "@/lib/episodes";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-muted">
        <span className="text-cinnabar">Episode {episode.number}</span>
        <span aria-hidden>·</span>
        <time dateTime={episode.publishedAt}>
          {formatDate(episode.publishedAt)}
        </time>
        <span aria-hidden>·</span>
        <span>{episode.durationMinutes} min</span>
      </div>
      <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">
        {episode.title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{episode.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {episode.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-full bg-jade-soft px-2.5 py-0.5 text-xs font-medium text-jade-dark"
          >
            {topic}
          </li>
        ))}
      </ul>
    </article>
  );
}
