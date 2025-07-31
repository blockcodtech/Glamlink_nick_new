// ============================================
// BRAND-RELATED TYPE DEFINITIONS
// ============================================

import { BrainstormIdea } from '@/lib/services/ai/contentGeneratorService';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  mission: string;
  description: string;
  summary?: string; // Short blurb for brand cards
  category?: string; // Brand category (e.g., "Beauty", "Skincare", "Wellness")
  themeColor?: string; // Hex color for brand card background
  profileImage: string;
  coverImage?: string;
  website?: string;
  socialLinks?: SocialLinks;
  location?: string;
  isFollowing: boolean;
  followerCount: number;
  createdAt: string;
  updatedAt: string;
  ownerId?: string; // User ID of the brand owner
  isPublished?: boolean; // Whether the brand is publicly visible
  publishedAt?: string; // Timestamp when brand was published
  spotlightProductId?: string; // ID of the featured/spotlight product
  // Nested content arrays
  products: Product[];
  certifiedProviders: CertifiedProvider[];
  trainingPrograms: TrainingProgram[];
  reviews: Review[];
  brainstormIdeas?: BrainstormIdea[];
  questionnaire?: BrandQuestionnaire;
  // Legacy field - to be removed after migration
  beforeAfters?: BeforeAfter[];
}

export interface BrandQuestionnaire {
  id: string;
  brandId: string;
  brandOverview: {
    vision: string;
    targetAudience: string;
    uniqueSellingPoints: string[];
    currentProducts?: string;
    inspiration?: string;
  };
  products: {
    description: string;
    images: string[];
    categories: string[];
    priceRange: { min: number; max: number };
    ingredients?: string;
    benefits?: string;
  };
  training: {
    goals: string;
    targetLearners: string;
    certificationTypes: string[];
    duration?: string;
    priceRange?: { min: number; max: number };
  };
  beforeAfter: {
    transformationGoals: string;
    treatmentTypes: string[];
    expectedDuration: string;
    targetConcerns?: string[];
  };
  providers: {
    specialtiesNeeded: string[];
    certificationLevels: string[];
    locationPreferences: string;
    experienceLevel?: string;
  };
  createdAt: string;
  lastUpdated: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // Legacy field for backward compatibility
  thumbnailImage?: string;
  images?: string[];
  imageAlt?: string;
  imagesAlt?: string[];
  category: ProductCategory;
  skinType?: SkinType[];
  description: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
  isSpotlight: boolean;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  beforeImagePrimary?: string;
  beforeImages?: Array<{ url: string; altText: string }>;
  afterImagePrimary?: string;
  afterImages?: Array<{ url: string; altText: string }>;
  createdAt: string;
}

export interface CertifiedProvider {
  id: string;
  name: string;
  profileImage: string; // Legacy field for backward compatibility
  thumbnailImage?: string;
  images?: Array<{ url: string; altText: string }>;
  imageAlt?: string;
  imagesAlt?: string[];
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  certificationDate: string;
  certificationLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  isVerified: boolean;
  bio?: string;
  yearsExperience?: number;
  phone?: string;
  email?: string;
  services?: string[];
}

export interface BeforeAfter {
  id: string;
  beforeImage: string; // Legacy field for backward compatibility
  afterImage: string; // Legacy field for backward compatibility
  beforeThumbnailImage?: string;
  afterThumbnailImage?: string;
  beforeImages?: Array<{ url: string; altText: string }>;
  afterImages?: Array<{ url: string; altText: string }>;
  beforeImageAlt?: string;
  afterImageAlt?: string;
  beforeImagesAlt?: string[];
  afterImagesAlt?: string[];
  treatmentType: string;
  duration: string;
  description?: string;
  providerId?: string;
  providerName?: string;
  productIds?: string[];
  productsUsed?: string[];
  testimonial?: string;
  createdAt: string;
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  certificationOffered: boolean;
  price?: number;
  enrollmentCount: number;
  nextSessionDate?: string;
  image?: string; // Legacy field for backward compatibility
  thumbnailImage?: string;
  images?: string[];
  imageAlt?: string;
  imagesAlt?: string[];
  topics?: string[];
  instructorName?: string;
  instructorTitle?: string;
  instructorImage?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
  verifiedPurchase: boolean;
  productId?: string;
  providerId?: string;
  createdAt: string;
}

export type ProductCategory = 
  | 'skincare'
  | 'makeup'
  | 'haircare'
  | 'tools'
  | 'supplements'
  | 'treatments';

export type SkinType = 
  | 'oily'
  | 'dry'
  | 'combination'
  | 'sensitive'
  | 'normal'
  | 'all';

// Re-export all types for convenience
export type {
  BrainstormIdea
} from '@/lib/services/ai/contentGeneratorService';

// Re-export state types
export type {
  BrandApiResponse,
  BrandStateInterface,
  FilterOptions
} from './state';