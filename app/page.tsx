import Link from "next/link";
import EpisodeCard from "@/components/EpisodeCard";
import { episodes } from "@/lib/episodes";

const focusAreas = [
  {
    title: "Clinical skills",
    body: "Needling technique, point selection, pulse and tongue diagnosis — the hands-on work of the treatment room.",
  },
  {
    title: "Classical foundations",
    body: "The Nei Jing, Shang Han Lun, and other classics, read with an eye to how they inform real treatment decisions.",
  },
  {
    title: "Herbal medicine",
    body: "Formula construction, modification, and safety considerations for practitioners who prescribe.",
  },
  {
    title: "The business of practice",
    body: "Building a sustainable clinic, communicating with patients, and working alongside other healthcare providers.",
  },
];

export default function Home() {
  const [latest, ...recent] = episodes;

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-cinnabar">
            A podcast for practitioners
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Continuing education for acupuncturists and TCM practitioners.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            The TCM Teach Podcast explores Traditional Chinese Medicine from the
            clinic outward — practical technique, classical theory, and the
            realities of running a practice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/episodes"
              className="rounded-lg bg-jade px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-jade-dark"
            >
              Browse episodes
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-line bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-jade"
            >
              About the show
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold">Latest episode</h2>
        <div className="mt-6">
          <EpisodeCard episode={latest} />
        </div>

        <div className="mt-12 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold">Recent episodes</h2>
          <Link
            href="/episodes"
            className="text-sm font-medium text-jade hover:text-jade-dark"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recent.slice(0, 2).map((episode) => (
            <EpisodeCard key={episode.slug} episode={episode} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold">What we cover</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Each episode is made with working practitioners in mind — whether
            you&apos;re newly licensed or decades into practice.
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <div key={area.title} className="border-l-2 border-jade pl-4">
                <h3 className="font-semibold">{area.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
