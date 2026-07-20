import type { APIRoute } from 'astro';

const SITE = 'https://www.standoutlabs.in';

// Static routes with their priorities.
const staticEntries = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services/', priority: '0.9', changefreq: 'monthly' },
  { path: '/process/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.8', changefreq: 'weekly' },
];

// Every blog post is picked up automatically — add a .md file, it appears here on the next build.
const posts = import.meta.glob<{ url: string; frontmatter: { pubDate: string } }>('./blog/*.md', { eager: true });

export const GET: APIRoute = () => {
  const postEntries = Object.values(posts).map((p) => ({
    path: p.url,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date(p.frontmatter.pubDate).toISOString().slice(0, 10),
  }));

  const urls = [...staticEntries, ...postEntries]
    .map((e) => {
      const loc = `${SITE}${e.path}`;
      const lastmod = 'lastmod' in e && e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
