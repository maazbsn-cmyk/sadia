import React from 'react';
import { Screen, User } from '../types';

interface NavbarProps {
  currentScreen: Screen;
  user: User;
  onNavigate: (screen: Screen) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  showBack?: boolean;
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  user,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  showBack,
  title
}) => {
  if (currentScreen === 'landing') return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/75 dark:bg-[#1a233a]/75 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              id="nav-back-button"
              onClick={() => onNavigate('home')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : (
            <div 
              onClick={() => onNavigate('profile')} 
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                className="w-full h-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
            </div>
          )}
          <h1 
            onClick={() => onNavigate('home')}
            className="font-headline text-xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
          >
            {title || "Lumina Design"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            id="notifications-button"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full"
            title="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            id="theme-toggle-button"
            onClick={onToggleDarkMode}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="material-symbols-outlined">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
