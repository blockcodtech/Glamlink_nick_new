import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CertifiedProvider, Brand, Review, BeforeAfter } from "../../types";
import brandReadService from "../../server/brandReadService";

export function useProviderProfilePage(brandId: string, providerId: string) {
  const router = useRouter();
  const [provider, setProvider] = useState<CertifiedProvider | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [providerReviews, setProviderReviews] = useState<Review[]>([]);
  const [providerWork, setProviderWork] = useState<BeforeAfter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about');

  const fetchProviderData = useCallback(async () => {
    try {
      setIsLoading(true);
      const brandData = await brandReadService.getBrand(brandId);
      
      if (!brandData) {
        router.push('/brand');
        return;
      }

      setBrand(brandData);

      // Find the specific provider
      const foundProvider = brandData.certifiedProviders?.find(p => p.id === providerId);
      if (!foundProvider) {
        router.push(`/brand/${brandId}`);
        return;
      }

      setProvider(foundProvider);

      // Get reviews for this provider
      const reviews = brandData.reviews?.filter(r => r.providerId === providerId) || [];
      setProviderReviews(reviews);

      // Get before/after work by this provider
      let work: BeforeAfter[] = [];
      
      // Check if brand has beforeAfters (legacy field)
      if (brandData.beforeAfters && Array.isArray(brandData.beforeAfters)) {
        work = brandData.beforeAfters.filter(ba => ba.providerId === providerId) || [];
      }
      
      setProviderWork(work);

    } catch (error) {
      // Error fetching provider data
      router.push(`/brand/${brandId}`);
    } finally {
      setIsLoading(false);
    }
  }, [brandId, providerId, router]);

  useEffect(() => {
    fetchProviderData();
  }, [fetchProviderData]);

  // Get certification badge color
  const getCertificationBadgeColor = useCallback((level: string) => {
    const colors: Record<string, string> = {
      platinum: 'bg-purple-100 text-purple-800 border-purple-200',
      gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      silver: 'bg-gray-100 text-gray-800 border-gray-200',
      bronze: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[level] || colors.bronze;
  }, []);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (providerReviews.length === 0) return 0;
    const sum = providerReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / providerReviews.length).toFixed(1));
  }, [providerReviews]);

  // Get review breakdown
  const reviewBreakdown = useMemo(() => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    providerReviews.forEach(review => {
      breakdown[review.rating as keyof typeof breakdown]++;
    });
    return breakdown;
  }, [providerReviews]);

  // Handlers
  const handleTabChange = useCallback((tab: 'about' | 'portfolio' | 'reviews') => {
    setActiveTab(tab);
  }, []);

  const handleContactProvider = useCallback(() => {
    // TODO: Implement contact functionality
  }, [provider]);

  const handleBookAppointment = useCallback(() => {
    // TODO: Implement booking functionality
  }, [provider]);

  return {
    // State
    provider,
    brand,
    providerReviews,
    providerWork,
    isLoading,
    activeTab,
    averageRating,
    reviewBreakdown,
    
    // Handlers
    getCertificationBadgeColor,
    handleTabChange,
    handleContactProvider,
    handleBookAppointment
  };
}