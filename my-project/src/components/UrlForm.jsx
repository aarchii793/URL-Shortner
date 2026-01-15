import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

const UrlForm = ({ isAuthenticated }) => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    setError('');
    setShortUrl('');
    setCopied(false);

    if (!url || !url.startsWith('http')) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const requestBody = {
        full_url: url,
        ...(isAuthenticated && customSlug ? { slug: customSlug } : {}),
        ...(isAuthenticated && customName ? { customName } : {}),
      };

      const res = await axiosInstance.post('/api/create', requestBody);
      const { short_url } = res.data;

      if (short_url) {
        setShortUrl(short_url);
      } else {
        setError('Unexpected server response');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    // 🌙 FULL PAGE DARK BACKGROUND
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">

      {/* 🌟 CARD */}
      <div className="
        w-full max-w-xl
        bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50
        rounded-2xl
        shadow-2xl
        p-8
        border border-white/20
      ">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          🔗 URL Shortener
        </h1>

        <p className="text-center text-sm text-slate-500 mb-8">
          Paste a long link and get a clean, shareable short URL
        </p>

        {/* URL INPUT */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-slate-300 text-slate-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {isAuthenticated && (
            <>
              <input
                type="text"
                placeholder="Custom slug (optional)"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-slate-300 text-slate-800
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />

              <input
                type="text"
                placeholder="Custom name (optional)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-slate-300 text-slate-800
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </>
          )}
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleShorten}
            className="px-8 py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-blue-600 to-emerald-500
              hover:from-blue-700 hover:to-emerald-600
              transition-all duration-300 shadow-md hover:shadow-lg"
          >
            🚀 Shorten URL
          </button>
        </div>

        {/* RESULT */}
        {shortUrl && (
          <div className="mt-8 bg-white/70 border border-slate-200 rounded-xl p-5 text-center">
            <p className="text-sm text-slate-600 mb-2">
              Your shortened URL
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline break-all"
              >
                {shortUrl}
              </a>

              <button
                onClick={handleCopy}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition
                  ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
              >
                {copied ? '✔ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
