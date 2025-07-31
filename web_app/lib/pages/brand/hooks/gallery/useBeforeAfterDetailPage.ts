import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BeforeAfter, Brand, Product, CertifiedProvider } from "../../types";
import brandReadService from "../../server/brandReadService";

export function useBeforeAfterDetailPage(brandId: string, transformationId: string) {
  const router = useRouter();
  const [transformation, setTransformation] = useState<BeforeAfter | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [provider, setProvider] = useState<CertifiedProvider | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const [selectedBeforeIndex, setSelectedBeforeIndex] = useState(0);
  const [selectedAfterIndex, setSelectedAfterIndex] = useState(0);

  const fetchTransformationData = useCallback(async () => {
    try {
      setIsLoading(true);
      const brandData = await brandReadService.getBrand(brandId);
      
      if (!brandData) {
        router.push('/brand');
        return;
      }

      setBrand(brandData);

      // Find the specific transformation
      const foundTransformation = brandData.beforeAfters?.find(ba => ba.id === transformationId);
      if (!foundTransformation) {
        router.push(`/brand/${brandId}`);
        return;
      }

      setTransformation(foundTransformation);

      // Get associated provider if any
      if (foundTransformation.providerId) {
        const associatedProvider = brandData.certifiedProviders?.find(p => p.id === foundTransformation.providerId);
        if (associatedProvider) {
          setProvider(associatedProvider);
        }
      }

      // Get associated products if any
      if (foundTransformation.productIds && foundTransformation.productIds.length > 0) {
        const associatedProducts = brandData.products?.filter(p => 
          foundTransformation.productIds?.includes(p.id)
        ) || [];
        setProducts(associatedProducts);
      }

    } catch (error) {
      // Error fetching transformation data
      router.push(`/brand/${brandId}`);
    } finally {
      setIsLoading(false);
    }
  }, [brandId, transformationId, router]);

  useEffect(() => {
    fetchTransformationData();
  }, [fetchTransformationData]);

  const handleSliderMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSliding) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  }, [isSliding]);

  // Get all before images (including the main one)
  const getAllBeforeImages = useCallback(() => {
    if (!transformation) return [];
    const images = [];
    
    // Add main image if it exists and is not empty
    if (transformation.beforeImage && transformation.beforeImage.trim() !== '') {
      images.push(transformation.beforeImage);
    }
    
    // Add additional images, filtering out empty ones
    if (transformation.beforeImages && transformation.beforeImages.length > 0) {
      transformation.beforeImages.forEach((img) => {
        // beforeImages is typed as Array<{ url: string; altText: string }>
        if (img && img.url && img.url.trim() !== '') {
          images.push(img.url);
        }
      });
    }
    return images;
  }, [transformation]);

  // Get all after images (including the main one)
  const getAllAfterImages = useCallback(() => {
    if (!transformation) return [];
    const images = [];
    
    // Add main image if it exists and is not empty
    if (transformation.afterImage && transformation.afterImage.trim() !== '') {
      images.push(transformation.afterImage);
    }
    
    // Add additional images, filtering out empty ones
    if (transformation.afterImages && transformation.afterImages.length > 0) {
      transformation.afterImages.forEach((img) => {
        // afterImages is typed as Array<{ url: string; altText: string }>
        if (img && img.url && img.url.trim() !== '') {
          images.push(img.url);
        }
      });
    }
    return images;
  }, [transformation]);

  const beforeImages = useMemo(() => getAllBeforeImages(), [getAllBeforeImages]);
  const afterImages = useMemo(() => getAllAfterImages(), [getAllAfterImages]);

  const handleNavigateToProduct = useCallback((productId: string) => {
    router.push(`/brand/${brandId}/products/${productId}`);
  }, [brandId, router]);

  const handleNavigateToProvider = useCallback((providerId: string) => {
    router.push(`/brand/${brandId}/providers/${providerId}`);
  }, [brandId, router]);

  return {
    // State
    transformation,
    brand,
    provider,
    products,
    isLoading,
    sliderPosition,
    isSliding,
    selectedBeforeIndex,
    selectedAfterIndex,
    beforeImages,
    afterImages,
    
    // Handlers
    setIsSliding,
    handleSliderMove,
    setSelectedBeforeIndex,
    setSelectedAfterIndex,
    handleNavigateToProduct,
    handleNavigateToProvider
  };
}