# The TCM Teach Podcast — Website

Website for The TCM Teach Podcast, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — Home
- `app/episodes/page.tsx` — Episode list
- `app/about/page.tsx` — About
- `components/` — Header, footer, episode card
- `lib/episodes.ts` — Episode data (currently placeholder content)
- `app/globals.css` — Color tokens (jade, cinnabar, paper) and fonts

## Deploying

Import the repository into [Vercel](https://vercel.com/new). It detects Next.js automatically, so no configuration is needed.
