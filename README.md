# mpz.im

Personal website and blog built with Astro, Preact, and TypeScript.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator
- **UI Library**: [Preact](https://preactjs.com/) - Lightweight React alternative
- **Language**: TypeScript
- **Content**: Markdown with frontmatter
- **Backend**: Netlify Functions - Serverless functions for contact form
- **Deployment**: Netlify

## Project Structure

```
/
├── src/
│   ├── components/       # Preact components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── BlogPostCard.tsx
│   │   ├── Pagination.tsx
│   │   └── ContactForm.tsx
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
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── posts/
│   │       ├── [...page].astro  # Paginated posts list
│   │       └── [slug].astro     # Individual blog posts
│   └── styles/           # Global styles
│       └── global.css
├── netlify/
│   └── functions/        # Netlify serverless functions
│       └── contact.ts    # Contact form handler (Telegram integration)
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

## Features

### Pagination

The blog posts page supports pagination with 10 posts per page. You can customize the number of posts per page by editing the `pageSize` parameter in `src/pages/posts/[...page].astro`:

```typescript
return paginate(sortedPosts, { pageSize: 10 }); // Change 10 to your desired number
```

The pagination component shows:
- Current page and total pages
- Previous/Next navigation
- Numbered page links with ellipsis for large page counts
- Fully accessible with ARIA labels

### Contact Form with Telegram Integration

The contact page uses a **Netlify Function** to send form submissions to Telegram via the Bot API. The site is fully static with serverless backend for the contact form.

**Architecture:**
- Static site generated with Astro
- Contact form (Preact component) on `/contact`
- Netlify Function at `/.netlify/functions/contact` handles submissions
- Function sends message to Telegram Bot API

**Setup:**

1. **Get Telegram Credentials**:
   - Create a bot with [@BotFather](https://t.me/botfather) on Telegram
   - Copy the bot token
   - Message your bot, then visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` to find your chat ID

2. **Configure Environment Variables**:
   - For local development: Create `.env` file (see `.env.example`)
   - For production: Add to Netlify Dashboard → Site settings → Environment variables
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHAT_ID`

**Features:**
- Client-side validation
- Character limits (100 for name, 2000 for message)
- Loading states and error handling
- Success/error messages
- Fully accessible form with ARIA attributes
- Serverless architecture (no server needed)

## Deployment

This site is configured for deployment to Netlify:

1. Connect your repository to Netlify
2. Build command: `bun run build`
3. Publish directory: `dist`
4. **Environment Variables**: Add your Telegram credentials to Netlify:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

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
