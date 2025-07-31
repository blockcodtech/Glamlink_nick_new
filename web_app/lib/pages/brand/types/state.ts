import { 
  Brand, 
  Product, 
  CertifiedProvider, 
  BeforeAfter, 
  TrainingProgram, 
  Review,
  ProductCategory,
  SkinType
} from './index';

// Redux State Interface
export interface BrandStateInterface {
  brand: Brand | null;
  products: Product[];
  providers: CertifiedProvider[];
  beforeAfters: BeforeAfter[];
  trainingPrograms: TrainingProgram[];
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  filters: FilterOptions;
  searchQuery: string;
  isReviewModalOpen: boolean;
  isSubmittingReview: boolean;
}

// Filter Options
export interface FilterOptions {
  category?: ProductCategory;
  skinType?: SkinType;
  priceRange?: {
    min: number;
    max: number;
  };
  inStockOnly?: boolean;
  spotlightOnly?: boolean;
}

// API Response Types
export interface BrandApiResponse {
  success: boolean;
  data?: {
    brand: Brand;
    products: Product[];
    providers: CertifiedProvider[];
    beforeAfters: BeforeAfter[];
    programs: TrainingProgram[];
    reviews: Review[];
  };
  error?: string;
}