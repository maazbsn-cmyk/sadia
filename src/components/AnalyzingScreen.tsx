import React, { useEffect, useState } from 'react';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const STAGES = [
  "Initializing Engine",
  "Geometry Mapping",
  "Texture Detection",
  "Lighting Calculation",
  "Material Matching",
  "Generating Render"
];

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(24);
  const [stageIndex, setStageIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 5;
        const currentNext = Math.min(next, 98);
        const idx = Math.floor((currentNext / 100) * STAGES.length);
        setStageIndex(Math.min(idx, STAGES.length - 1));
        return currentNext;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col justify-center items-center relative px-6 py-12 overflow-hidden">
      {/* Central Content */}
      <div className="relative z-10 w-full max-w-md text-center space-y-8 my-auto">
        {/* Analysis Visualization */}
        <div className="relative flex justify-center items-center h-64">
          {/* Decorative Pulse Rings */}
          <div className="absolute w-48 h-48 rounded-full border border-primary/20 animate-pulse-ring" />
          <div
            className="absolute w-64 h-64 rounded-full border border-primary/10 animate-pulse-ring"
            style={{ animationDelay: '1s' }}
          />

          {/* Main AI Icon Container */}
          <div className="glass-card w-40 h-40 rounded-full flex items-center justify-center animate-float relative overflow-hidden group shadow-xl">
            <div className="absolute inset-0 scanning-beam opacity-30 h-full w-24 blur-md" />
            <span className="material-symbols-outlined text-primary text-6xl">
              psychology
            </span>
            {/* Orbitals */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_10s_linear_infinite]" />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-2 right-6 glass-card px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Lighting Map</span>
          </div>
          <div className="absolute bottom-8 left-2 glass-card px-3 py-1.5 rounded-xl shadow-sm text-xs font-semibold text-secondary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>3D Mesh</span>
          </div>
        </div>

        {/* Text Header */}
        <div className="space-y-2">
          <h2 className="font-headline text-2xl md:text-3xl font-semibold text-primary">
            AI is analysing your room...
          </h2>
          <p className="font-body text-sm text-on-surface-variant max-w-[280px] mx-auto leading-relaxed">
            Identifying textures, dimensions, and natural lighting patterns for the perfect design.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-4">
          <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden relative shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(0,74,198,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-outline font-semibold">
            <span>{STAGES[stageIndex]}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Pro Tip Card */}
        <div className="glass-card rounded-2xl p-5 text-left flex gap-4 border-l-4 border-l-primary items-start shadow-md">
          <span className="material-symbols-outlined text-primary text-2xl fill-1 flex-shrink-0">
            info
          </span>
          <div>
            <span className="block font-headline text-sm font-semibold text-on-surface mb-1">
              Pro Tip
            </span>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Lumina is currently measuring ceiling height to recommend the ideal scale for light fixtures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
