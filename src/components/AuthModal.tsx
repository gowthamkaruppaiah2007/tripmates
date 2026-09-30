import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff, ShieldCheck, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, signIn, signUp, isSupabaseConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    if (authModalMode === 'signup' && !fullName) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setLoading(true);
    try {
      if (authModalMode === 'login') {
        const res = await signIn(email, password);
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          closeAuthModal();
          resetForm();
        }
      } else {
        const res = await signUp(email, password, fullName);
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          closeAuthModal();
          resetForm();
        }
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 via-gray-900 to-sky-950 border border-sky-500/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Background glow header */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-sky-600/20 via-emerald-600/20 to-amber-500/20 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 z-10 p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="px-8 pt-8 pb-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 mb-3 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <img src="/logo.jpg" alt="Logo" className="w-4 h-4 rounded-full object-cover" />
            <span>TripMates Tamil Nadu</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {authModalMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {authModalMode === 'login'
              ? 'Log in to sync your travel plans & saved trips'
              : 'Join TripMates to start planning & finding travel partners'}
          </p>
        </div>

        {/* Supabase status badge */}
        <div className="px-8 py-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <Database className={`h-4 w-4 ${isSupabaseConfigured ? 'text-emerald-400' : 'text-sky-400'}`} />
              <span>Storage: <strong className="text-white">{isSupabaseConfigured ? 'Supabase Database' : 'Instant Cloud Storage'}</strong></span>
            </div>
            <span className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
              <ShieldCheck className="h-3 w-3" />
              <span>Secured</span>
            </span>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="px-8 py-2">
          <div className="grid grid-cols-2 p-1 bg-gray-950/60 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => { openAuthModal('login'); setErrorMsg(''); }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all ${
                authModalMode === 'login'
                  ? 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { openAuthModal('signup'); setErrorMsg(''); }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all ${
                authModalMode === 'signup'
                  ? 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-8 mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-4 relative z-10">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Kavitha Raman"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-950/70 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500 hover:from-sky-600 hover:to-amber-600 shadow-lg shadow-sky-500/25 transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Modal Footer */}
        <div className="px-8 pb-8 text-center text-xs text-gray-400 border-t border-white/5 pt-4">
          {authModalMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => { openAuthModal('signup'); setErrorMsg(''); }}
                className="text-amber-400 font-semibold hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => { openAuthModal('login'); setErrorMsg(''); }}
                className="text-amber-400 font-semibold hover:underline"
              >
                Log in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
