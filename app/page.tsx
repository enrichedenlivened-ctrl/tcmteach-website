import Image from "next/image";
import Link from "next/link";
import EpisodeCard from "@/components/EpisodeCard";
import { getEpisodes } from "@/lib/podcast-feed";
import { site } from "@/lib/site";

const focusAreas = [
  {
    title: "Marketing & content",
    body: "Content marketing, storytelling, podcasting, and social media that actually work for acupuncturists and herbalists.",
  },
  {
    title: "Attracting & keeping patients",
    body: "Building trust, communicating value, and attracting patients who pay for the care you provide.",
  },
  {
    title: "Business & legal foundations",
    body: "Choosing a business structure, pricing, and the legal side of running a clinic and selling herbal formulas.",
  },
  {
    title: "Brand & growth",
    body: "Building a TCM brand from scratch and growing a sustainable, thriving practice over time.",
  },
];

export const revalidate = 3600;

export default async function Home() {
  const { episodes } = await getEpisodes();
  const [latest, ...recent] = episodes;

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <Image
            src="/logo.jpg"
            alt="The TCM Teach Podcast"
            width={900}
            height={900}
            priority
            className="h-32 w-32 object-contain sm:h-40 sm:w-40"
          />
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-cinnabar">
            For acupuncturists & TCM herbalists
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {site.name}, hosted by {site.host.name}, {site.host.credentials}, is
            the show for practitioners who want their clinic to be a business
            as strong as their medicine. Weekly episodes on topics such as
            marketing, business logistics, legal frameworks, financial tips,
            and additional revenue drivers utilizing your degree.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/episodes"
              className="rounded-lg bg-jade px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-jade-dark"
            >
              Browse episodes
            </Link>
            <a
              href={site.links.patreon}
              className="rounded-lg bg-cinnabar px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              Join the membership
            </a>
            <Link
              href="/about"
              className="rounded-lg border border-line bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-jade"
            >
              About the show
            </Link>
          </div>
        </div>
      </section>

      {latest && (
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold">Latest episode</h2>
          <div className="mt-6">
            <EpisodeCard episode={latest} />
          </div>

          {recent.length > 0 && (
            <>
              <div className="mt-12 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-2xl font-semibold">
                  Recent episodes
                </h2>
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
            </>
          )}
        </section>
      )}

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold">What we cover</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Each episode is made for working practitioners — whether
            you&apos;re newly licensed or years into practice and ready to
            grow.
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

      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="rounded-2xl bg-jade-soft p-8 sm:p-10">
            <h2 className="font-serif text-2xl font-semibold text-jade-dark">
              Want more? Join the membership.
            </h2>
            <a
              href={site.links.patreon}
              className="mt-6 inline-block rounded-lg bg-jade px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-jade-dark"
            >
              View membership on Patreon
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
