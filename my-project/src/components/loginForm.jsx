import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/login', formData);
      dispatch(login(res.user));
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    // 🌙 FULL PAGE DARK BACKGROUND
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      {/* 💎 LOGIN CARD */}
      <div className="
        w-full max-w-lg
        bg-white/90 backdrop-blur-md
        border border-white/20
        rounded-2xl
        shadow-2xl
        px-10 py-8
      ">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-slate-500 mb-8">
          Login to manage your shortened URLs
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* EMAIL */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="
                w-full pl-11 pr-4 py-2.5
                border border-slate-300 rounded-xl
                text-slate-800
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="
                w-full pl-11 pr-4 py-2.5
                border border-slate-300 rounded-xl
                text-slate-800
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              "
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-sm text-right">
            <a
              href="#"
              className="text-blue-600 hover:text-emerald-500 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              w-full py-2.5 rounded-xl
              font-semibold text-white
              bg-gradient-to-r from-blue-600 to-emerald-500
              hover:from-blue-700 hover:to-emerald-600
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            🔐 Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6 text-slate-600">
          Don’t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-blue-600 font-medium hover:text-emerald-500 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
