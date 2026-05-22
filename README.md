# 🌊 Yifei Gu — Personal Academic Website

A modern, interactive personal academic website built with **Astro**, **React**, **Three.js**, and **Tailwind CSS**.

## ✨ Features

- 🌊 **3D Ocean Scene** — Three.js / React Three Fiber
- 🎬 **Scroll Animations** — Framer Motion & GSAP
- 🌙 **Dark / Light Mode** — Theme toggle support
- 📝 **MDX Blog System** — Write blogs in Markdown + JSX
- 📊 **Data-driven Sections** — Publications and software from JSON
- 🏆 **Animated Awards Timeline** — Scroll-reveal animations
- 🚀 **GitHub Pages Auto-deploy** — GitHub Actions CI/CD

## 🛠 Tech Stack

| Category        | Technology                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------- |
| Framework       | [Astro](https://astro.build)                                                                  |
| UI Library      | [React](https://react.dev)                                                                    |
| 3D Graphics     | [Three.js](https://threejs.org) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| Styling         | [Tailwind CSS](https://tailwindcss.com)                                                       |
| Animations      | [Framer Motion](https://www.framer.com/motion/) / [GSAP](https://greensock.com/gsap/)         |
| Blog            | [MDX](https://mdxjs.com)                                                                      |
| Package Manager | [pnpm](https://pnpm.io)                                                                       |
| Deployment      | GitHub Pages + GitHub Actions                                                                 |

## 📁 Project Structure

```
yfg_landing/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment workflow
├── public/
│   ├── favicon.ico                  # Website favicon
│   ├── favicon.svg                  # SVG favicon
│   └── CV_YifeiGu.pdf               # Resume/CV (place your own)
├── src/
│   ├── components/                  # React components
│   │   ├── AboutSection.tsx         # About/bio section
│   │   ├── AwardsSection.tsx        # Awards timeline
│   │   ├── ContactSection.tsx       # Contact links
│   │   ├── Footer.tsx               # Site footer
│   │   ├── HeroSection.tsx          # Hero/landing section
│   │   ├── Navbar.tsx               # Navigation bar
│   │   ├── OceanScene.tsx           # 3D ocean animation
│   │   ├── PublicationsSection.tsx  # Publications list
│   │   ├── ResearchSection.tsx       # Research interests
│   │   ├── ScrollReveal.tsx         # Scroll animation wrapper
│   │   ├── BlogSection.astro        # Blog preview on homepage
│   │   ├── SoftwareIndex.tsx        # Full software listing page
│   │   ├── SoftwareSection.tsx      # Software/projects list
│   │   └── ThemeToggle.tsx          # Dark/light mode toggle
│   ├── data/
│   │   ├── publications.json        # Publications data
│   │   ├── software.json            # Software/projects data (homepage cards)
│   │   └── site.ts                  # Contact links & CV toggle
│   ├── content/
│   │   ├── blog/                    # MDX blog posts
│   │   │   ├── hsc3d-release.mdx
│   │   │   └── sea-cucumber-detection.mdx
│   │   ├── software/                # MDX software detail pages
│   │   └── config.ts                # Content collections config
│   ├── layouts/
│   │   └── Layout.astro             # Base layout component
│   ├── pages/
│   │   ├── index.astro              # Home page
│   │   ├── awards.astro             # Full awards page
│   │   ├── publications.astro       # Full publications page
│   │   ├── software/
│   │   │   ├── index.astro          # Software listing page
│   │   │   └── [...slug].astro      # Individual software detail page
│   │   └── blog/
│   │       ├── [...slug].astro      # Individual blog post page
│   │       └── index.astro          # Blog listing page
│   └── styles/
│       └── global.css               # Global styles & Tailwind
├── astro.config.mjs                 # Astro configuration
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript config
└── pnpm-lock.yaml                    # Locked dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 9.x (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yifeigu/yfg_landing.git

# Navigate to project directory
cd yfg_landing

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

The development server will be available at **http://localhost:4321**

### Before You Deploy

Update placeholder content in these files:

| File                         | What to update                                                          |
| ---------------------------- | ----------------------------------------------------------------------- |
| `src/data/site.ts`           | Email, Google Scholar URL; set `cvAvailable: true` after adding your CV |
| `src/data/software.json`     | GitHub URLs for each project                                            |
| `src/content/software/*.mdx` | GitHub URLs and documentation for detail pages                          |
| `public/CV_YifeiGu.pdf`      | Add your CV PDF (optional; enables the download button)                 |
| `astro.config.mjs`           | `site` URL if not using `yifeigu.github.io`                             |

See also [BLOG_GUIDE.md](./BLOG_GUIDE.md), [SOFTWARE_GUIDE.md](./SOFTWARE_GUIDE.md), and [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md).

## ✏️ How to Edit Content

### Publications

Edit `src/data/publications.json`:

```json
[
  {
    "title": "Paper Title",
    "authors": ["Author A", "Y. Gu", "Author C"],
    "venue": "Conference Name",
    "year": 2024,
    "links": [
      { "label": "Paper", "url": "https://..." },
      { "label": "Code", "url": "https://..." }
    ]
  }
]
```

### Software / Projects

Edit `src/data/software.json`:

```json
[
  {
    "name": "Project Name",
    "slug": "project-name",
    "description": "Project description",
    "tags": ["Python", "PyTorch"],
    "github": "https://github.com/...",
    "paper": true
  }
]
```

The `slug` must match the filename in `src/content/software/` (without `.mdx`). Homepage cards read from this JSON; detail pages are authored in MDX.

**Full guide:** [SOFTWARE_GUIDE.md](./SOFTWARE_GUIDE.md) — descriptions (short vs long), gallery images, and new projects.

### Awards

Edit `src/components/AwardsSection.tsx` — modify the `awards` array:

```tsx
const awards = [
  {
    year: "2024",
    title: "Best Paper Award",
    organization: "Conference Name",
  },
  // Add more awards...
];
```

### About / Bio

Edit `src/components/AboutSection.tsx` — modify the content section.

### Research Interests

Edit `src/components/ResearchSection.tsx` — modify the research areas.

### Contact / Social Links

Edit `src/data/site.ts` to update email, GitHub, and Google Scholar links in one place. The contact section reads from this file.

### CV / Resume

1. Place your PDF as `public/CV_YifeiGu.pdf`
2. Set `cvAvailable: true` in `src/data/site.ts`

The download button is hidden until both steps are done, so visitors never hit a broken link.

## 📝 Blog

### Creating a New Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description of the post"
date: 2025-06-15
tags: ["AI", "Research"]
---

Your content here. You can use **Markdown** and even _React components_!

## Section

More content...
```

### Blog Frontmatter

| Field         | Description                      | Required |
| ------------- | -------------------------------- | -------- |
| `title`       | Post title                       | Yes      |
| `description` | Brief description for SEO        | Yes      |
| `date`        | Publication date (YYYY-MM-DD)    | Yes      |
| `tags`        | Array of tags for categorization | No       |

## 🌐 Deployment

### Automatic Deployment (Recommended)

This project includes automatic deployment via GitHub Actions:

1. **Push to GitHub** — Fork this repository or push your changes
2. **Update site URL** — Edit `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: "https://your-username.github.io",
     // ...
   });
   ```
3. **Enable GitHub Pages** — Go to Repository Settings → Pages
   - Source: **GitHub Actions**
4. **Push to main branch** — The workflow in `.github/workflows/deploy.yml` builds and deploys

`astro.config.mjs` auto-sets `base` for project sites (e.g. `/yfg_landing`). See [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md).

### Manual Deployment

```bash
# Build the project
pnpm build

# The output will be in the `dist/` directory
# Deploy the contents of `dist/` to your hosting provider
```

## 🧞 Commands Reference

| Command        | Action                           |
| -------------- | -------------------------------- |
| `pnpm install` | Install all dependencies         |
| `pnpm dev`     | Start development server         |
| `pnpm build`   | Build for production             |
| `pnpm preview` | Preview production build locally |
| `pnpm astro`   | Run Astro CLI commands           |

## 📄 License

MIT License — feel free to use this template for your own website!

---

Built with ❤️ using Astro, React, and Three.js
