export const site = {
  name: "The TCM Teach Podcast",
  tagline:
    "Helping acupuncturists and Chinese medicine herbalists build thriving, sustainable businesses.",
  host: {
    name: "Matthew Sabey Smith",
    credentials: "DACM, MSOM, Dipl.Ac., LAc, CPT",
    bio: [
      "Matthew Sabey Smith is the founder and host of The TCM Teach Podcast, where he brings over a decade of frontline clinical and business experience to the practitioners and students who listen. He holds a Doctorate in Acupuncture and Chinese Medicine (DACM) from Pacific College of Oriental Medicine, including further graduate study in Health and Human Performance, and a Master of Science in Oriental Medicine from the Phoenix Institute of Herbal Medicine and Acupuncture. He is a Licensed Acupuncturist specializing in sports performance and rehabilitation.",
      "Matthew spent six years as a faculty member at the Phoenix Institute of Herbal Medicine and Acupuncture, teaching 11 different courses ranging from Practice Management and Integrative Case Management to Tui Na and Acupuncture Point Locations. He now serves as a faculty member at Yo San University, teaching Healthcare Business Management. A professional educator at heart, he also spent time as a classroom schoolteacher before moving fully into TCM practice and education. Through his company, Enriched Enlivened LLC, he provides business coaching and mentorship for TCM practitioners, builds CEU courses and workshops, and speaks professionally on topics ranging from TCM and sports medicine to entrepreneurship and modern marketing for ancient wisdom.",
      "Before TCM, Matthew built a career in strength and conditioning by founding Strength Smith Training Systems, coaching Olympic weightlifting and powerlifting, and training athletes at every level. He's also a former world record holder in powerlifting himself, a distinction that puts real, personal proof behind the performance principles he teaches. That combined background of clinical training, the classroom, elite strength coaching, and business acumen; that is what he draws on for The TCM Teach Podcast. This is the show that gives practitioners straight, practical guidance on how to run a real practice and business.",
    ],
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
