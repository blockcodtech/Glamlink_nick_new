// Image Analysis Page Configuration and Type Definitions

// Redux State Interface
export interface ImageAnalysisStateInterface {
  imageUri: string | null;
  imageFile: File | null;
  prompt: string;
  analysisType: AnalysisType;
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
  analysisHistory: AnalysisHistoryItem[];
}

// Analysis Types
export type AnalysisType = 'comprehensive' | 'skin' | 'symmetry' | 'grooming';

export interface AnalysisCategory {
  key: AnalysisType;
  label: string;
  icon: string;
  description: string;
}

export const ANALYSIS_CATEGORIES: AnalysisCategory[] = [
  { 
    key: 'comprehensive', 
    label: 'Complete Analysis', 
    icon: '🔍',
    description: 'Full beauty assessment including all categories'
  },
  { 
    key: 'skin', 
    label: 'Skin Quality', 
    icon: '🧴',
    description: 'Analyze skin texture, tone, and health'
  },
  { 
    key: 'symmetry', 
    label: 'Facial Symmetry', 
    icon: '📐',
    description: 'Evaluate facial balance and proportions'
  },
  { 
    key: 'grooming', 
    label: 'Grooming & Hair', 
    icon: '💈',
    description: 'Assess grooming and styling'
  },
];

// Analysis Result Types
export interface AnalysisResult {
  skinQuality: SkinQualityResult;
  facialSymmetry: SymmetryResult;
  grooming: GroomingResult;
  lighting: LightingResult;
  expression: ExpressionResult;
  overall: OverallResult;
}

export interface SkinQualityResult {
  acne: number;
  oiliness: number;
  dryness: number;
  evenness: number;
  texture: number;
  recommendations: string[];
}

export interface SymmetryResult {
  overallScore: number;
  eyeSymmetry: number;
  noseAlignment: number;
  lipSymmetry: number;
  facialBalance: number;
}

export interface GroomingResult {
  eyebrows: string;
  facialHair: string;
  hairCondition: string;
  recommendations: string[];
}

export interface LightingResult {
  quality: string;
  score: number;
  recommendations: string[];
}

export interface ExpressionResult {
  confidence: number;
  smile: number;
  eyeContact: number;
  suggestions: string[];
}

export interface OverallResult {
  score: number;
  summary: string;
  topRecommendations: string[];
}

export interface AnalysisHistoryItem {
  id: string;
  imageUrl: string;
  analysisType: AnalysisType;
  overallScore: number;
  createdAt: string;
}

// Component Props Types
export type ImageAnalysisPageProps = {
  state: ImageAnalysisStateInterface;
  handlers?: ImageAnalysisPageHandlers;
};

export interface ImageAnalysisPageHandlers {
  onImageSelect: (file: File) => void;
  onAnalysisTypeChange: (type: AnalysisType) => void;
  onPromptChange: (prompt: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  onSaveAnalysis: () => void;
}

export type ImageUploaderProps = {
  state: ImageUploaderState;
  handlers?: ImageUploaderHandlers;
};

export interface ImageUploaderState {
  imageUri: string | null;
  isLoading: boolean;
}

export interface ImageUploaderHandlers {
  onImageSelect: (file: File) => void;
  onReset: () => void;
}

export type AnalysisTypesProps = {
  state: AnalysisTypesState;
  handlers?: AnalysisTypesHandlers;
};

export interface AnalysisTypesState {
  selectedType: AnalysisType;
  categories: AnalysisCategory[];
}

export interface AnalysisTypesHandlers {
  onTypeSelect: (type: AnalysisType) => void;
}

export type AnalysisResultsProps = {
  state: AnalysisResultsState;
  handlers?: AnalysisResultsHandlers;
};

export interface AnalysisResultsState {
  result: AnalysisResult;
  isLoading: boolean;
}

export interface AnalysisResultsHandlers {
  onSave: () => void;
  onShare: () => void;
}

// API Types
export interface AnalysisApiRequest {
  imageBase64: string;
  analysisType: AnalysisType;
  customPrompt?: string;
}

export interface AnalysisApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

// Constants
export const IMAGE_ANALYSIS_API_ENDPOINT = "/api/image-analysis/analyze";
export const SAVE_ANALYSIS_API_ENDPOINT = "/api/image-analysis/save";
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Score color utilities
export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // amber
  if (score >= 40) return '#f97316'; // orange
  return '#ef4444'; // red
};

export const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Improvement';
};