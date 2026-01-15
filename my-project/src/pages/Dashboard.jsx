import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const [copiedSlug, setCopiedSlug] = useState(null);

  const fetchUrls = async () => {
    try {
      const res = await axiosInstance.get('/api/user/urls');
      setUrls(res.data.urls || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch URLs');
    }
  };

  const handleCopy = async (shortUrl, slug) => {
    await navigator.clipboard.writeText(shortUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    // 🌙 FULL PAGE DARK BACKGROUND
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12">

      <h1 className="text-4xl font-bold text-center mb-12 text-white tracking-tight">
        🔗 Your Shortened URLs
      </h1>

      {error && (
        <p className="text-red-400 text-center mb-6 font-medium">
          {error}
        </p>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {urls.length === 0 ? (
          <div className="
            text-center
            bg-white/10 backdrop-blur-md
            border border-white/20
            rounded-2xl
            p-12
            shadow-lg
          ">
            <p className="text-lg font-medium text-white">
              You haven’t created any URLs yet.
            </p>
            <p className="text-sm mt-2 text-slate-300">
              Start by generating your first short link 🚀
            </p>
          </div>
        ) : (
          urls.map((url, index) => (
            <div
              key={url._id || index}
              className="
                group
                bg-white/90 backdrop-blur-md
                border border-white/20
                rounded-2xl
                p-6
                shadow-md
                hover:shadow-2xl
                transition-all duration-300
              "
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* URL INFO */}
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Original URL
                    </p>
                    <a
                      href={url.full_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 font-medium break-all hover:text-blue-600 hover:underline"
                    >
                      {url.full_url}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Short URL
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={url.short_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        {url.short_url}
                      </a>
                      

                      <button
                        onClick={() => handleCopy(url.short_url, url.slug)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition
                          ${
                            copiedSlug === url.slug
                              ? 'bg-emerald-500 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                      >
                        {copiedSlug === url.slug ? '✔ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {url.customName && (
                    <p className="text-sm text-slate-500 italic">
                      Label:{' '}
                      <span className="text-slate-700">
                        {url.customName}
                      </span>
                    </p>
                  )}
                </div>

                {/* CLICKS */}
                {url.clicks != null && (
                  <div className="flex items-center justify-center min-w-[120px]">
                    <div className="
                      bg-gradient-to-br from-blue-100 to-emerald-100
                      border border-slate-200
                      rounded-xl
                      px-6 py-4
                      text-center
                    ">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Clicks
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {url.clicks}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
