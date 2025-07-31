import { 
  AnalysisResult, 
  AnalysisHistoryItem,
  SkinQualityResult, 
  SymmetryResult, 
  GroomingResult, 
  LightingResult, 
  ExpressionResult, 
  OverallResult 
} from './config';

export const mockAnalysisResult: AnalysisResult = {
  skinQuality: {
    acne: 85,
    oiliness: 70,
    dryness: 80,
    evenness: 75,
    texture: 78,
    recommendations: [
      'Consider using a gentle salicylic acid cleanser to maintain clear skin',
      'Add a hydrating serum with hyaluronic acid to balance moisture levels',
      'Use a vitamin C serum to improve skin tone evenness',
      'Apply a lightweight, non-comedogenic moisturizer daily'
    ]
  },
  facialSymmetry: {
    overallScore: 82,
    eyeSymmetry: 85,
    noseAlignment: 80,
    lipSymmetry: 78,
    facialBalance: 85
  },
  grooming: {
    eyebrows: 'Well-shaped with natural arch. Consider light trimming of the inner edges for a cleaner look.',
    facialHair: 'Clean-shaven appearance is well-maintained.',
    hairCondition: 'Hair appears healthy with good shine. Style is neat and suits face shape well.',
    recommendations: [
      'Maintain current eyebrow shape with regular grooming',
      'Consider using a hair mask weekly for added shine',
      'Keep current hairstyle - it complements your face shape'
    ]
  },
  lighting: {
    quality: 'Good natural lighting with slight shadows on the right side',
    score: 75,
    recommendations: [
      'For better photos, face the light source directly',
      'Avoid harsh overhead lighting that creates shadows',
      'Golden hour lighting would enhance your features'
    ]
  },
  expression: {
    confidence: 88,
    smile: 82,
    eyeContact: 90,
    suggestions: [
      'Your natural smile is engaging - keep it genuine',
      'Excellent eye contact creates connection',
      'Relaxed expression shows confidence'
    ]
  },
  overall: {
    score: 81,
    summary: 'You present a well-groomed, confident appearance with healthy skin and balanced facial features. Your natural expression and eye contact create a positive impression.',
    topRecommendations: [
      'Maintain your current skincare routine with added vitamin C for brightness',
      'Continue regular grooming habits - they\'re working well for you',
      'For photos, position yourself facing natural light sources'
    ]
  }
};

export const mockAnalysisHistory: AnalysisHistoryItem[] = [
  {
    id: 'analysis_1',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    analysisType: 'comprehensive',
    overallScore: 81,
    createdAt: '2024-01-10T10:30:00'
  },
  {
    id: 'analysis_2',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    analysisType: 'skin',
    overallScore: 78,
    createdAt: '2024-01-08T14:20:00'
  },
  {
    id: 'analysis_3',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    analysisType: 'symmetry',
    overallScore: 85,
    createdAt: '2024-01-05T09:15:00'
  }
];


// Default values for empty states
export const defaultSkinQualityResult: SkinQualityResult = {
  acne: 0,
  oiliness: 0,
  dryness: 0,
  evenness: 0,
  texture: 0,
  recommendations: []
};

export const defaultSymmetryResult: SymmetryResult = {
  overallScore: 0,
  eyeSymmetry: 0,
  noseAlignment: 0,
  lipSymmetry: 0,
  facialBalance: 0
};

export const defaultGroomingResult: GroomingResult = {
  eyebrows: '',
  facialHair: '',
  hairCondition: '',
  recommendations: []
};

export const defaultLightingResult: LightingResult = {
  quality: '',
  score: 0,
  recommendations: []
};

export const defaultExpressionResult: ExpressionResult = {
  confidence: 0,
  smile: 0,
  eyeContact: 0,
  suggestions: []
};

export const defaultOverallResult: OverallResult = {
  score: 0,
  summary: '',
  topRecommendations: []
};