export type Episode = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // ISO date
  durationMinutes: number;
  topics: string[];
};

// Placeholder episodes so the layout can be built and reviewed.
// Replace with real episode data (or load from the podcast RSS feed).
export const episodes: Episode[] = [
  {
    number: 4,
    slug: "pulse-diagnosis-in-a-busy-clinic",
    title: "Pulse Diagnosis in a Busy Clinic",
    summary:
      "Keeping pulse taking accurate and reproducible when you're seeing a full schedule, and charting findings so they stay useful across visits.",
    publishedAt: "2026-09-16",
    durationMinutes: 48,
    topics: ["Diagnosis", "Clinical practice"],
  },
  {
    number: 3,
    slug: "shang-han-lun-for-modern-practice",
    title: "The Shang Han Lun for Modern Practice",
    summary:
      "Reading the six-channel framework as a working clinical tool rather than a historical text, with case examples from acute presentations.",
    publishedAt: "2026-09-02",
    durationMinutes: 56,
    topics: ["Classics", "Herbal medicine"],
  },
  {
    number: 2,
    slug: "needle-technique-and-de-qi",
    title: "Needle Technique and De Qi",
    summary:
      "Insertion, manipulation, and what de qi actually tells you — plus how to explain the sensation to nervous first-time patients.",
    publishedAt: "2026-08-19",
    durationMinutes: 42,
    topics: ["Acupuncture", "Technique"],
  },
  {
    number: 1,
    slug: "why-tcm-teach",
    title: "Why TCM Teach?",
    summary:
      "An introduction to the show: who it's for, what we'll cover, and why ongoing clinical education matters after graduation.",
    publishedAt: "2026-08-05",
    durationMinutes: 31,
    topics: ["Introduction"],
  },
];

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
