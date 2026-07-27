import React, { useState } from 'react';
import { DesignItem, Screen } from '../types';

interface HistoryScreenProps {
  designs: DesignItem[];
  onNavigate: (screen: Screen) => void;
  onSelectDesign: (design: DesignItem) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteDesign?: (id: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  designs,
  onNavigate,
  onSelectDesign,
  onToggleFavorite,
  onDeleteDesign,
}) => {
  const [activeTab, setActiveTab] = useState<'recent' | 'favorites' | 'by-style'>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDesigns = designs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.style.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'favorites') return item.isFavorite;
    return true;
  });

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-6">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface">
            Design History
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">
            Browse and manage your AI room analyses & concepts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved designs..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1a233a] border border-outline-variant/50 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Segmented Tab Filter */}
      <div className="flex border-b border-outline-variant/30 gap-6">
        {[
          { id: 'recent', label: 'Recent Designs' },
          { id: 'favorites', label: 'Favorites' },
          { id: 'by-style', label: 'By Style' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 font-label text-sm font-semibold transition-all relative cursor-pointer ${
                isActive
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Designs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card Box */}
        <button
          onClick={() => onNavigate('upload')}
          className="border-2 border-dashed border-outline-variant/60 rounded-2xl min-h-[320px] flex flex-col items-center justify-center p-6 text-center hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface">
            Start a New Design
          </h3>
          <p className="text-xs text-on-surface-variant mt-1 max-w-[200px]">
            Upload another space for AI spatial analysis & render
          </p>
        </button>

        {filteredDesigns.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl p-3 space-y-3 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative mb-3 bg-surface-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-primary hover:scale-110 active:scale-95 transition-all"
                  title="Toggle Favorite"
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      item.isFavorite ? 'fill-1 text-rose-500' : 'text-outline'
                    }`}
                  >
                    favorite
                  </span>
                </button>

                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {item.styleTag}
                </div>
              </div>

              <div className="px-1 space-y-1">
                <div className="flex justify-between items-start gap-1">
                  <h3 className="font-headline text-base font-bold text-on-surface truncate">
                    {item.title}
                  </h3>
                  {item.score && (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md flex-shrink-0">
                      {item.score} / 10
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant font-medium">
                  {item.roomType} • {item.style} {item.budget ? `(${item.budget} Budget)` : ''}
                </p>
                {item.analysisData?.tips && item.analysisData.tips.length > 0 && (
                  <p className="text-[11px] text-on-surface-variant/80 italic line-clamp-1 pt-1">
                    "{item.analysisData.tips[0]}"
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-outline font-medium">
                    {item.analyzedDate}
                  </span>
                  {onDeleteDesign && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteDesign(item.id);
                      }}
                      className="text-xs text-rose-500 hover:text-rose-700 p-1 flex items-center gap-0.5 cursor-pointer"
                      title="Delete saved analysis"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectDesign(item);
                onNavigate('results');
              }}
              className="w-full py-2.5 bg-surface-container hover:bg-primary hover:text-white transition-colors rounded-xl font-headline text-xs font-semibold text-primary flex items-center justify-center gap-1 cursor-pointer"
            >
              View Full Report
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
