import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

const userUrls = () => {
  const [urls, setUrls] = useState([]);
  const [copiedSlug, setCopiedSlug] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axiosInstance.get('/api/user/urls');
        setUrls(res.data.urls || []);
      } catch (err) {
        console.error('Failed to fetch URLs:', err);
      }
    };

    fetchUrls();
  }, []);

  const handleCopy = async (shortUrl, slug) => {
    await navigator.clipboard.writeText(shortUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(''), 2000);
  };

  return (
    // 🌙 FULL PAGE BACKGROUND
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      
      {/* 💎 CONTAINER */}
      <div className="
        max-w-6xl mx-auto
        bg-white/90 backdrop-blur-md
        border border-white/20
        rounded-2xl
        shadow-2xl
        p-6
      ">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          📋 My Shortened URLs
        </h2>

        {urls.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            No URLs created yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3">Full URL</th>
                  <th className="px-4 py-3">Short URL</th>
                  <th className="px-4 py-3 text-center">Clicks</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {urls.map((url) => (
                  <tr
                    key={url._id}
                    className="
                      bg-slate-50
                      hover:bg-slate-100
                      transition
                      rounded-xl
                    "
                  >
                    <td className="px-4 py-3 max-w-xs truncate">
                      <a
                        href={url.full_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {url.full_url}
                      </a>
                    </td>

                    <td className="px-4 py-3">
                      <a
                        href={url.short_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 font-medium hover:underline"
                      >
                        {url.short_url}
                      </a>
                    </td>

                    <td className="px-4 py-3 text-center font-semibold text-slate-700">
                      {url.clicks}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleCopy(url.short_url, url.slug)}
                        className={`
                          px-4 py-1.5 rounded-full text-xs font-medium transition
                          ${
                            copiedSlug === url.slug
                              ? 'bg-emerald-500 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }
                        `}
                      >
                        {copiedSlug === url.slug ? '✔ Copied' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default userUrls;
