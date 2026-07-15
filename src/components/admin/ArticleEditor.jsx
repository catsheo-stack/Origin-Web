import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowLeft, Eye, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ContentFields from './editor/ContentFields';
import SeoFields from './editor/SeoFields';
import InternalLinksSection from './editor/InternalLinksSection';
import ExternalReferencesSection from './editor/ExternalReferencesSection';
import HermesMetadataSection from './editor/HermesMetadataSection';
import ArticlePreview from './editor/ArticlePreview';
import StatsBar from './editor/StatsBar';
import LifecycleSection from './editor/LifecycleSection';
import ExportMenu from './editor/ExportMenu';
import AiActions from './editor/AiActions';
import VersionHistory from './editor/VersionHistory';
import HermesImportDialog from './editor/HermesImportDialog';
import { generateSlug, calculateReadingTime, countWords, countCharacters } from './editor/cmsUtils';

const buildInitialData = (article) => ({
  title: article?.title || '',
  slug: article?.slug || '',
  category: article?.category || 'Getting Started as a Landlord',
  summary: article?.summary || '',
  hero_image_url: article?.hero_image_url || '',
  body: article?.body || '',
  faq_items: article?.faq_items || [],
  seo_title: article?.seo_title || '',
  meta_description: article?.meta_description || '',
  focus_keyword: article?.focus_keyword || '',
  search_intent: article?.search_intent || '',
  target_audience: article?.target_audience || '',
  reading_time: article?.reading_time || 0,
  word_count: article?.word_count || 0,
  seo_score: article?.seo_score || 'Pending Hermes Analysis',
  internal_links: article?.internal_links || [],
  external_references: article?.external_references || [],
  suggested_internal_links: article?.suggested_internal_links || [],
  suggested_external_references: article?.suggested_external_references || [],
  hermes_metadata: article?.hermes_metadata || {},
  status: article?.status || 'draft',
  featured: article?.featured || false,
  revisions: article?.revisions || [],
});

