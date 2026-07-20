// Generates one blog post via NVIDIA's free OpenAI-compatible API and writes it
// to src/pages/blog/. Run daily by .github/workflows/daily-blog.yml.
// Requires env NVIDIA_API_KEY (free key from https://build.nvidia.com).
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = 'src/pages/blog';
const MODEL = 'meta/llama-3.3-70b-instruct'; // free on build.nvidia.com
const API_KEY = process.env.NVIDIA_API_KEY;

if (!API_KEY) {
  console.error('Missing NVIDIA_API_KEY');
  process.exit(1);
}

// Rotating topic bank — each targets a real Hyderabad search term.
const TOPICS = [
  'SEO services in Hyderabad',
  'social media marketing in Hyderabad',
  'best branding agency in Hyderabad',
  'Google Ads management in Hyderabad',
  'website design for small businesses in Hyderabad',
  'Meta (Facebook & Instagram) ads for Hyderabad businesses',
  'local SEO for Hyderabad shops and clinics',
  'content marketing strategy for Indian startups',
  'how much digital marketing costs in Hyderabad',
  'lead generation for Hyderabad businesses',
  'ecommerce marketing in Hyderabad',
  'personal branding for founders in Hyderabad',
  'WhatsApp marketing automation for Indian businesses',
  'restaurant marketing in Hyderabad',
  'real estate digital marketing in Hyderabad',
  'CRM automation for growing businesses',
  'performance marketing vs brand marketing',
  'how to rank a business on Google Maps in Hyderabad',
  'AI tools every Hyderabad business should use',
  'building a brand identity that stands out',
  'digital marketing for healthcare and clinics in Hyderabad',
  'email marketing for Indian D2C brands',
  'video marketing and reels for local businesses',
  'conversion rate optimisation for websites',
];

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const existing = new Set(
  fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md')) : []
);

// Pick the first topic whose slug isn't already published; fall back to day-based rotation.
let topic = TOPICS.find((t) => !existing.has(`${slugify(t)}.md`));
if (!topic) {
  const day = Math.floor(Date.now() / 86400000);
  topic = TOPICS[day % TOPICS.length];
}

let slug = slugify(topic);
if (existing.has(`${slug}.md`)) {
  let n = 2;
  while (existing.has(`${slug}-${n}.md`)) n++;
  slug = `${slug}-${n}`;
}

const today = new Date().toISOString().slice(0, 10);

const prompt = `You are the content writer for Standout Labs, a digital marketing and AI branding studio based in Hyderabad, India.

Write a helpful, genuine blog post on the topic: "${topic}".

Rules:
- Audience: business owners and founders in Hyderabad and across India.
- Tone: confident, practical, no fluff, no hype, no fake statistics.
- 500-750 words. Use Markdown with "##" section headings (NEVER a top-level "#" heading — the title is separate).
- Naturally include the topic keyword and "Hyderabad" a few times, but do not keyword-stuff.
- End with one short paragraph that softly mentions Standout Labs can help (no hard sell).
- Do NOT invent client names, numbers, or reviews.

Return ONLY a valid JSON object (no markdown fences) with exactly these keys:
{
  "title": "an SEO title under 65 chars including the keyword",
  "description": "a 140-160 char meta description",
  "keywords": "comma-separated list of 5-8 relevant keywords",
  "body": "the full post in Markdown (## headings, paragraphs, lists)"
}`;

const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: MODEL,
    max_tokens: 2500,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  }),
});

if (!res.ok) {
  console.error('NVIDIA API error', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
let text = data.choices?.[0]?.message?.content?.trim() || '';
// Strip accidental code fences and grab the JSON object.
text = text.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
if (start === -1 || end === -1) {
  console.error('No JSON in response:', text.slice(0, 500));
  process.exit(1);
}

const post = JSON.parse(text.slice(start, end + 1));
for (const k of ['title', 'description', 'keywords', 'body']) {
  if (!post[k]) {
    console.error(`Missing field ${k}`);
    process.exit(1);
  }
}

const esc = (s) => String(s).replace(/"/g, '\\"');
const md = `---
layout: ../../layouts/BlogPost.astro
title: "${esc(post.title)}"
description: "${esc(post.description)}"
pubDate: "${today}"
author: "Standout Labs"
keywords: "${esc(post.keywords)}"
---

${post.body.trim()}
`;

fs.mkdirSync(BLOG_DIR, { recursive: true });
fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), md);
console.log(`Wrote ${BLOG_DIR}/${slug}.md — "${post.title}"`);
