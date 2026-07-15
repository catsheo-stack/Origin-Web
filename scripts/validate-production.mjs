import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const domain = 'https://originpropertyconcierge.com.au';
const requiredFiles = [
  'index.html',
  'vercel.json',
  'public/robots.txt',
  'public/sitemap.xml'
];

const failures = [];
const passes = [];

function pass(message) {
  passes.push(message);
}

function fail(message) {
  failures.push(message);
}

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  fs.existsSync(fullPath) ? pass(`Found ${file}`) : fail(`Missing ${file}`);
}

const sitemapPath = path.join(root, 'public/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')
    ? pass('Sitemap has an XML declaration')
    : fail('Sitemap is missing the expected XML declaration');
  sitemap.includes('<urlset') && sitemap.includes('</urlset>')
    ? pass('Sitemap contains a complete urlset')
    : fail('Sitemap urlset is incomplete');
  sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
    ? pass('Sitemap declares the XHTML hreflang namespace')
    : fail('Sitemap is missing the XHTML hreflang namespace');
  sitemap.includes('hreflang="en-AU"') && sitemap.includes('hreflang="zh-Hant-AU"')
    ? pass('Sitemap contains English and Traditional Chinese alternates')
    : fail('Sitemap is missing bilingual hreflang entries');
  sitemap.includes(domain)
    ? pass('Sitemap uses the production domain')
    : fail('Sitemap does not use the production domain');

  const blockedPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/admin/', '/hermes/', '/thank-you'];
  for (const blockedPath of blockedPaths) {
    sitemap.includes(`<loc>${domain}${blockedPath}`)
      ? fail(`Private route appears in sitemap: ${blockedPath}`)
      : pass(`Private route excluded from sitemap: ${blockedPath}`);
  }
}

const robotsPath = path.join(root, 'public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  robots.includes('User-agent: *') && robots.includes('Allow: /')
    ? pass('robots.txt allows public crawling')
    : fail('robots.txt is missing its public crawl rule');
  robots.includes(`Sitemap: ${domain}/sitemap.xml`)
    ? pass('robots.txt points to the production sitemap')
    : fail('robots.txt sitemap URL is incorrect');
  ['/login', '/register', '/admin/', '/hermes/', '/thank-you'].forEach((route) => {
    robots.includes(`Disallow: ${route}`)
      ? pass(`robots.txt blocks ${route}`)
      : fail(`robots.txt does not block ${route}`);
  });
}

const vercelPath = path.join(root, 'vercel.json');
if (fs.existsSync(vercelPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    Array.isArray(config.rewrites) && config.rewrites.some((rule) => rule.destination === '/index.html')
      ? pass('Vercel SPA fallback is configured')
      : fail('Vercel SPA fallback is missing');
    Array.isArray(config.headers)
      ? pass('Vercel production headers are configured')
      : fail('Vercel production headers are missing');
  } catch (error) {
    fail(`vercel.json is invalid JSON: ${error.message}`);
  }
}

for (const message of passes) console.log(`PASS  ${message}`);
for (const message of failures) console.error(`FAIL  ${message}`);

if (failures.length > 0) {
  console.error(`\nProduction validation failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`\nProduction validation passed (${passes.length} checks).`);
