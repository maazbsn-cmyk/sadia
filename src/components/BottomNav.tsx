import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Suppress bottom bar on landing, auth, and analyzing screens
  if (['landing', 'auth', 'analyzing'].includes(currentScreen)) {
    return null;
  }

  const navItems: { id: Screen; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'upload', label: 'Upload', icon: 'add_a_photo' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'chat', label: 'Chat', icon: 'forum' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-safe pt-2 bg-white/80 dark:bg-[#131b2e]/90 backdrop-blur-2xl border-t border-white/40 dark:border-white/10 shadow-[0_-10px_40px_rgba(15,23,42,0.05)] z-50 rounded-t-xl transition-colors duration-300">
      <div className="w-full max-w-xl mx-auto flex justify-around items-center py-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 transition-all ${
                isActive
                  ? 'text-primary dark:text-[#b4c5ff] font-bold scale-110'
                  : 'text-on-surface-variant/60 dark:text-outline-variant/60 hover:text-primary/80 dark:hover:text-[#b4c5ff]'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-2xl ${isActive ? 'fill-1' : ''}`}
              >
                {item.icon}
              </span>
              <span className="text-[12px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