export default function ArticleEditor({ article, onSave, onCancel }) {
  const articleId = article?.id || null;
  const [data, setData] = useState(() => buildInitialData(article));
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!article?.slug);
  const [slugWarning, setSlugWarning] = useState('');
  const [saveStatus, setSaveStatus] = useState(articleId ? 'saved' : 'idle');
  const [lastSavedAt, setLastSavedAt] = useState(article?.updated_date || null);
  const [showPreview, setShowPreview] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [recoverDraft, setRecoverDraft] = useState(null);

  const savedSnapshotRef = useRef(JSON.stringify(buildInitialData(article)));
  const dataRef = useRef(data);
  const draftKey = `origin_cms_draft_${articleId || 'new'}`;

  useEffect(() => { dataRef.current = data; }, [data]);

  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const handleTitleChange = (title) => {
    setData((d) => ({ ...d, title, slug: slugManuallyEdited ? d.slug : generateSlug(title) }));
  };
  const handleSlugChange = (slug) => {
    setSlugManuallyEdited(true);
    update('slug', slug);
  };

  const wordCount = useMemo(() => countWords(data.body), [data.body]);
  const charCount = useMemo(() => countCharacters(data.body), [data.body]);
  const readingTime = useMemo(() => calculateReadingTime(data.body), [data.body]);

  useEffect(() => {
    const current = JSON.stringify(data);
    const equal = current === savedSnapshotRef.current;
    setSaveStatus(equal ? (articleId ? 'saved' : 'idle') : 'unsaved');
    const t = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ data, ts: Date.now() }));
      } catch { /* storage may be full or unavailable */ }
    }, 1500);
    return () => clearTimeout(t);
  }, [data, articleId, draftKey]);

  useEffect(() => {
    if (!articleId) return;
    const interval = setInterval(async () => {
      const current = JSON.stringify(dataRef.current);
      if (current === savedSnapshotRef.current) return;
      setSaveStatus('saving');
      try {
        await base44.entities.Article.update(articleId, {
          ...dataRef.current,
          reading_time: dataRef.current.reading_time || calculateReadingTime(dataRef.current.body),
          word_count: dataRef.current.word_count || countWords(dataRef.current.body),
        });
        savedSnapshotRef.current = current;
        setLastSavedAt(new Date().toISOString());
        setSaveStatus('saved');
      } catch {
        setSaveStatus('unsaved');
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [articleId]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(draftKey);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const serverTs = article?.updated_date ? new Date(article.updated_date).getTime() : 0;
      if (parsed.ts && parsed.ts > serverTs && parsed.data) {
        setRecoverDraft(parsed.data);
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!data.slug) { setSlugWarning(''); return; }
    const t = setTimeout(async () => {
      try {
        const matches = await base44.entities.Article.filter({ slug: data.slug });
        const dup = matches.find((a) => a.id !== articleId);
        setSlugWarning(dup ? 'This slug is already used by another article.' : '');
      } catch { setSlugWarning(''); }
    }, 500);
    return () => clearTimeout(t);
  }, [data.slug, articleId]);

  const handleRecover = () => {
    if (recoverDraft) {
      setData(recoverDraft);
      setSlugManuallyEdited(true);
    }
    setRecoverDraft(null);
  };

  const handleDiscardDraft = () => {
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setRecoverDraft(null);
  };

  const handleApplyImport = (importedData) => {
    setData((d) => ({ ...d, ...importedData }));
    setSlugManuallyEdited(true);
    setShowImport(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ ...data, reading_time: readingTime, word_count: wordCount });
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-parchment">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-stone">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
          <button onClick={onCancel} className="flex items-center gap-2 text-sm text-midnight/50 hover:text-accent-navy transition-colors">
            <ArrowLeft size={14} /> Back to articles
          </button>
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" onClick={() => setShowImport(true)} className="flex items-center gap-1.5 text-xs text-midnight/60 px-4 py-2 rounded-full border border-stone hover:border-golden hover:text-golden transition-colors">
              <Sparkles size={13} /> Import from Hermes
            </button>
            <ExportMenu article={{ ...data, reading_time: readingTime, word_count: wordCount }} />
            <button type="button" onClick={() => setShowPreview(true)} className="flex items-center gap-1.5 text-xs text-midnight/60 px-4 py-2 rounded-full border border-stone hover:border-accent-navy hover:text-accent-navy transition-colors">
              <Eye size={13} /> Preview Article
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 pb-3">
          <StatsBar wordCount={wordCount} charCount={charCount} readingTime={readingTime} saveStatus={saveStatus} lastSavedAt={lastSavedAt} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
        <div className="mb-8">
          <h1 className="font-heading text-2xl text-midnight">{article ? 'Edit Article' : 'New Article'}</h1>
          <p className="text-sm text-midnight/40 mt-1">Origin CMS v2 · Hermes Lab Ready</p>
        </div>

        {recoverDraft && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-amber-800">An unsaved draft was recovered from your previous session.</p>
            <div className="flex gap-2">
              <button type="button" onClick={handleRecover} className="bg-amber-600 text-white text-xs px-4 py-2 rounded-full hover:bg-amber-700 transition-colors">Restore draft</button>
              <button type="button" onClick={handleDiscardDraft} className="text-amber-700 text-xs px-4 py-2 rounded-full hover:bg-amber-100 transition-colors">Discard</button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <ContentFields data={data} update={update} onTitleChange={handleTitleChange} onSlugChange={handleSlugChange} slugWarning={slugWarning} />
          <SeoFields data={data} update={update} readingTime={readingTime} wordCount={wordCount} />
          <InternalLinksSection data={data} update={update} currentId={articleId} />
          <ExternalReferencesSection data={data} update={update} />
          <HermesMetadataSection data={data} update={update} />

          <section className="bg-white rounded-xl border border-stone/60 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full bg-golden" />
              <div>
                <h2 className="font-heading text-base text-midnight">Hermes AI</h2>
                <p className="text-xs text-midnight/40 mt-0.5">AI-assisted drafting — integration coming soon</p>
              </div>
            </div>
            <AiActions />
          </section>

          <LifecycleSection data={data} update={update} />

          <VersionHistory revisions={data.revisions} />

          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-accent-navy text-parchment text-sm px-6 py-2.5 rounded-full hover:bg-midnight transition-colors">Save Article</button>
            <button type="button" onClick={onCancel} className="text-sm text-midnight/60 px-6 py-2.5 rounded-full border border-stone hover:border-midnight/20 transition-colors">Cancel</button>
          </div>
        </form>
      </div>

      {showPreview && <ArticlePreview article={{ ...data, reading_time: readingTime, word_count: wordCount }} onClose={() => setShowPreview(false)} />}
      {showImport && <HermesImportDialog onApply={handleApplyImport} onClose={() => setShowImport(false)} />}
    </div>
  );
}