import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} The TCM Teach Podcast. For educational
          purposes; not a substitute for clinical training or supervision.
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/episodes" className="hover:text-ink">
            Episodes
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
