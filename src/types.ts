export type Screen = 
  | 'landing' 
  | 'auth' 
  | 'home' 
  | 'upload' 
  | 'analyzing' 
  | 'results' 
  | 'chat' 
  | 'history' 
  | 'profile';

export interface User {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface DesignItem {
  id: string;
  title: string;
  roomType: string;
  style: string;
  styleTag: string; // e.g. 'SCANDI', 'MODERN', 'JAPANDI', 'INDUSTRIAL'
  budget?: string;
  createdText: string;
  analyzedDate: string;
  image: string;
  isFavorite: boolean;
  score?: number;
  tips?: string[];
  analysisData?: AnalysisResult;
}

export interface WallColour {
  name: string;
  hex: string;
  description: string;
}

export interface LightingAnalysis {
  kelvin: string;
  description: string;
}

export interface PaletteColor {
  name: string;
  role: string;
  hex: string;
}

export interface FurnitureMatch {
  title: string;
  subtitle: string;
  price: string;
  image: string;
}

export interface DecorationGuideItem {
  title: string;
  subtitle: string;
  image: string;
}

export interface BudgetRange {
  min: string;
  max: string;
  tier: string;
}

export interface AnalysisResult {
  spatialOverview: string;
  designScore: number;
  scoreLabel: string;
  percentileRank: string;
  styleMatch: string;
  toneMap: string;
  wallColour: WallColour;
  lightingAnalysis: LightingAnalysis;
  furnitureAssets: string[];
  colourPalette: PaletteColor[];
  furnitureMatches: FurnitureMatch[];
  decorationGuide: DecorationGuideItem[];
  budgetRange: BudgetRange;
  tips: string[];
  analyzedImage: string;
  roomType: string;
  style: string;
  budget: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedImage?: string;
  bulletPoints?: string[];
}
