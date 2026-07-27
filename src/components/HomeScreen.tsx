import React from 'react';
import { Screen, User, DesignItem } from '../types';

interface HomeScreenProps {
  user: User;
  designs: DesignItem[];
  onNavigate: (screen: Screen) => void;
  onSelectDesign: (design: DesignItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  designs,
  onNavigate,
  onSelectDesign,
}) => {
  const displayName = user.isLoggedIn ? (user.name || 'Sadia Shabir') : 'Guest User';
  const firstName = user.isLoggedIn ? (displayName.split(' ')[0] || 'Sadia') : 'Guest';

  return (
    <main className="pt-24 pb-28 px-6 max-w-7xl mx-auto space-y-10">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-primary via-[#0053db] to-secondary text-on-primary shadow-xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,white_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline text-2xl md:text-3xl font-bold mb-3 leading-tight">
            Welcome back, {firstName}! Ready to transform your space?
          </h2>
          <p className="font-body text-base opacity-90 max-w-lg mb-6 leading-relaxed">
            Our AI interior assistant has generated 4 new concepts for your living room project based on your style profile.
          </p>
          <button
            id="home-view-suggestions-btn"
            onClick={() => onNavigate('upload')}
            className="bg-white text-primary font-headline text-sm font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            View New Suggestions
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <button
          id="home-upload-image-card"
          onClick={() => onNavigate('upload')}
          className="glass-card flex flex-col items-center justify-center gap-3 p-8 rounded-3xl group hover:border-primary/40 transition-all text-center cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[32px]">upload_file</span>
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold text-on-surface">Upload Room Image</h3>
            <p className="text-xs text-on-surface-variant/80 mt-1">Drag and drop or browse files</p>
          </div>
        </button>

        <button
          id="home-take-photo-card"
          onClick={() => onNavigate('upload')}
          className="glass-card flex flex-col items-center justify-center gap-3 p-8 rounded-3xl group hover:border-secondary/40 transition-all text-center cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold text-on-surface">Take Photo</h3>
            <p className="text-xs text-on-surface-variant/80 mt-1">Use camera for instant scanning</p>
          </div>
        </button>
      </section>

      {/* Previous Designs Horizontal Scroll */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Previous Designs</h2>
          <button
            id="home-view-all-designs-btn"
            onClick={() => onNavigate('history')}
            className="text-primary font-semibold text-sm hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-3 pt-1">
          {designs.map((design) => (
            <div
              key={design.id}
              onClick={() => {
                onSelectDesign(design);
                onNavigate('results');
              }}
              className="flex-shrink-0 w-64 glass-card p-2 rounded-2xl group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={design.image}
                  alt={design.title}
                />
                <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                  {design.styleTag}
                </div>
              </div>
              <div className="px-3 pb-3">
                <p className="font-headline text-base font-semibold text-on-surface truncate">
                  {design.title}
                </p>
                <p className="text-xs text-on-surface-variant/70 mt-0.5">
                  {design.createdText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating AI Chat Assistant FAB */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          id="home-chat-fab"
          onClick={() => onNavigate('chat')}
          className="w-14 h-14 rounded-full bg-tertiary text-on-tertiary shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden cursor-pointer border-2 border-white/20"
          title="Ask AI Assistant"
        >
          <span className="material-symbols-outlined text-[28px] relative z-10">forum</span>
        </button>
      </div>
    </main>
  );
};
