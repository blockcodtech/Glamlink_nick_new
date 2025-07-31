import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product, Brand, Review } from "../../types";
import brandReadService from "../../server/brandReadService";

export function useProductDetailPage(brandId: string, productId: string) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = useCallback(async () => {
    try {
      setIsLoading(true);
      const brandData = await brandReadService.getBrand(brandId);
      
      if (!brandData) {
        router.push('/brand');
        return;
      }

      setBrand(brandData);

      // Find the specific product
      const foundProduct = brandData.products?.find(p => p.id === productId);
      if (!foundProduct) {
        router.push(`/brand/${brandId}`);
        return;
      }

      setProduct(foundProduct);

      // Get related products (same category, different ID)
      const related = brandData.products?.filter(
        p => p.category === foundProduct.category && p.id !== productId
      ).slice(0, 4) || [];
      setRelatedProducts(related);

      // Get reviews for this product
      const reviews = brandData.reviews?.filter(r => r.productId === productId) || [];
      setProductReviews(reviews);

    } catch (error) {
      // Error fetching product data
      router.push(`/brand/${brandId}`);
    } finally {
      setIsLoading(false);
    }
  }, [brandId, productId, router]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / productReviews.length).toFixed(1));
  }, [productReviews]);

  // Get all product images
  const productImages = useMemo(() => {
    if (!product) return [];
    const images = [];
    
    // Only add main image if it exists and is not empty
    if (product.image && typeof product.image === 'string' && product.image.trim() !== '') {
      images.push(product.image);
    }
    
    // Add additional images, filtering out empty ones
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        // Check if img is a string
        if (typeof img === 'string' && img.trim() !== '') {
          images.push(img);
        }
        // Handle case where img might be an object with url property
        else if (typeof img === 'object' && img && (img as any).url && typeof (img as any).url === 'string' && (img as any).url.trim() !== '') {
          // Push only the URL string, not the object
          images.push((img as any).url);
        }
      });
    }
    
    // Ensure we return an array with valid strings only
    return images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  }, [product]);

  // Handlers
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  }, []);

  const handleAddToCart = useCallback(() => {
    // TODO: Implement add to cart functionality
  }, [quantity, product]);

  const handleNavigateToRelatedProduct = useCallback((relatedProductId: string) => {
    router.push(`/brand/${brandId}/products/${relatedProductId}`);
  }, [brandId, router]);

  return {
    // State
    product,
    brand,
    relatedProducts,
    productReviews,
    isLoading,
    selectedImage,
    quantity,
    averageRating,
    productImages,
    
    // Handlers
    setSelectedImage,
    handleQuantityChange,
    handleAddToCart,
    handleNavigateToRelatedProduct
  };
}