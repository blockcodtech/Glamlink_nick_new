import { BrandStateInterface } from "./state";
import { Brand, Product } from "./index";

// Navigation types
export interface BrandNavigationProps {
  brandId: string;
  productCount?: number;
  providerCount?: number;
  galleryCount?: number;
  trainingCount?: number;
  reviewCount?: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  count?: number;
}

// Summary tab types
export interface SummaryTabProps {
  state: BrandStateInterface;
  handlers: {
    onFilterChange: (filters: any) => void;
    onProductClick: (productId: string) => void;
    onProviderClick: (providerId: string) => void;
    onItemClick: (itemId: string) => void;
    onProgramClick: (programId: string) => void;
    onEnroll: (programId: string) => void;
    onReviewHelpful: (reviewId: string) => void;
    onWriteReview: () => void;
  };
}

// Spotlight section types
export interface SpotlightSectionProps {
  spotlightProduct: Product | undefined;
  spotlightBeforeImages: Array<{ url: string; isPrimary: boolean }>;
  spotlightAfterImages: Array<{ url: string; isPrimary: boolean }>;
  currentBeforeImageIndex: number;
  currentAfterImageIndex: number;
  handlePrevBeforeImage: () => void;
  handleNextBeforeImage: () => void;
  handlePrevAfterImage: () => void;
  handleNextAfterImage: () => void;
  handleProductClick: (productId: string) => void;
}

// Brand page types
export interface BrandPageProps {
  brandId?: string;
}

// All brands page constants
export const DEFAULT_THEME_COLORS = [
  "#1F2937", // Dark gray
  "#DC2626", // Red
  "#059669", // Green
  "#7C3AED", // Purple
  "#2563EB", // Blue
  "#DB2777", // Pink
  "#EA580C", // Orange
];

export const DEFAULT_CATEGORIES = [
  "Beauty",
  "Skincare",
  "Wellness",
  "Cosmetics",
  "Hair Care",
  "Spa & Salon",
  "Natural Beauty",
];

// Social icon types
export interface SocialIconProps {
  platform: string;
}

// Extended brand type for all brands page
export interface ExtendedBrand extends Brand {
  category?: string;
  themeColor?: string;
  summary?: string;
}