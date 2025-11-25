# Modern Blog Platform

![Blog Platform](https://imgix.cosmicjs.com/00e38dc0-c9b2-11f0-8de3-a3b971be7f0b-photo-1555066931-4365d14bab8c-1764042680362.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 16 and Cosmic CMS. Features dynamic content display, category filtering, author profiles, and a beautiful reading experience.

## Features

- 📝 **Dynamic Blog Posts** - Markdown content with featured images
- 👤 **Author Profiles** - Dedicated pages for each author with their posts
- 🏷️ **Category Filtering** - Browse posts by category
- 📱 **Responsive Design** - Beautiful on all devices
- ⚡ **Fast Performance** - Server-side rendering with Next.js 16
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 🔍 **SEO Optimized** - Proper meta tags and structure

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6925278c3607fb35962e3992&clone_repository=692528883607fb35962e39b3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog bucket

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables in `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Single Post by Slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This blog is fully integrated with Cosmic CMS using the following content types:

- **Posts** - Blog articles with title, content, featured image, author, and category
- **Authors** - Writer profiles with name, bio, and avatar
- **Categories** - Content organization with name and description

Content updates in Cosmic are automatically reflected in the application.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy with build command: `bun run build`

<!-- README_END -->