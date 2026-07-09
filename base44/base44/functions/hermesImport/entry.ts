import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden — admin only' }, { status: 403 });

    const payload = await req.json();

    if (!payload.title || !payload.slug) {
      return Response.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    // Map Hermes Lab payload to Article entity fields.
    // No AI generation occurs here — the CMS only receives and stores finished content.
    const mapped = {
      title: payload.title,
      slug: payload.slug,
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
    };

    // Create or update by slug
    const existing = await base44.entities.Article.filter({ slug: mapped.slug });
    let article;
    if (existing.length > 0) {
      article = await base44.entities.Article.update(existing[0].id, mapped);
    } else {
      article = await base44.entities.Article.create(mapped);
    }

    return Response.json({ status: 'success', article });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});