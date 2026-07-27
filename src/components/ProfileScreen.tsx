import React, { useState } from 'react';
import { User, Screen } from '../types';

interface ProfileScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onNavigate,
  onLogout,
  darkMode,
  onToggleDarkMode,
}) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <main className="pt-24 pb-32 px-6 max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="glass-card rounded-[2rem] p-6 text-center flex flex-col items-center relative overflow-hidden shadow-xl">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Edit Avatar"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>

        <h2 className="font-headline text-2xl font-bold text-on-surface">
          {user.isLoggedIn ? (user.name || "Sadia Shabir") : "Guest User"}
        </h2>
        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
          {user.isLoggedIn ? (user.email || "sadia.shabir@lumina.design") : "guest@lumina.design"}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
          <span className="material-symbols-outlined text-sm fill-1">verified</span>
          {user.isLoggedIn ? "Pro AI Designer" : "Guest Designer"}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center">
          <span className="font-headline text-2xl font-bold text-primary block">
            4
          </span>
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Saved Designs
          </span>
        </div>

        <div className="glass-card rounded-2xl p-4 text-center">
          <span className="font-headline text-2xl font-bold text-secondary block">
            1
          </span>
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Favorites
          </span>
        </div>

        <div className="glass-card rounded-2xl p-4 text-center">
          <span className="font-headline text-2xl font-bold text-tertiary block">
            88%
          </span>
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Avg Match
          </span>
        </div>
      </div>

      {/* Preferences & Settings */}
      <div className="glass-card rounded-2xl p-4 divide-y divide-outline-variant/20 shadow-md">
        {/* Dark Mode */}
        <div className="py-3 flex justify-between items-center px-2">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">dark_mode</span>
            <div>
              <span className="font-headline text-sm font-semibold text-on-surface block">
                Dark Theme
              </span>
              <span className="text-xs text-on-surface-variant">
                Toggle dark atmosphere mode
              </span>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
              darkMode ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notifications */}
        <div className="py-3 flex justify-between items-center px-2">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <div>
              <span className="font-headline text-sm font-semibold text-on-surface block">
                Notifications
              </span>
              <span className="text-xs text-on-surface-variant">
                AI render completion alerts
              </span>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
              notifications ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* History Quick Access */}
        <div
          onClick={() => onNavigate('history')}
          className="py-3 flex justify-between items-center px-2 hover:bg-surface-container/50 rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">folder</span>
            <div>
              <span className="font-headline text-sm font-semibold text-on-surface block">
                Saved Palettes & Collections
              </span>
              <span className="text-xs text-on-surface-variant">
                View saved furniture lists and palettes
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline">chevron_right</span>
        </div>

        {/* Help & Support */}
        <div className="py-3 flex justify-between items-center px-2 hover:bg-surface-container/50 rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">help</span>
            <div>
              <span className="font-headline text-sm font-semibold text-on-surface block">
                Help & Support
              </span>
              <span className="text-xs text-on-surface-variant">
                FAQs, AI design guide & feedback
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline">chevron_right</span>
        </div>
      </div>

      {/* Logout Action */}
      <button
        id="profile-logout-btn"
        onClick={onLogout}
        className="w-full py-3.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 rounded-xl font-headline font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">{user.isLoggedIn ? 'logout' : 'login'}</span>
        {user.isLoggedIn ? 'Log Out' : 'Sign In / Register'}
      </button>
    </main>
  );
};
