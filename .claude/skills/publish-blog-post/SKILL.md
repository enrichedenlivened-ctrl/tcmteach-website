---
name: publish-blog-post
description: Publish a blog post to tcmteach.com from text the user pastes or attaches in chat. Use whenever the user gives you an article, blog post, or draft and asks to post, publish, upload, or add it to the website or blog — or asks to update or remove an existing post.
---

# Publish a blog post to tcmteach.com

The user writes the post; you turn it into a Markdown file in `content/blog/`, check it builds, and push it to `main`. Vercel deploys `main` to tcmteach.com automatically, so the post is live a minute or two after the push.

How the blog works: `lib/blog.ts` reads every `content/blog/*.md` file (skipping names that start with `_`), and the file name becomes the URL. `content/blog/_template.md` shows the expected format.

## 1. Gather the details

From the user's message, take:

- **Title** — use theirs. If they gave none, propose one from the content and say so in your final report.
- **Body** — their words, verbatim.
- **Date** — the date they give, otherwise today (`date +%F`).
- **Description** — use theirs if given. Otherwise write one or two plain sentences (120–160 characters) summarizing the post; it appears in Google results and link previews. Report it back so they can change it.
- **Cover image** (optional) — an image they attach and say is the cover/header image.

Only ask a question if the post itself is missing or ambiguous (e.g. two drafts and it's unclear which). Don't ask about things you can default.

## 2. Pick the file name (slug)

Lowercase words from the title joined with dashes, `.md` extension, about 3–8 words, dropping filler words where it stays readable: "How to Price Your Acupuncture Sessions Without Guilt" → `price-acupuncture-sessions-without-guilt.md`.

Check `content/blog/` first. If the name is taken by a different post, choose another. Never rename an already-published post's file to "tidy" it — that breaks its URL and any search ranking it has.

## 3. Write the file

```markdown
---
title: "The Title"
description: "The description."
date: 2026-11-20
author: "Matthew Sabey Smith"
image: "/blog-images/slug-cover.jpg"
---

Body in Markdown.
```

- Wrap `title` and `description` in double quotes; escape any `"` inside them as `\"`. Leave `date` unquoted, as `YYYY-MM-DD`. Omit `image` when there is no cover image. Keep `author` as shown unless the user names another author.
- **Do not edit the user's writing.** No rewording, trimming, adding intros or conclusions, or "SEO improvements" to the text. Only convert formatting to Markdown: headings, bold/italic, bullet and numbered lists, links, quotes. Fix only paste artifacts (stray HTML, smart-quote mojibake, doubled blank lines).
- The page already shows the title as the main heading, so drop a first line that just repeats the title, and use `##` for the post's top-level section headings (`###` below that) — never `#`.
- Keep links the user included. Links to other pages on this site should be relative (`/episodes`, `/about`, `/blog/other-slug`).

### Images

Images the user attaches in chat arrive with a local file path (shown as `source: /tmp/.../images/N.ext`). Copy each into `public/blog-images/`, named after the slug: `slug-cover.jpg`, `slug-1.png`, `slug-2.png`, keeping the original extension. Reference them as `/blog-images/<name>`: in the front matter `image:` field for the cover, and as `![short description of the image](/blog-images/<name>)` in the body where the user placed them (or after the paragraph they relate to if unclear). Never hotlink images from other websites.

## 4. Check it builds

```bash
[ -d node_modules ] || npm install
npm run build
```

The route list printed at the end must include `/blog/<slug>`. If it doesn't, the post was skipped — the build log shows a `Skipping blog post` warning naming what's missing (usually the title or a valid date); fix the front matter and rebuild. Also run `npm run lint`.

Ignore `YOUTUBE_API_KEY is not set` errors during the build: that key only exists on Vercel, and the build still succeeds without it.

## 5. Publish

```bash
git add content/blog/<slug>.md public/blog-images/   # only the files for this post
git commit -m "Add blog post: <Title>"
git push origin main
```

The post goes live only once it is on `main`. If your session instructions restrict you to a different working branch, commit there, then ask the user once to confirm pushing to `main` before you do.

## 6. Report back

Tell the user, briefly:

- the URL: `https://tcmteach.com/blog/<slug>` (live in a minute or two)
- the title, and the description you used (offer to change either)
- anything you assumed or changed: a proposed title, the date used, removed paste artifacts

## Updating or removing a post

- **Update**: edit the existing file in place. Keep the file name, and the original `date` unless the user asks to change it. Commit as `Update blog post: <Title>`.
- **Remove**: delete the Markdown file and any `public/blog-images/<slug>-*` files it alone uses. Commit as `Remove blog post: <Title>`. Confirm with the user before removing a post.
