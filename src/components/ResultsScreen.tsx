import React, { useState } from 'react';
import { AnalysisResult, Screen } from '../types';
import { generatePdfReport } from '../utils/generatePdf';

interface ResultsScreenProps {
  data: AnalysisResult;
  onNavigate: (screen: Screen) => void;
  onSaveDesign: (data: AnalysisResult) => void;
  onAnalyzeAnother?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  data,
  onNavigate,
  onSaveDesign,
  onAnalyzeAnother,
}) => {
  const [saved, setSaved] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [shoppingListCount, setShoppingListCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    onSaveDesign(data);
    setSaved(true);
    showToast("Design saved to your history & local storage!");
  };

  const handleAddToCart = (itemTitle: string) => {
    setShoppingListCount((prev) => prev + 1);
    showToast(`Added ${itemTitle} to your shopping list!`);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    showToast("Generating PDF report...");
    try {
      await generatePdfReport(data);
      showToast("PDF report downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      showToast("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleAnalyzeAnother = () => {
    if (onAnalyzeAnother) {
      onAnalyzeAnother();
    } else {
      onNavigate('upload');
    }
  };

  return (
    <main className="pt-24 pb-36 px-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce text-sm font-semibold">
          <span className="material-symbols-outlined fill-1 text-lg">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Bento Grid Top Section: Overview & Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spatial Overview Card */}
        <section className="lg:col-span-8 glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center overflow-hidden shadow-lg">
          <div className="relative w-full md:w-1/2 h-64 rounded-xl overflow-hidden group">
            <img
              src={data.analyzedImage}
              alt={data.spatialOverview}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-md">
                {data.roomType}
              </span>
              <span className="px-3 py-1 bg-white/90 text-on-surface text-xs font-semibold rounded-full backdrop-blur-md">
                {data.style}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary">
                Spatial Overview
              </h2>
              <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                {data.spatialOverview}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Style Match
                </span>
                <span className="font-bold text-primary text-base">
                  {data.styleMatch}
                </span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Tone Map
                </span>
                <span className="font-bold text-primary text-base">
                  {data.toneMap}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Score Gauge */}
        <section className="lg:col-span-4 glass-card-elevated rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
          <h3 className="text-xs font-bold text-on-surface-variant tracking-wider uppercase mb-4">
            DESIGN SCORE
          </h3>
          <div className="relative w-36 h-36 rounded-full flex items-center justify-center mb-4 p-3 bg-gradient-to-tr from-primary to-secondary text-white shadow-xl hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full bg-white dark:bg-[#1e293b] rounded-full flex flex-col items-center justify-center text-on-surface">
              <span className="text-3xl font-extrabold text-primary">
                {data.designScore}
              </span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                {data.scoreLabel}
              </span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
            Your space ranks in the {data.percentileRank} of balanced interior layouts.
          </p>
        </section>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wall Colour */}
        <div className="glass-card rounded-2xl p-5 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined">format_paint</span>
            <h4 className="text-xs uppercase tracking-wider">Wall Colour</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Detected:</span>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-outline-variant shadow-sm"
                  style={{ backgroundColor: data.wallColour.hex }}
                />
                <span className="font-semibold text-xs text-on-surface">
                  {data.wallColour.name}
                </span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {data.wallColour.description}
            </p>
          </div>
        </div>

        {/* Lighting Analysis */}
        <div className="glass-card rounded-2xl p-5 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined">wb_sunny</span>
            <h4 className="text-xs uppercase tracking-wider">Lighting Analysis</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Kelvin Temp:</span>
              <span className="font-semibold text-xs text-tertiary">
                {data.lightingAnalysis.kelvin}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {data.lightingAnalysis.description}
            </p>
          </div>
        </div>

        {/* Furniture Assets */}
        <div className="glass-card rounded-2xl p-5 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined">chair</span>
            <h4 className="text-xs uppercase tracking-wider">Furniture Assets</h4>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.furnitureAssets.map((asset, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-surface-container text-primary text-xs font-semibold rounded-md border border-primary/10"
              >
                {asset}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Colour Palette Recommendations */}
      <section className="glass-card rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-on-surface">
            Colour Palette Recommendations
          </h3>
          <button
            onClick={() => showToast("Palette saved to your favorites!")}
            className="text-primary font-semibold text-xs flex items-center gap-1 hover:underline cursor-pointer"
          >
            Save Palette <span className="material-symbols-outlined text-sm">download</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data.colourPalette.map((col, idx) => (
            <div key={idx} className="space-y-2">
              <div
                className="h-24 rounded-xl shadow-inner border border-black/10 transition-transform hover:scale-105"
                style={{ backgroundColor: col.hex }}
              />
              <p className="text-xs font-bold text-on-surface truncate">{col.name}</p>
              <p className="text-[10px] text-on-surface-variant font-medium">{col.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Furniture & Decor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Furniture Matches */}
        <section className="space-y-4">
          <h3 className="font-headline text-xl font-bold text-on-surface">
            Furniture Matches
          </h3>
          <div className="space-y-3">
            {data.furnitureMatches.map((item, idx) => (
              <div
                key={idx}
                className="glass-card-elevated flex gap-4 p-3 rounded-2xl hover:translate-x-1 transition-transform cursor-pointer items-center shadow-sm"
              >
                <div className="w-20 h-20 rounded-xl bg-surface-container overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex justify-between items-center pr-2">
                  <div>
                    <h5 className="font-headline text-base font-bold text-on-surface">
                      {item.title}
                    </h5>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.subtitle}
                    </p>
                    <span className="font-bold text-primary text-sm mt-1 block">
                      {item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item.title)}
                    className="p-2.5 rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                    title="Add to Shopping List"
                  >
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Decoration Guide */}
        <section className="space-y-4">
          <h3 className="font-headline text-xl font-bold text-on-surface">
            Decoration Guide
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {data.decorationGuide.map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-32 bg-surface-container overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="font-headline font-bold text-sm text-on-surface">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-on-surface-variant font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Budget & Design Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estimated Budget */}
        <section className="glass-card rounded-2xl p-6 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">
              Estimated Budget Range
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary">
                {data.budgetRange.min}
              </span>
              <span className="text-on-surface-variant text-xl">—</span>
              <span className="text-3xl font-extrabold text-primary">
                {data.budgetRange.max}
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
              <span>Economy Plan</span>
              <span>Premium Curated</span>
            </div>
            <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>
          </div>
        </section>

        {/* AI Design Tips */}
        <section className="glass-card rounded-2xl p-6 shadow-md">
          <h3 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-4">
            AI Design Tips
          </h3>
          <ul className="space-y-3">
            {data.tips.map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-xs md:text-sm leading-relaxed">
                <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <span className="text-on-surface">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sticky Footer Bar */}
      <footer className="fixed bottom-0 left-0 w-full glass-card-elevated z-40 border-t border-white/40 dark:border-white/10 shadow-2xl py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => showToast(`Shopping List opened (${shoppingListCount} items)`)}
              className="flex-1 md:flex-none px-6 py-3 primary-gradient text-white rounded-xl font-headline font-semibold text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              Shopping List ({shoppingListCount})
            </button>

            <button
              onClick={handleSave}
              className={`flex-1 md:flex-none px-6 py-3 border rounded-xl font-headline font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                saved
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'border-outline-variant text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {saved ? 'check_circle' : 'save'}
              </span>
              {saved ? 'Saved' : 'Save Design'}
            </button>
          </div>

          <div className="flex gap-6 items-center">
            <button
              id="download-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 bg-surface-container hover:bg-primary/10 text-primary border border-primary/20 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">
                {isGeneratingPdf ? 'hourglass_empty' : 'picture_as_pdf'}
              </span>
              {isGeneratingPdf ? 'Generating...' : 'Download PDF Report'}
            </button>

            <button
              id="analyze-another-btn"
              onClick={handleAnalyzeAnother}
              className="px-4 py-2 primary-gradient text-white rounded-xl shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_a_photo</span>
              Analyse Another Room
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
};
