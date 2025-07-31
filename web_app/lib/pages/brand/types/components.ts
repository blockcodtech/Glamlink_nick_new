import { 
  Brand, 
  Product, 
  CertifiedProvider, 
  TrainingProgram, 
  Review 
} from './index';
import { BrandStateInterface, FilterOptions } from './state';

// BrandPage Component Types
export type BrandPageProps = {
  state: BrandStateInterface;
  handlers?: BrandPageHandlers;
};

export interface BrandPageHandlers {
  onFilterChange: (filters: FilterOptions) => void;
  onFollowToggle: () => void;
  onSearchChange: (query: string) => void;
}

// BrandHeader Component Types
export type BrandHeaderProps = {
  state: BrandHeaderState;
  handlers?: BrandHeaderHandlers;
};

export interface BrandHeaderState {
  brand: Brand;
}

export interface BrandHeaderHandlers {
  onFollowToggle: () => void;
}

// ProductTabs Component Types
export type ProductTabsProps = {
  state: ProductTabsState;
  handlers?: ProductTabsHandlers;
};

export interface ProductTabsState {
  activeTab: string;
  tabs: BrandTab[];
}

export interface ProductTabsHandlers {
  onTabChange: (tabId: string) => void;
}

// ProductGrid Component Types
export type ProductGridProps = {
  state: ProductGridState;
  handlers?: ProductGridHandlers;
};

export interface ProductGridState {
  products: Product[];
  filters: FilterOptions;
  isLoading: boolean;
}

export interface ProductGridHandlers {
  onFilterChange: (filters: FilterOptions) => void;
  onProductClick: (productId: string) => void;
}

// CertifiedProviders Component Types
export type CertifiedProvidersProps = {
  state: CertifiedProvidersState;
  handlers?: CertifiedProvidersHandlers;
};

export interface CertifiedProvidersState {
  providers: CertifiedProvider[];
  isLoading: boolean;
}

export interface CertifiedProvidersHandlers {
  onProviderClick: (providerId: string) => void;
}

// BeforeAfterGallery Component Types
export type BeforeAfterGalleryProps = {
  state: BeforeAfterGalleryState;
  handlers?: BeforeAfterGalleryHandlers;
};

export interface BeforeAfterGalleryState {
  items: Product[];
  isLoading: boolean;
}

export interface BeforeAfterGalleryHandlers {
  onItemClick: (itemId: string) => void;
}

// TrainingInfo Component Types
export type TrainingInfoProps = {
  state: TrainingInfoState;
  handlers?: TrainingInfoHandlers;
};

export interface TrainingInfoState {
  programs: TrainingProgram[];
  isLoading: boolean;
}

export interface TrainingInfoHandlers {
  onProgramClick: (programId: string) => void;
  onEnroll: (programId: string) => void;
}

// ReviewsSection Component Types
export type ReviewsSectionProps = {
  state: ReviewsSectionState;
  handlers?: ReviewsSectionHandlers;
};

export interface ReviewsSectionState {
  reviews: Review[];
  isLoading: boolean;
}

export interface ReviewsSectionHandlers {
  onReviewHelpful: (reviewId: string) => void;
  onWriteReview: () => void;
}

// BrandTab interface (moved from config)
export interface BrandTab {
  id: string;
  label: string;
  icon?: string;
  badgeCount?: number;
}