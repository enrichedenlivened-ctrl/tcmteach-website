import { type Episode, formatDate, getYoutubeVideoId } from "@/lib/episodes";
import { site } from "@/lib/site";
import YoutubeEmbed from "@/components/YoutubeEmbed";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const date = formatDate(episode.publishedAt);
  const videoId = episode.youtubeUrl ? getYoutubeVideoId(episode.youtubeUrl) : null;

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
      <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">{episode.title}</h3>
      {episode.summary && (
        <p className="mt-2 leading-relaxed text-muted">{episode.summary}</p>
      )}
      {videoId && (
        <div className="mt-4">
          <YoutubeEmbed videoId={videoId} title={episode.title} />
        </div>
      )}
      {episode.audioUrl && (
        <audio controls preload="none" className="mt-4 w-full" src={episode.audioUrl}>
          <a href={episode.audioUrl}>Download this episode</a>
        </audio>
      )}
      {!episode.audioUrl && (
        <a
          href={site.links.libsyn}
          className="mt-4 inline-block text-sm font-medium text-jade hover:text-jade-dark"
        >
          Listen to this episode →
        </a>
      )}
    </article>
  );
}
