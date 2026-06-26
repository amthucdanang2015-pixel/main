# Manh Nguyen Cong — Portfolio

A world-class, interactive portfolio for **Manh Nguyen Cong**, full-stack developer.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and Lenis smooth scroll.

## Highlights

- **Cinematic preloader** with animated counter and stack reveal.
- **Custom magnetic cursor**, scroll progress bar, aurora gradient background that reacts to the mouse.
- **Live web-project previews** — real production sites loaded inside a macOS-style browser frame, with an animated typewriter fallback when a site refuses to embed.
- **App Store showcase** — 12 live apps, featured ones with auto-playing iPhone screenshot carousels (Mobbin / spottedinprod style).
- **Scroll-driven experience timeline**, animated stats counters, references, and a recruiter-ready CV download.
- Fully responsive, reduced-motion aware, SEO metadata.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Regenerate the CV PDF

The downloadable CV lives at `public/Manh-Nguyen-CV.pdf` and is generated from:

```bash
pip install reportlab
python3 scripts/generate_cv.py
```

## Content

All copy and data live in `data/` (`content.ts`, `apps.ts`, `projects.ts`).
App icons and screenshots are in `public/apps/`.

## Deploy

Optimised for Vercel — push the repo and import, or run `vercel`. Output is fully static.
