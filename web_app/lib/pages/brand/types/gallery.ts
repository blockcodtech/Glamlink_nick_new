import { BeforeAfter, CertifiedProvider, Brand, Product } from "./index";

// Main component props
export interface BeforeAfterDetailPageProps {
  brandId: string;
  transformationId: string;
}

// Slider component props
export interface BeforeAfterSliderProps {
  transformation: BeforeAfter;
  beforeImages: string[];
  afterImages: string[];
  selectedBeforeIndex: number;
  selectedAfterIndex: number;
  sliderPosition: number;
  isSliding: boolean;
  setIsSliding: (isSliding: boolean) => void;
  handleSliderMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// Image galleries props
export interface ImageGalleriesProps {
  beforeImages: string[];
  afterImages: string[];
  selectedBeforeIndex: number;
  selectedAfterIndex: number;
  setSelectedBeforeIndex: (index: number) => void;
  setSelectedAfterIndex: (index: number) => void;
}

// Transformation details props
export interface TransformationDetailsProps {
  transformation: BeforeAfter;
  products: Product[];
  handleNavigateToProduct: (productId: string) => void;
}

// Transformation sidebar props
export interface TransformationSidebarProps {
  transformation: BeforeAfter;
  provider: CertifiedProvider | null;
  brand: Brand;
  handleNavigateToProvider: (providerId: string) => void;
}