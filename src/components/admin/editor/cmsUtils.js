// Origin CMS v2 — shared utilities
// Kept framework-agnostic so the same helpers can be reused by a future
// Hermes Lab import API without touching the editor components.

export const generateSlug = (title) =>
  (title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const countWords = (body) => {
  const words = (body || '').trim().split(/\s+/).filter(Boolean);
  return words.length;
};

export const countCharacters = (body) => (body || '').length;

export const calculateReadingTime = (body) => {
  const words = countWords(body);
  return words ? Math.max(1, Math.ceil(words / 200)) : 0;
};

export const formatRelativeTime = (date) => {
  if (!date) return '—';
  const then = new Date(date).getTime();
  if (Number.isNaN(then)) return '—';
  const diff = Date.now() - then;
  const sec = Math.floor(diff / 1000);
  if (sec < 5) return 'just now';
  if (sec < 60) return `${sec} seconds ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min === 1 ? '' : 's'} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`;
  const day = Math.floor(hr / 24);
  return `${day} day${day === 1 ? '' : 's'} ago`;
};

// Editorial lifecycle — order matters for the workflow visual.
export const STATUS_FLOW = [
  'draft',
  'review',
  'approved',
  'published',
  'needs_update',
  'archived',
];

export const STATUS_META = {
  draft: { label: 'Draft', color: 'bg-stone text-midnight/60' },
  review: { label: 'In Review', color: 'bg-blue-100 text-blue-700' },
  approved: { label: 'Approved', color: 'bg-purple-100 text-purple-700' },
  published: { label: 'Published', color: 'bg-green-100 text-green-700' },
  needs_update: { label: 'Needs Update', color: 'bg-amber-100 text-amber-700' },
  archived: { label: 'Archived', color: 'bg-midnight/10 text-midnight/40' },
};

// Build a portable Markdown export of an article (for VS Code migration).
export const buildMarkdown = (article) => {
  const lines = [];
  lines.push(`# ${article.title || ''}`);
  lines.push('');
  if (article.summary) {
    lines.push(`> ${article.summary}`);
    lines.push('');
  }
  if (article.category) {
    lines.push(`**Category:** ${article.category}`);
    lines.push('');
  }
  if (article.hero_image_url) {
    lines.push(`![Hero](${article.hero_image_url})`);
    lines.push('');
  }
  if (article.body) {
    lines.push(article.body);
    lines.push('');
  }
  if (article.faq_items && article.faq_items.length) {
    lines.push('## Frequently Asked Questions');
    lines.push('');
    article.faq_items.forEach((f) => {
      lines.push(`### ${f.question || ''}`);
      lines.push(f.answer || '');
      lines.push('');
    });
  }
  if (article.seo_title) lines.push(`<!-- SEO Title: ${article.seo_title} -->`);
  if (article.meta_description)
    lines.push(`<!-- Meta Description: ${article.meta_description} -->`);
  if (article.focus_keyword)
    lines.push(`<!-- Focus Keyword: ${article.focus_keyword} -->`);
  return lines.join('\n');
};

export const downloadFile = (filename, content, mime) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Map a Hermes Lab JSON payload to the Article editor data shape.
// Used by the in-editor Import dialog. The backend hermesImport function
// has its own copy of this mapping (backend files deploy independently).
export const mapHermesPayload = (payload) => ({
  title: payload.title || '',
  slug: payload.slug || generateSlug(payload.title || ''),
  category: payload.category || 'Getting Started as a Landlord',
  summary: payload.summary || '',
  hero_image_url: payload.hero_image || payload.hero_image_url || '',
  body: payload.body || '',
  faq_items: payload.faq || payload.faq_items || [],
  seo_title: payload.seo_title || '',
  meta_description: payload.meta_description || '',
  focus_keyword: payload.focus_keyword || '',
  search_intent: payload.search_intent || '',
  target_audience: payload.target_audience || '',
  reading_time: payload.reading_time || 0,
  word_count: payload.word_count || 0,
  seo_score: payload.seo_score || 'Pending Hermes Analysis',
  internal_links: payload.internal_links || [],
  external_references: payload.external_references || [],
  suggested_internal_links: payload.suggested_internal_links || [],
  suggested_external_references: payload.suggested_external_references || [],
  hermes_metadata: payload.hermes_metadata || {},
  status: payload.status || 'draft',
  featured: payload.featured || false,
});