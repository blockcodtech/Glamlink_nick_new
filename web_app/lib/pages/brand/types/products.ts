import { Product, Review } from "./index";

// Main component props
export interface ProductDetailPageProps {
  brandId: string;
  productId: string;
}

// Product image gallery props
export interface ProductImageGalleryProps {
  productImages: string[];
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  imageAlts: string[];
}

// Product info props
export interface ProductInfoProps {
  product: Product;
  averageRating: number;
  totalReviews: number;
}

// Product details props
export interface ProductDetailsProps {
  product: Product;
}

// Product actions props
export interface ProductActionsProps {
  product: Product;
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
  handleAddToCart: () => void;
}

// Product reviews props
export interface ProductReviewsProps {
  productReviews: Review[];
}

// Related products props
export interface RelatedProductsProps {
  relatedProducts: Product[];
  handleNavigateToRelatedProduct: (productId: string) => void;
}