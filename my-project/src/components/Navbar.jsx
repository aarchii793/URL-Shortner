import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Helper to get cookie value by name
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    const token = getCookie('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    navigate('/auth/login');
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        w-full
        bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
        border-b border-white/10
        text-white
        px-6 sm:px-16
        py-4
        flex items-center justify-between
        shadow-lg
      "
    >
      {/* 🔗 Logo */}
      <Link
        to="/"
        className="text-xl sm:text-2xl font-bold tracking-wide
          text-white hover:text-emerald-400 transition-colors"
      >
        URL<span className="text-emerald-400">Shortify</span>
      </Link>

      {/* 🧭 Navigation */}
      <div className="flex items-center gap-6 text-sm sm:text-base font-medium">
        {!isLoggedIn ? (
          <>
            <Link
              to="/auth/login"
              className="text-slate-200 hover:text-emerald-400 transition-colors"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="
                px-4 py-1.5 rounded-full
                bg-gradient-to-r from-blue-600 to-emerald-500
                hover:from-blue-700 hover:to-emerald-600
                transition-all shadow-md
              "
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-slate-200 hover:text-emerald-400 transition-colors"
            >
              Create URL
            </Link>

            <Link
              to="/dashboard"
              className="text-slate-200 hover:text-emerald-400 transition-colors"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="
                px-4 py-1.5 rounded-full
                text-red-300
                border border-red-400/40
                hover:bg-red-500 hover:text-white
                transition-all
              "
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
