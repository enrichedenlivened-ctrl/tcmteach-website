"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.jpg"
            alt="The TCM Teach Podcast"
            width={900}
            height={900}
            priority
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          <nav aria-label="Main">
            <ul className="flex text-sm sm:gap-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-md px-2 py-2 transition-colors sm:px-3 ${
                        active
                          ? "bg-jade-soft font-medium text-jade-dark"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <a
            href={site.links.patreon}
            className="whitespace-nowrap rounded-md bg-cinnabar px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Join
          </a>
        </div>
      </div>
    </header>
  );
}
