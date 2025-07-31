import { useState, useEffect } from 'react';
import { Brand } from '@/lib/pages/brand/types';
import firebaseProfileService from '../../server/firebaseProfileService';

export const useBrandData = (brandId: string | undefined) => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brandId) {
      setIsLoading(false);
      return;
    }

    fetchBrand();
  }, [brandId]);

  const fetchBrand = async () => {
    if (!brandId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const brandData = await firebaseProfileService.getBrand(brandId);
      setBrand(brandData);
    } catch (err) {
      // Error fetching brand
      setError('Failed to load brand data');
      setBrand(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBrand = async (updates: Partial<Brand>) => {
    if (!brandId) throw new Error('No brand ID available');
    
    try {
      await firebaseProfileService.updateBrand(brandId, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      if (brand) {
        setBrand({ ...brand, ...updates });
      }
      
      return { success: true };
    } catch (err) {
      // Error updating brand
      throw err;
    }
  };

  return {
    brand,
    isLoading,
    error,
    refetch: fetchBrand,
    updateBrand,
  };
};