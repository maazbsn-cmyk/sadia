import React, { useState, useEffect } from 'react';
import { Screen, User, DesignItem, AnalysisResult, ChatMessage } from './types';
import { initialUser, sampleDesigns, defaultAnalysisResult, initialChatMessages } from './data';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingScreen } from './components/LandingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { UploadScreen } from './components/UploadScreen';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ChatScreen } from './components/ChatScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<User>(initialUser);
  const [uploadResetKey, setUploadResetKey] = useState(0);

  // Load saved designs from localStorage on mount or fallback to sampleDesigns
  const [designs, setDesigns] = useState<DesignItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_saved_designs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load designs from localStorage:', e);
    }
    return sampleDesigns;
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(defaultAnalysisResult);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [darkMode, setDarkMode] = useState(false);

  // Sync designs state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumina_saved_designs', JSON.stringify(designs));
    } catch (e) {
      console.error('Failed to save designs to localStorage:', e);
    }
  }, [designs]);

  // Synchronize dark mode class on HTML document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = async (params: {
    roomType: string;
    style: string;
    budget: string;
    imageBase64?: string;
  }) => {
    // Navigate to analyzing loading screen immediately
    handleNavigate('analyzing');

    try {
      const res = await fetch('/api/analyze-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data = await res.json();
        const fullResult: AnalysisResult = {
          ...data,
          analyzedImage: params.imageBase64 || defaultAnalysisResult.analyzedImage,
          roomType: params.roomType,
          style: params.style,
          budget: params.budget,
        };

        setAnalysisResult(fullResult);

        // Save every room analysis automatically in local storage & state
        const autoSavedItem: DesignItem = {
          id: `design-${Date.now()}`,
          title: `${fullResult.style} ${fullResult.roomType}`,
          roomType: fullResult.roomType,
          style: fullResult.style,
          styleTag: fullResult.style.substring(0, 7).toUpperCase(),
          budget: fullResult.budget,
          createdText: 'Created just now',
          analyzedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          image: fullResult.analyzedImage,
          isFavorite: false,
          score: fullResult.designScore,
          tips: fullResult.tips,
          analysisData: fullResult,
        };

        setDesigns((prev) => [autoSavedItem, ...prev]);
      }
    } catch (error) {
      console.error('Failed to fetch AI room analysis:', error);
    }
  };

  const handleSaveDesign = (resultToSave: AnalysisResult) => {
    setDesigns((prev) => {
      const existingIdx = prev.findIndex(
        (d) => d.image === resultToSave.analyzedImage && d.roomType === resultToSave.roomType
      );
      if (existingIdx >= 0) {
        const clone = [...prev];
        clone[existingIdx] = {
          ...clone[existingIdx],
          isFavorite: true,
          analysisData: resultToSave,
        };
        return clone;
      }

      const newDesign: DesignItem = {
        id: `design-${Date.now()}`,
        title: `${resultToSave.style} ${resultToSave.roomType}`,
        roomType: resultToSave.roomType,
        style: resultToSave.style,
        styleTag: resultToSave.style.substring(0, 7).toUpperCase(),
        budget: resultToSave.budget,
        createdText: 'Created just now',
        analyzedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: resultToSave.analyzedImage,
        isFavorite: true,
        score: resultToSave.designScore,
        tips: resultToSave.tips,
        analysisData: resultToSave,
      };
      return [newDesign, ...prev];
    });
  };

  const handleDeleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAnalyzeAnotherRoom = () => {
    setAnalysisResult(defaultAnalysisResult);
    setUploadResetKey((prev) => prev + 1);
    handleNavigate('upload');
  };

  const handleSelectDesign = (design: DesignItem) => {
    if (design.analysisData) {
      setAnalysisResult(design.analysisData);
    } else {
      setAnalysisResult({
        ...defaultAnalysisResult,
        analyzedImage: design.image,
        roomType: design.roomType,
        style: design.style,
        budget: design.budget || 'Medium',
        designScore: design.score || 8.4,
        tips: design.tips || defaultAnalysisResult.tips,
      });
    }
  };

  const handleToggleFavorite = (id: string) => {
    setDesigns((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedImage: data.suggestedImage,
        };
        setChatMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'I am here to help you style your space! Feel free to ask about furniture recommendations or color themes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        user={user}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        showBack={['results', 'upload', 'chat'].includes(currentScreen)}
        title={
          currentScreen === 'results'
            ? 'Spatial Analysis'
            : currentScreen === 'upload'
            ? 'Analyze Space'
            : currentScreen === 'chat'
            ? 'AI Assistant'
            : 'Lumina Design'
        }
      />

      {/* Main View Router */}
      {currentScreen === 'landing' && (
        <LandingScreen onGetStarted={() => handleNavigate('auth')} />
      )}

      {currentScreen === 'auth' && (
        <AuthScreen
          onLoginSuccess={(email) => {
            setUser({
              name: 'Sadia Shabir',
              email: email || 'sadia.shabir@lumina.design',
              avatar: initialUser.avatar,
              isLoggedIn: true,
            });
            handleNavigate('home');
          }}
          onContinueAsGuest={() => {
            setUser({
              name: 'Guest User',
              email: 'guest@lumina.design',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
              isLoggedIn: false,
            });
            handleNavigate('home');
          }}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          user={user}
          designs={designs}
          onNavigate={handleNavigate}
          onSelectDesign={(design) => {
            handleSelectDesign(design);
            handleNavigate('results');
          }}
        />
      )}

      {currentScreen === 'upload' && (
        <UploadScreen
          onStartAnalysis={handleStartAnalysis}
          resetKey={uploadResetKey}
        />
      )}

      {currentScreen === 'analyzing' && (
        <AnalyzingScreen onComplete={() => handleNavigate('results')} />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          data={analysisResult}
          onNavigate={handleNavigate}
          onSaveDesign={handleSaveDesign}
          onAnalyzeAnother={handleAnalyzeAnotherRoom}
        />
      )}

      {currentScreen === 'chat' && (
        <ChatScreen
          user={user}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryScreen
          designs={designs}
          onNavigate={handleNavigate}
          onSelectDesign={(design) => {
            handleSelectDesign(design);
            handleNavigate('results');
          }}
          onToggleFavorite={handleToggleFavorite}
          onDeleteDesign={handleDeleteDesign}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          user={user}
          onNavigate={handleNavigate}
          onLogout={() => {
            setUser({
              name: 'Guest User',
              email: 'guest@lumina.design',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
              isLoggedIn: false,
            });
            handleNavigate('auth');
          }}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
