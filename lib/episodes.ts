export type Episode = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // ISO date, empty string if unknown
  durationMinutes?: number;
  topics: string[];
  audioUrl?: string;
  youtubeUrl?: string;
};

// Used only when PODCAST_RSS_URL isn't set, or the live feed can't be reached.
// A small sample of real, confirmed episode titles so the page never shows
// fabricated content. Publish dates and durations are intentionally omitted
// where they aren't confirmed.
export const fallbackEpisodes: Episode[] = [
  {
    number: 28,
    slug: "podcasting-youtube-as-an-acupuncturist",
    title: "Podcasting & YouTube As An Acupuncturist",
    summary:
      "Using podcasting and YouTube to build authority, connect with patients, and create a lasting educational resource.",
    publishedAt: "",
    topics: ["Marketing", "Content"],
  },
  {
    number: 25,
    slug: "social-media-for-acupuncturists-what-actually-works",
    title: "Social Media For Acupuncturists, What Actually Works",
    summary:
      "Practical, ethical social media strategy for acupuncturists and TCM practitioners, with an emphasis on authenticity and local engagement.",
    publishedAt: "",
    topics: ["Marketing", "Social media"],
  },
  {
    number: 24,
    slug: "attracting-patients-who-value-and-pay-for-care",
    title: "Attracting Patients Who Value and Pay for Care",
    summary: "How to attract and retain patients who value your care and pay for it.",
    publishedAt: "",
    topics: ["Patient attraction", "Business"],
  },
  {
    number: 22,
    slug: "storytelling-for-acupuncturists",
    title: "Storytelling for Acupuncturists: How to Explain What You Do",
    summary:
      "Using storytelling to explain Chinese medicine in a way that connects with patients.",
    publishedAt: "",
    topics: ["Storytelling", "Marketing"],
  },
  {
    number: 21,
    slug: "building-your-tcm-brand-from-scratch",
    title: "Building Your TCM Brand From Scratch",
    summary: "Building a clinic brand from the ground up.",
    publishedAt: "",
    topics: ["Branding"],
  },
  {
    number: 17,
    slug: "how-to-sell-herbal-formulas-legally-online",
    title: "How To Sell Herbal Formulas Legally Online",
    summary: "The legal and compliance side of selling herbal formulas online.",
    publishedAt: "",
    topics: ["Legal", "Herbal medicine"],
  },
  {
    number: 11,
    slug: "choosing-the-right-business-structure-llc",
    title: "Choosing the Right Business Structure (LLC)",
    summary: "Choosing the right legal structure when setting up a TCM practice.",
    publishedAt: "",
    topics: ["Business", "Legal"],
  },
];

export function formatDate(iso: string) {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
