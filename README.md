# TexFix Studio

Company website for [TexFix Studio](https://texfixstudio.com) — a custom software agency building websites, web apps, and SaaS platforms.

Built with Next.js App Router, TypeScript, Tailwind CSS, and GSAP.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | GSAP, Lenis, Framer Motion |
| UI Primitives | Radix UI, shadcn/ui |
| Icons | Iconify, Lucide React |
| Deployment | Vercel |

---

## Project Structure

```
app/
  layout.tsx          # Root layout with metadata and global providers
  page.tsx            # Home page
  about/              # About page
  contact/            # Contact page
  work/               # Portfolio / work page
  privacy/            # Privacy policy
  robots.ts           # Dynamic robots.txt
  sitemap.ts          # Dynamic sitemap
components/
  sections/           # Page sections (Hero, About, Services, Projects, etc.)
  ui/                 # Reusable UI primitives
  AuraBackground.tsx  # Animated background
  CustomCursor.tsx    # Custom cursor
  Navbar.tsx          # Navigation
  Footer.tsx          # Footer
  Preloader.tsx       # Page preloader
  ScrollAnimations.tsx# Lenis smooth scroll + GSAP integration
  BeamDecor.tsx       # Decorative beam element
  PageTransition.tsx  # Route transition animation
  ScrollToSection.tsx # Hash-based scroll utility
  EstimationForm.tsx  # Project inquiry / estimation form
hooks/
  use-reveal.ts       # Intersection observer reveal hook
lib/
  form-data.ts        # Form field definitions and options
  pricing.ts          # Estimation pricing logic
  utils.ts            # Tailwind class merging utility
public/               # Static assets (images, favicons, OG image)
registry/
  eldoraui/           # Third-party UI components
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

No environment variables are required to run the project locally.

---

## Notes

- The preloader displays once per browser session (tracked via `sessionStorage`).
- Smooth scrolling is handled by Lenis, synced to GSAP's ticker.
- All animations are GSAP-based with `ScrollTrigger` for scroll-driven effects.
