import { useState, useMemo } from "react";
import { BrandStateInterface } from "../../types/state";
import { Product } from "../../types";

export function useSummaryTab(state: BrandStateInterface) {
  const { products, providers, trainingPrograms, reviews, filters } = state;
  const [currentAfterImageIndex, setCurrentAfterImageIndex] = useState(0);
  const [currentBeforeImageIndex, setCurrentBeforeImageIndex] = useState(0);
  
  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.skinType && !product.skinType?.includes(filters.skinType)) return false;
      if (filters.priceRange) {
        const price = product.price;
        if (price < filters.priceRange.min || price > filters.priceRange.max) return false;
      }
      return true;
    });
  }, [products, filters]);
  
  // Get spotlight product and its images
  const spotlightProduct = useMemo(() => {
    return filteredProducts.find(p => p.isSpotlight) || filteredProducts[0];
  }, [filteredProducts]);
  
  // Extract URLs properly from object structure
  const extractImageUrl = (img: any): string => {
    if (typeof img === 'string') return img;
    if (img && typeof img === 'object' && img.url) return img.url;
    return '';
  };
  
  // Get before images with deduplication
  const spotlightBeforeImages = useMemo(() => {
    if (!spotlightProduct) return [];
    
    const beforeImageUrls = new Set<string>();
    return [
      ...(spotlightProduct.beforeImagePrimary && !beforeImageUrls.has(spotlightProduct.beforeImagePrimary) 
        ? (beforeImageUrls.add(spotlightProduct.beforeImagePrimary), [{ url: spotlightProduct.beforeImagePrimary, isPrimary: true }]) 
        : []),
      ...(spotlightProduct.beforeImages || []).map(img => {
        const url = extractImageUrl(img);
        if (url && !beforeImageUrls.has(url)) {
          beforeImageUrls.add(url);
          return { url, isPrimary: false };
        }
        return null;
      }).filter((img): img is { url: string; isPrimary: boolean } => img !== null)
    ];
  }, [spotlightProduct]);
  
  // Get after images with deduplication
  const spotlightAfterImages = useMemo(() => {
    if (!spotlightProduct) return [];
    
    const afterImageUrls = new Set<string>();
    return [
      ...(spotlightProduct.afterImagePrimary && !afterImageUrls.has(spotlightProduct.afterImagePrimary) 
        ? (afterImageUrls.add(spotlightProduct.afterImagePrimary), [{ url: spotlightProduct.afterImagePrimary, isPrimary: true }]) 
        : []),
      ...(spotlightProduct.afterImages || []).map(img => {
        const url = extractImageUrl(img);
        if (url && !afterImageUrls.has(url)) {
          afterImageUrls.add(url);
          return { url, isPrimary: false };
        }
        return null;
      }).filter((img): img is { url: string; isPrimary: boolean } => img !== null)
    ];
  }, [spotlightProduct]);
  
  // Navigation handlers for before images carousel
  const handlePrevBeforeImage = () => {
    setCurrentBeforeImageIndex(prev => {
      const newIndex = prev === 0 ? spotlightBeforeImages.length - 1 : prev - 1;
      return newIndex;
    });
  };
  
  const handleNextBeforeImage = () => {
    setCurrentBeforeImageIndex(prev => {
      const newIndex = (prev + 1) % spotlightBeforeImages.length;
      return newIndex;
    });
  };
  
  // Navigation handlers for after images carousel
  const handlePrevAfterImage = () => {
    setCurrentAfterImageIndex(prev => {
      const newIndex = prev === 0 ? spotlightAfterImages.length - 1 : prev - 1;
      return newIndex;
    });
  };
  
  const handleNextAfterImage = () => {
    setCurrentAfterImageIndex(prev => {
      const newIndex = (prev + 1) % spotlightAfterImages.length;
      return newIndex;
    });
  };
  
  // Get top items for each section
  const topProducts = filteredProducts.slice(0, 3);
  const topProviders = providers.slice(0, 4);
  const topPrograms = trainingPrograms.slice(0, 2);
  const topReviews = reviews.slice(0, 3);
  
  // Get products with transformations
  const productsWithTransformations = useMemo(() => {
    return products
      .filter(product => product.beforeImagePrimary && product.afterImagePrimary)
      .slice(0, 3);
  }, [products]);
  
  // Theme colors for reviews
  const reviewThemeColors = ["#1F2937", "#DC2626", "#059669", "#7C3AED", "#2563EB", "#DB2777"];
  
  return {
    // State
    currentAfterImageIndex,
    currentBeforeImageIndex,
    
    // Computed values
    filteredProducts,
    spotlightProduct,
    spotlightBeforeImages,
    spotlightAfterImages,
    topProducts,
    topProviders,
    topPrograms,
    topReviews,
    productsWithTransformations,
    reviewThemeColors,
    
    // Handlers
    handlePrevBeforeImage,
    handleNextBeforeImage,
    handlePrevAfterImage,
    handleNextAfterImage,
    
    // Utilities
    extractImageUrl
  };
}