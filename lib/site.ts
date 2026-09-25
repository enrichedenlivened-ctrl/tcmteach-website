export const site = {
  name: "The TCM Teach Podcast",
  tagline:
    "Helping acupuncturists and Chinese medicine herbalists build thriving, sustainable businesses.",
  episodeCount: 47,
  host: {
    name: "Matthew Sabey Smith",
    credentials: "DACM, MSOM, Dipl.Ac., LAc.",
    bio: "Matthew Sabey Smith is a practitioner, professor, and business entrepreneur in Traditional Chinese Medicine. He teaches at the Phoenix Institute of Herbal Medicine and Acupuncture and works as an educator, coach, and speaker for acupuncturists and herbalists building their own practices.",
  },
  links: {
    patreon: "https://www.patreon.com/cw/theTCMTeach/membership",
    apple:
      "https://podcasts.apple.com/us/podcast/the-tcm-teach-podcast/id1865730362",
    audible: "https://www.audible.com/podcast/The-TCM-Teach-Podcast/B0GDS393Y3",
    amazonMusic:
      "https://music.amazon.com/podcasts/185d3b2b-79f4-45aa-9806-1591417e7072",
    libsyn: "https://sites.libsyn.com/602865",
  },
} as const;

export const listenLinks = [
  { label: "Apple Podcasts", href: site.links.apple },
  { label: "Amazon Music", href: site.links.amazonMusic },
  { label: "Audible", href: site.links.audible },
  { label: "All platforms", href: site.links.libsyn },
] as const;
