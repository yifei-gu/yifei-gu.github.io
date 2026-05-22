# Software Pages Guide

This project has **two layers** for software content. Understanding both helps you edit descriptions, galleries, and detail pages correctly.

## How software pages work

| Layer | Location | Purpose |
| ----- | -------- | ------- |
| **Homepage cards** | `src/data/software.json` | Short blurbs on the landing page and `/software` index |
| **Detail pages** | `src/content/software/*.mdx` | Full page per project at `/software/{slug}` |

The **slug** ties them together:

- JSON entry: `"slug": "hsc3d"`
- MDX file: `src/content/software/hsc3d.mdx`
- URL: `/software/hsc3d`

If a slug exists in JSON but has no MDX file, the card still links but the detail page will 404. If MDX exists without JSON, the detail page works but the project won’t appear on the homepage list.

---

## Editing descriptions

### Short description (cards + page header)

Set `description` in **both** places if you want them to match:

1. **`src/data/software.json`** — shown on homepage and `/software` listing  
2. **MDX frontmatter** in `src/content/software/{slug}.mdx` — shown under the title on the detail page and used for SEO (`<meta description>`)

Example frontmatter:

```yaml
---
name: "HSC3D"
description: "A Python package to quantify 3D habitat structural complexity from point clouds."
tags: ["Python", "3D", "Ecology"]
github: "https://github.com/your-org/HSC3D"
paper: true
---
```

### Long description (body content)

Write the main documentation in the **MDX body** below the frontmatter fence (`---`). This supports Markdown headings, code blocks, lists, and links:

```mdx
---
name: "HSC3D"
description: "Short summary here."
# ...other frontmatter
---

# HSC3D

Long-form overview, installation, examples, citations, etc.
```

The detail template renders this body in `src/pages/software/[...slug].astro` inside a prose block **after** optional gallery and related sections.

### Other frontmatter fields

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | string | Display title |
| `description` | string | Short summary (header + SEO) |
| `tags` | string[] | Topic badges |
| `github` | string | Repository URL |
| `paper` | boolean | Show “Read Paper” button |
| `contributed` | boolean | “Contributed” badge |
| `relatedPapers` | array | Linked publications |
| `gallery` | array | Images for the gallery lightbox (see below) |

Schema is defined in `src/content/config.ts`.

---

## Adding gallery images

### 1. Place image files

Put images under:

```
public/software/{slug}/
```

Examples:

- `public/software/hsc3d/reef-survey.jpg`
- `public/software/hsc3d/complexity-output.png`

Use web-friendly formats (`.jpg`, `.png`, `.webp`). Paths in frontmatter start with `/software/...` (served from `public/`).

### 2. Add `gallery` to frontmatter

```yaml
gallery:
  - src: "/software/hsc3d/reef-survey.jpg"
    alt: "Coral reef point cloud from field survey"
    caption: "Field sampling, Hong Kong"
  - src: "/software/hsc3d/complexity-output.png"
    alt: "CBD complexity heatmap"
    caption: "Structural complexity map"
```

| Field | Required | Description |
| ----- | -------- | ----------- |
| `src` | Yes | Path from site root (e.g. `/software/hsc3d/photo.jpg`) |
| `alt` | Yes | Accessibility text |
| `caption` | No | Shown under thumbnail and in lightbox |

### 3. Preview

Run `pnpm dev` and open `/software/hsc3d` (or your slug). Click a thumbnail to open the lightbox (keyboard: ← → Esc).

Gallery UI: `src/components/SoftwareGallery.tsx`.

---

## Adding a new software project

1. Add an entry to `src/data/software.json` with a unique `slug`.
2. Create `src/content/software/{slug}.mdx` with matching frontmatter.
3. Optionally add images under `public/software/{slug}/`.
4. Run `pnpm build` to validate the content schema.

---

## Related blog posts

Blog posts can link to software via frontmatter `software: "hsc3d"` or shared `tags`. The detail page shows up to three matching posts automatically.

See [BLOG_GUIDE.md](./BLOG_GUIDE.md) for blog authoring.
