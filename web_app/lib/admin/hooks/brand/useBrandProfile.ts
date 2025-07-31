import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  fetchBrandProfile,
  updateBrandProfile,
  updateBrandLocally,
} from '@/store/slices/profileSlice';

export const useBrandProfile = (brandId: string | undefined) => {
  const dispatch = useAppDispatch();
  
  // Select profile state from Redux
  const { brand, brandLoading: isLoading, brandError: error } = useAppSelector((state) => state.profile);

  // Fetch brand profile when brandId changes
  useEffect(() => {
    if (brandId && (!brand || brand.id !== brandId)) {
      dispatch(fetchBrandProfile(brandId));
    }
  }, [brandId, brand, dispatch]);

  const refetch = useCallback(() => {
    if (brandId) {
      dispatch(fetchBrandProfile(brandId));
    }
  }, [brandId, dispatch]);

  const updateBrand = useCallback(async (updates: any) => {
    if (!brandId) throw new Error('No brand ID available');
    
    const result = await dispatch(updateBrandProfile({ brandId, updates }));
    
    if (updateBrandProfile.fulfilled.match(result)) {
      return { success: true };
    } else {
      throw new Error('Failed to update brand');
    }
  }, [brandId, dispatch]);

  // For immediate local updates (optimistic UI)
  const updateBrandImmediately = useCallback((updates: any) => {
    dispatch(updateBrandLocally(updates));
  }, [dispatch]);

  return {
    brand,
    isLoading,
    error,
    refetch,
    updateBrand,
    updateBrandImmediately,
  };
};