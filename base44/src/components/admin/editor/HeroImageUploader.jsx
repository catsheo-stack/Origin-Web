import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { inputClass, labelClass } from './SectionCard';

export default function HeroImageUploader({ value, update }) {
  const [mode, setMode] = useState(value ? 'preview' : 'upload');
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      update('hero_image_url', file_url);
      setMode('preview');
    } catch (e) {
      alert('Upload failed: ' + (e.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const applyUrl = () => {
    if (urlInput.trim()) {
      update('hero_image_url', urlInput.trim());
      setMode('preview');
      setUrlInput('');
    }
  };

  const remove = () => {
    update('hero_image_url', '');
    setMode('upload');
  };

  return (
    <div>
      <label className={labelClass}>Hero Image</label>
      {value && mode === 'preview' ? (
        <div className="relative rounded-lg overflow-hidden border border-stone group">
          <img src={value} alt="Hero preview" className="w-full max-h-56 object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="bg-white/90 backdrop-blur text-midnight text-xs px-3 py-1.5 rounded-full hover:bg-white flex items-center gap-1 shadow-sm"
            >
              <Upload size={12} /> Replace
            </button>
            <button
              type="button"
              onClick={remove}
              className="bg-white/90 backdrop-blur text-red-500 text-xs px-3 py-1.5 rounded-full hover:bg-white flex items-center gap-1 shadow-sm"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${mode === 'upload' ? 'bg-accent-navy text-parchment' : 'bg-stone text-midnight/60'}`}
            >
              <Upload size={12} className="inline mr-1" /> Upload
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${mode === 'url' ? 'bg-accent-navy text-parchment' : 'bg-stone text-midnight/60'}`}
            >
              <LinkIcon size={12} className="inline mr-1" /> Paste URL
            </button>
          </div>
          {mode === 'upload' ? (
            <div
              onClick={() => !uploading && fileRef.current?.click()}
              className="border-2 border-dashed border-stone rounded-lg p-8 text-center cursor-pointer hover:border-accent-navy hover:bg-parchment/30 transition-colors"
            >
              {uploading ? (
                <div className="w-6 h-6 border-4 border-stone border-t-golden rounded-full animate-spin mx-auto" />
              ) : (
                <>
                  <ImageIcon className="mx-auto text-midnight/30 mb-2" size={24} />
                  <p className="text-sm text-midnight/50">Click to upload an image</p>
                  <p className="text-xs text-midnight/30 mt-1">PNG, JPG up to 5MB</p>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={applyUrl}
                className="bg-accent-navy text-parchment text-sm px-4 rounded-lg whitespace-nowrap hover:bg-midnight transition-colors"
              >
                Use
              </button>
            </div>
          )}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}