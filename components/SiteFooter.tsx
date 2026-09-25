import Link from "next/link";
import { listenLinks, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-3">
          <a
            href={site.links.patreon}
            className="rounded-lg bg-cinnabar px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Join the membership
          </a>
          {listenLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-jade"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}.
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
      </div>
    </footer>
  );
}
