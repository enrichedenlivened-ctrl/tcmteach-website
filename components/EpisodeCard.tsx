import { type Episode, formatDate } from "@/lib/episodes";
import { site } from "@/lib/site";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const date = formatDate(episode.publishedAt);

  return (
    <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-muted">
        {episode.number > 0 && (
          <span className="text-cinnabar">Episode {episode.number}</span>
        )}
        {date && (
          <>
            <span aria-hidden>·</span>
            <time dateTime={episode.publishedAt}>{date}</time>
          </>
        )}
        {episode.durationMinutes && (
          <>
            <span aria-hidden>·</span>
            <span>{episode.durationMinutes} min</span>
          </>
        )}
      </div>
      <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">
        {episode.audioUrl ? (
          <a href={episode.audioUrl} className="hover:text-jade-dark">
            {episode.title}
          </a>
        ) : (
          episode.title
        )}
      </h3>
      {episode.summary && (
        <p className="mt-2 leading-relaxed text-muted">{episode.summary}</p>
      )}
      {episode.topics.length > 0 && (
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
      )}
      <a
        href={episode.audioUrl ?? site.links.libsyn}
        className="mt-4 inline-block text-sm font-medium text-jade hover:text-jade-dark"
      >
        Listen to this episode →
      </a>
    </article>
  );
}
