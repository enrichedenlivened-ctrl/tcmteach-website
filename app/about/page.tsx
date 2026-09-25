import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About The TCM Teach Podcast.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        About the podcast
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          The TCM Teach Podcast is made for acupuncturists and Traditional
          Chinese Medicine practitioners who want to keep learning after
          graduation.
        </p>
        <p>
          Episodes focus on what matters in the treatment room: diagnostic
          skill, technique, classical theory applied to real cases, and the
          practical side of building a practice.
        </p>
        {/* TODO: add host bio, contact details, and listening links */}
      </div>
    </div>
  );
}
