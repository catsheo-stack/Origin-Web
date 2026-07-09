import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ArticleEditor from '@/components/admin/ArticleEditor';
import { STATUS_FLOW, STATUS_META, formatRelativeTime, countWords, calculateReadingTime } from '@/components/admin/editor/cmsUtils';

const SORT_OPTIONS = [
  { key: 'updated', label: 'Updated' },
  { key: 'status', label: 'Status' },
  { key: 'category', label: 'Category' },
  { key: 'featured', label: 'Featured' },
];

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [sortDir, setSortDir] = useState('desc');

  const loadArticles = async () => {
    setLoading(true);
    try {
      const list = await base44.entities.Article.list('-updated_date', 100);
      setArticles(list);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadArticles(); }, []);

  const handleSave = async (data) => {
    const now = new Date().toISOString();
    if (editing === 'new') {
      const revisions = [{ version: 1, action: 'Created', timestamp: now, title: data.title, status: data.status, word_count: data.word_count }];
      await base44.entities.Article.create({ ...data, revisions });
    } else {
      const existing = editing.revisions || [];
      const action = data.status === 'published' && editing.status !== 'published' ? 'Published' : 'Updated';
      const revisions = [...existing, { version: existing.length + 1, action, timestamp: now, title: data.title, status: data.status, word_count: data.word_count }];
      await base44.entities.Article.update(editing.id, { ...data, revisions });
    }
    setEditing(null);
    loadArticles();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    await base44.entities.Article.delete(id);
    loadArticles();
  };

  const updateStatus = async (article, status) => {
    await base44.entities.Article.update(article.id, { status });
    loadArticles();
  };

  const toggleFeatured = async (article) => {
    await base44.entities.Article.update(article.id, { featured: !article.featured });
    loadArticles();
  };

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir(key === 'updated' ? 'desc' : 'asc');
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) =>
      [a.title, a.category, a.slug, a.focus_keyword, a.status].some((f) =>
        (f || '').toLowerCase().includes(q)
      )
    );
  }, [articles, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let av, bv;
      switch (sortBy) {
        case 'status':
          av = STATUS_FLOW.indexOf(a.status);
          bv = STATUS_FLOW.indexOf(b.status);
          break;
        case 'category':
          av = (a.category || '').toLowerCase();
          bv = (b.category || '').toLowerCase();
          break;
        case 'featured':
          av = a.featured ? 1 : 0;
          bv = b.featured ? 1 : 0;
          break;
        case 'updated':
        default:
          av = new Date(a.updated_date || 0).getTime();
          bv = new Date(b.updated_date || 0).getTime();
          break;
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  if (editing !== null) {
    return (
      <ArticleEditor
        article={editing === 'new' ? null : editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-parchment p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-midnight/50 hover:text-accent-navy transition-colors mb-6">
          <ArrowLeft size={14} />
          Back to site
        </Link>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-2xl text-midnight">Article Manager</h1>
            <p className="text-sm text-midnight/50 mt-1">Origin CMS v2 · {articles.length} article(s)</p>
          </div>
          <button
            onClick={() => setEditing('new')}
            className="bg-accent-navy text-parchment text-sm px-5 py-2.5 rounded-full hover:bg-midnight transition-colors"
          >
            New Article
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category, slug, keyword or status"
              className="w-full border border-stone rounded-full pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:border-accent-navy"
            />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => toggleSort(opt.key)}
                className={`flex items-center gap-1 text-xs px-3 py-2 rounded-full transition-colors ${sortBy === opt.key ? 'bg-accent-navy text-parchment' : 'bg-white text-midnight/50 border border-stone'}`}
              >
                {opt.label}
                {sortBy === opt.key && (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-4 border-stone border-t-golden rounded-full animate-spin mx-auto" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : sorted.length === 0 ? (
          <p className="text-center text-midnight/40 py-12">
            {search ? 'No articles match your search.' : 'No articles yet. Create your first article.'}
          </p>
        ) : (
          <div className="space-y-3">
            {sorted.map((article) => {
              const words = countWords(article.body);
              const rt = article.reading_time || calculateReadingTime(article.body);
              const statusMeta = STATUS_META[article.status] || STATUS_META.draft;
              return (
                <div key={article.id} className="bg-white rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="font-heading text-sm font-medium text-midnight">{article.title || 'Untitled'}</h3>
                        {article.featured && <span className="text-xs bg-golden/20 text-golden px-2 py-0.5 rounded-full">Featured</span>}
                      </div>
                      <p className="text-xs text-midnight/40">{article.category} · /article/{article.slug}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap text-xs text-midnight/40">
                        <span>Updated {formatRelativeTime(article.updated_date)}</span>
                        <span>· {words.toLocaleString()} words</span>
                        <span>· {rt} min read</span>
                        <span>· SEO: {article.seo_score || 'Pending'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={article.status || 'draft'}
                        onChange={(e) => updateStatus(article, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer ${statusMeta.color}`}
                      >
                        {STATUS_FLOW.map((s) => (
                          <option key={s} value={s}>{STATUS_META[s].label}</option>
                        ))}
                      </select>
                      <button onClick={() => setEditing(article)} className="text-xs text-accent-navy hover:underline px-2">Edit</button>
                      <button onClick={() => toggleFeatured(article)} className="text-xs text-golden hover:underline px-2">{article.featured ? 'Unfeature' : 'Feature'}</button>
                      <button onClick={() => handleDelete(article.id)} className="text-xs text-red-500 hover:underline px-2">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}