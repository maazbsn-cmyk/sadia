import React, { useState } from 'react';

interface AuthScreenProps {
  onLoginSuccess: (email?: string) => void;
  onContinueAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onContinueAsGuest,
}) => {
  const [view, setView] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('sadia.shabir@lumina.design');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body text-on-background antialiased relative">
      {/* Top Header Logo */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="font-headline text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            Lumina Design
          </span>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-[440px] flex flex-col items-center">
          {/* Segmented Control for Login/Signup */}
          <div className="w-full mb-8">
            <div className="bg-surface-container-low p-1 rounded-xl flex relative h-12 border border-outline-variant/30">
              <div
                className={`absolute h-10 w-[calc(50%-4px)] top-1 bg-white rounded-lg shadow-sm transition-all duration-300 ${
                  view === 'signup' ? 'left-[calc(50%+2px)]' : 'left-1'
                }`}
              />
              <button
                type="button"
                id="auth-login-tab"
                onClick={() => setView('login')}
                className={`relative z-10 flex-1 font-label text-sm font-semibold transition-colors ${
                  view === 'login' ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                id="auth-signup-tab"
                onClick={() => setView('signup')}
                className={`relative z-10 flex-1 font-label text-sm font-semibold transition-colors ${
                  view === 'signup' ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Auth Card */}
          <div className="glass-card w-full rounded-[2rem] p-8 md:p-10 shadow-2xl">
            <div className="mb-6">
              <h1 className="font-headline text-3xl font-semibold text-on-surface mb-2">
                {view === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="font-body text-sm text-on-surface-variant">
                {view === 'login'
                  ? 'Access your personalized AI interior studio.'
                  : 'Join thousands of designers creating spaces.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant ml-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline-variant">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant ml-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline-variant">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-outline-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password (Signup only) */}
              {view === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-outline-variant">
                      verified_user
                    </span>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {view === 'login' && (
                <div className="flex justify-end">
                  <a
                    href="#forgot"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs font-semibold text-primary hover:underline transition-all"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                id="auth-submit-btn"
                className="w-full primary-gradient text-on-primary py-3.5 rounded-xl font-headline text-base font-semibold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all mt-4 cursor-pointer"
              >
                {view === 'login' ? 'Sign In' : 'Get Started'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-outline-variant/30" />
              <span className="px-4 text-[10px] font-bold tracking-widest text-outline uppercase">
                OR CONTINUE WITH
              </span>
              <div className="flex-grow h-px bg-outline-variant/30" />
            </div>

            {/* Social Google Sign-in */}
            <button
              type="button"
              id="google-signin-btn"
              onClick={() => onLoginSuccess()}
              className="w-full bg-white border border-outline-variant py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-low transition-colors active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <img
                alt="Google"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPY--XrwwocmQomDIYNpiDEEw-gveEhOlsfbmO-yxKAQJxOHiNJcFrCMyGnvk676bBpA16wdevls1MwZ1v34xG6bupa3Qp_6NZl9wB2EeryMVv02WdIrc4jn1ORxTTa7snxpO5zj9KdJ2m3mBG5oHh9LzVCE6OH_MXHh0voliI7-ieHctxgNi4Xo-KH3gv0fwweyR_Ri0JFOPq7nQ8H20duecG1Tv0zDWrBxnTqy-nhUh0DydQzxHgKNssPyzBk9gER6_c-xXDP5Y3"
              />
              <span className="text-sm font-semibold text-on-surface">
                Google Account
              </span>
            </button>

            {/* Guest Access */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                id="auth-guest-btn"
                onClick={onContinueAsGuest}
                className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group cursor-pointer"
              >
                <span>Continue as Guest</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-outline/80">
              Secure 256-bit SSL encrypted connection. <br />
              By continuing, you agree to our{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="underline hover:text-primary transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Atmospheric Blur Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>
    </div>
  );
};
