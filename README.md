# RR Wedding Filmer - Official Website

Official website for **RR Wedding Filmer**, Udaipur's premier photography and cinematography studio specializing in wedding photography, cinematic wedding films, pre-wedding shoots, and special events.

## Project Structure

- `index.html`: Main HTML entry point containing official branding, SEO metadata, JSON-LD structured data, and Open Graph card tags.
- `src/`: React codebase built with TypeScript, Vite, Tailwind CSS, and shadcn/ui.
- `public/`: Production assets, favicons, web manifest, `robots.txt`, `sitemap.xml`, and social images.

## Development & Build

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

## Custom Domain Setup

To connect a custom domain (e.g. `https://rrweddingfilmer.com`):
1. In your Vercel Dashboard, go to **Project Settings > Domains**.
2. Add your custom domain and set up DNS records according to Vercel instructions.
3. Update `index.html` (canonical URL & OG tags), `public/sitemap.xml`, and `public/robots.txt` if using a domain different from `https://rrweddingfilmer.com`.
