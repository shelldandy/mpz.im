# mpz.im

Personal website and blog built with Astro, Preact, and TypeScript.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) - Modern static site generator
- **UI Library**: [Preact](https://preactjs.com/) - Lightweight React alternative
- **Language**: TypeScript
- **Content**: Markdown with frontmatter
- **Deployment**: Netlify

## Project Structure

```
/
├── src/
│   ├── components/       # Preact components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── BlogPostCard.tsx
│   ├── content/          # Content collections
│   │   ├── config.ts     # Content schema definitions
│   │   ├── posts/        # Blog posts (markdown)
│   │   └── pages/        # Static pages (markdown)
│   ├── layouts/          # Astro layouts
│   │   ├── BaseLayout.astro
│   │   ├── Homepage.astro
│   │   ├── Post.astro
│   │   ├── Page.astro
│   │   └── PageError.astro
│   ├── pages/            # File-based routing
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── posts/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── styles/           # Global styles
│       └── global.css
├── public/               # Static assets
├── astro.config.mjs      # Astro configuration
├── netlify.toml          # Netlify deployment config
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)

### Installation

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

The site will be available at `http://localhost:4321`

### Building

Build for production:

```bash
bun run build
```

The static files will be generated in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
bun run preview
```

## Content Management

### Adding a Blog Post

1. Create a new `.md` file in `src/content/posts/`
2. Add frontmatter with the following fields:

```yaml
---
title: Your Post Title
date: 2025-01-01
layout: Post
hero: https://example.com/image.jpg  # Optional
---

Your content here...
```

### Adding a Page

1. Create a new `.md` file in `src/content/pages/`
2. Add frontmatter:

```yaml
---
title: Page Title
layout: Page
hero: https://example.com/image.jpg  # Optional
---

Your content here...
```

## Deployment

This site is configured for deployment to Netlify:

1. Connect your repository to Netlify
2. Build command: `bun run build`
3. Publish directory: `dist`

Netlify will automatically deploy on every push to the main branch.

## Commands

All commands are run from the root of the project:

| Command              | Action                                       |
|----------------------|----------------------------------------------|
| `bun install`        | Install dependencies                          |
| `bun run dev`        | Start dev server at `localhost:4321`         |
| `bun run build`      | Build production site to `./dist/`           |
| `bun run preview`    | Preview build locally before deploying       |
| `bun run astro ...`  | Run Astro CLI commands                       |

## License

Copyright © 2025 Miguel Palau. All rights reserved.
