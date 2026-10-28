# ⚡ Ideathon (SDG Council) — Hackathon Problem Statement Hub

> **Four Problems. Three Hrs to Build Something That Matters.**
> A production-ready, ultra-fast, single-page frontend web app that communicates hackathon problem statements with high clarity, interactive briefs, and zero backend friction.

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Target User

- **Hackathon Participants:** Developers, UI/UX designers, and college students looking for actionable problem statements they can grok in under 30 seconds.
- **Solo Builders & Teams (1–6 people):** Looking for structured briefs, twist constraints, and an interactive submission checklist.
- **Hackathon Organizers & Mentors:** Needing a unified, responsive showcase that eliminates repetitive questions about tech stacks, backends, and judging criteria.

---

## 💡 The Problem It Solves

Traditional hackathons share problem statements as long, dense PDF documents or cluttered Notion pages. Participants spend their first 2 hours debating requirements and missing key constraints rather than writing code.

**Ideathon solves this by:**
1. **The 30-Second Rule:** Every challenge is scannable at a glance — custom icon, codename, one-line hook, and tags.
2. **Deep-Dive Modals:** Full briefs with interactive feature checklists, bonus vectors, and highlighted "Twist Constraints".
3. **One-Click Markdown Export:** Participants can copy the entire structured brief to their clipboard or export to PDF instantly.
4. **Interactive Submission Checklist:** Keeps teams on track with real-time completion percentages saved in localStorage.
5. **Command Palette (`⌘K` / `Ctrl+K`):** Fast keyboard-driven navigation across all challenges and sections.

---

## 🎨 Design Decisions

- **Dark-First Aesthetic:** Deep slate/near-black canvas (`#0B0F17`) with elevated glassmorphism cards (`#131A26`) and crisp border accents.
- **Four Distinct Accent Colorways:** Each problem statement owns an unmistakable identity:
  - **Decoded** → Cyan (`#22D3EE`)
  - **Everyone Online** → Violet (`#A78BFA`)
  - **Campus Pulse** → Amber (`#FBBF24`)
  - **GreenTrail** → Emerald (`#34D399`)
- **Light Mode Support:** Seamless dark/light toggle persisted in `localStorage`.
- **Micro-Interactions & Performance:**
  - CSS transforms and opacity-only transitions (≤250ms).
  - Native `IntersectionObserver` scroll-reveal (zero heavy dependencies).
  - Pure SVG progress rings for the Judging section.
  - Full keyboard accessibility: `Esc` to dismiss modal, `Arrow Left/Right` to cycle challenges, focus trap, and body scroll locking.
- **Accessibility & Standards:** Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`), `aria-modal`, `aria-expanded`, and a visible "Skip to content" anchor.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (custom tokens, glassmorphism, responsive utilities)
- **Icons:** Lucide React
- **Backend / Database:** None. 100% static client-side bundle, zero server dependencies.
- **Deploy Targets:** Vercel, Netlify, GitHub Pages, Cloudflare Pages.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm or pnpm or yarn

### 1. Clone & Install
```bash
git clone <repo-url>
cd ideathon
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled, zero-error production bundle will be generated in `/dist`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Instant Cloud Deployment

### Option A: Vercel (Pre-configured)
This repository includes a `vercel.json` with client-side routing and security headers.
```bash
npx vercel
```

### Option B: Netlify (Pre-configured)
This repository includes a `netlify.toml` with clean redirects and security headers.
```bash
npx netlify deploy --prod
```

### Option C: GitHub Pages
Run `npm run build` and publish the `/dist` folder to your `gh-pages` branch.

---

## 📋 Problem Statements Overview

| Challenge | Accent | Key Focus | The Twist |
| :--- | :--- | :--- | :--- |
| **Decoded** | Cyan | Plain Language & Data Viz | Main result screen understood without scrolling on mobile. |
| **Everyone Online** | Violet | Accessibility & Low Bandwidth | Usable on throttled "Slow 3G" network conditions. |
| **Campus Pulse** | Amber | Student Dashboard & Timelines | Usable one-handed on mobile with zero pinch-zoom. |
| **GreenTrail** | Emerald | Eco-Gamification & Habits | Daily habit logging must take 3 taps or fewer. |

---

## ⚖️ Judging Criteria Matrix

- **Problem Fit & Clarity (25%):** Immediate solution to user friction, under 30-second comprehension.
- **Craft & Visual Polish (25%):** Aesthetics, typography, responsive resilience down to 360px.
- **Usability & Accessibility (20%):** Keyboard navigation, contrast ratios ≥4.5:1, screen reader tags.
- **Originality & Creativity (15%):** Creative UI metaphors and exploration of bonus vectors.
- **Completeness & Functionality (15%):** Working client state, error-free console, cohesive flows.

---

## 📄 License
MIT © 2026 Ideathon (SDG Council). Built for builder speed.
