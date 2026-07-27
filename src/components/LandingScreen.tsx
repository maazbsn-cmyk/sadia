import React from 'react';

interface LandingScreenProps {
  onGetStarted: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-mesh min-h-screen flex flex-col items-center justify-between font-body text-on-background relative overflow-hidden px-6 py-10">
      {/* Background Texture Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] opacity-20 blur-3xl rounded-full bg-[#dbe1ff] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] opacity-20 blur-3xl rounded-full bg-[#c4e7ff] pointer-events-none" />

      <main className="relative z-10 w-full max-w-md flex flex-col items-center justify-between min-h-[780px] my-auto">
        {/* Header/Logo Area */}
        <div className="flex flex-col items-center text-center mt-6">
          {/* Animated Abstract Logo Container */}
          <div className="w-32 h-32 glass-card rounded-[2rem] flex items-center justify-center mb-6 animate-float relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <span className="material-symbols-outlined text-6xl gradient-text">
              architecture
            </span>
            {/* Subtle pulsing AI node */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-tertiary rounded-full animate-pulse shadow-[0_0_12px_rgba(106,30,219,0.5)]" />
          </div>

          <h1 className="font-headline text-4xl tracking-tight mb-2">
            <span className="text-on-surface">Lumina</span>
            <span className="gradient-text">Design</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-[280px] leading-snug">
            Transform Your Space with AI
          </p>
        </div>

        {/* Featured Interior Peek Card */}
        <div className="w-full my-8 relative group">
          <div className="glass-card rounded-[1.5rem] p-2 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500 shadow-xl">
            <div className="aspect-[4/3] rounded-[1.25rem] overflow-hidden relative">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACtgICuWzUqx56aiWk32cBwiAVE6N82vVC_YrYtFi18QGr1M2euUg-cREqGr0Ibt_96neUOs4HUpwdOfAptM12tpigbUGWCcIL5tpMt_IVI6c09CAD18jNyWb3Y4Ch5ZwXcBh_4hMjvGrkVYsJjnIXS-zRmx17VSBEALMcWXcXICtS09syvIINoQe6FQ5WuwYQAPfqTuyYnRi843_5mQVAtBRY7VE9yBpDbKaxan2rNzmSNgAoXHcrSYk3HyVu9NJVgUxagpwo6Oas"
                alt="Modern Sanctuary living room concept"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-1 block">
                    AI Concept #402
                  </span>
                  <span className="text-white font-headline text-2xl font-semibold leading-none">
                    Modern Sanctuary
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                  <span className="text-white text-[12px] font-medium">98% Match</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
        </div>

        {/* Footer / CTA Area */}
        <div className="w-full space-y-4">
          <button
            id="landing-get-started-btn"
            onClick={onGetStarted}
            className="w-full primary-gradient text-on-primary font-headline text-xl py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center group cursor-pointer"
          >
            Get Started
            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>

          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiteGF3iEDkYINKS4nEmjuNCfCI0lNpxOOffBbOJnZ0wlDW-TAFhx3eQ7iI6v3CAuLyfMfCFLNNmHrJnXn7XhF06_6jnszFSh_RPv7XChwhMwKt8JxdAkiqWqJrzrpsIAzqykdeZN4rlx3GdtWElyI59VGShzzH43BU1j5LlayBNYrfMqa4Ca0uRQYgPCfBZlUzmcpOTcWaRP3sEUq_iTT-DLu_HtKAy8d9f-SaDr5b4Nkr7nk_TcB_P8bfEP2qEusKEMXg8yqdMKW"
                  alt="Designer 1"
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAiXcZQIntPyjYO3sYvzFSFHG8IVl4Sr4Y66eDAF1hdyLUns-t3fNP_lI-EAzushqx4-gtv9fxcdc9ARAh3XrflvrtOjvq3I2CynkA59UlCs5EL6CfoUn0H7giV-VdVn5Y3leFAMYdqosJs0905Cjf6vFMYghlKLave35QZ4mQshy8XiYmW2MkxLm-nSkOtq5okwPQ5rIhXcTrKzXNETVEAFtfZXTgq2CKB4n5F2PYMVpdLtkV4tmWqAq7o-HssGY4gArKvYumbhPk"
                  alt="Designer 2"
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL3WVEzemJo5EYFh5Sg9mSfrONGSyLYIsprUexgtFL7yHTx8hF-PwMYM6DS0gQQsUsS4X_F_xy_3_dG70ST4ZpUpVM58RLkTD5OkX3ubiJic_SOtUdaDBM3jFKG_HY8m2FKa_XN0jLE-VKDGqqXUWOeEuhjFaGY7TE9oXlSf4e4VOXPsORqPuGWZhkF6JhOP4W-BQDWO593ScXHkzfhGwdSgsZXl8LXTiLog_xmYaMIDeryU2nG0aybnbRZp8pzXnKkOE8AyneFFmF"
                  alt="Designer 3"
                />
              </div>
            </div>
            <p className="text-[12px] font-semibold text-on-surface-variant/70">
              Trusted by 10k+ designers
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
