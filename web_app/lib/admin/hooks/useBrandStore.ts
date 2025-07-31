import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/lib/auth/hooks/useAuth';
import { 
  fetchBrandProfile,
  updateBrandProfile,
  updateFormData,
  resetFormData,
  setActiveTab,
  uploadBrandImage,
  deleteBrainstormIdea,
  setSelectedIdea,
  generateBrainstormIdeas
} from '../store/adminProfileSlice';
import { Brand } from '@/lib/pages/brand/types';

/**
 * Hook for accessing and managing brand data from Redux store
 * This centralizes brand state management and reduces direct Firebase calls
 */
export const useBrandStore = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  
  // Select all relevant state from adminProfile slice
  const {
    brand,
    isLoading,
    isSaving,
    isGenerating,
    error,
    profileFormData,
    hasUnsavedChanges,
    questionnaireData,
    brainstormIdeas,
    selectedIdeaId,
    uploadingImages,
    activeTab
  } = useAppSelector(state => state.adminProfile);

  // Load brand data on mount if user has a brandId
  useEffect(() => {
    if (user?.brandId && !brand && !isLoading) {
      dispatch(fetchBrandProfile(user.brandId));
    }
  }, [user?.brandId, brand, isLoading, dispatch]);

  // Brand data management
  const refreshBrand = useCallback(() => {
    if (!user?.brandId) return Promise.reject('No brand ID');
    return dispatch(fetchBrandProfile(user.brandId));
  }, [dispatch, user?.brandId]);

  const updateBrand = useCallback((updates: Partial<Brand>) => {
    if (!brand) return;
    
    // Update form data
    dispatch(updateFormData(updates));
  }, [brand, dispatch]);

  const saveBrand = useCallback(async () => {
    if (!profileFormData || !user?.brandId) return false;
    
    const result = await dispatch(updateBrandProfile({ 
      brandId: user.brandId, 
      updates: profileFormData 
    }));
    if (updateBrandProfile.fulfilled.match(result)) {
      dispatch(resetFormData());
      return true;
    }
    return false;
  }, [profileFormData, user?.brandId, dispatch]);

  // Image upload helpers
  const uploadImage = useCallback(async (file: File, type: 'profile' | 'cover') => {
    if (!user?.brandId) return null;
    
    const result = await dispatch(uploadBrandImage({
      brandId: user.brandId,
      file,
      imageType: type
    }));
    if (uploadBrandImage.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [user?.brandId, dispatch]);

  // Tab management
  const setTab = useCallback((tab: string) => {
    dispatch(setActiveTab(tab));
  }, [dispatch]);

  // Brainstorm ideas management
  const generateIdeas = useCallback(async (options: { focus?: string; count: number }) => {
    if (!brand) return null;
    
    const result = await dispatch(generateBrainstormIdeas({ brand, options }));
    if (generateBrainstormIdeas.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [brand, dispatch]);

  const deleteIdea = useCallback(async (id: string) => {
    if (!user?.brandId) return;
    
    await dispatch(deleteBrainstormIdea({ brandId: user.brandId, ideaId: id }));
  }, [user?.brandId, dispatch]);

  const selectIdea = useCallback((id: string | null) => {
    dispatch(setSelectedIdea(id));
  }, [dispatch]);

  // Helper to check if brand data is available
  const hasBrand = Boolean(brand);
  const brandId = user?.brandId || '';

  return {
    // State
    brand,
    brandId,
    hasBrand,
    isLoading,
    isSaving,
    isGenerating,
    error,
    profileFormData,
    hasUnsavedChanges,
    questionnaireData,
    brainstormIdeas,
    selectedIdeaId,
    uploadingImages,
    activeTab,
    
    // Actions
    refreshBrand,
    updateBrand,
    saveBrand,
    uploadImage,
    setTab,
    generateIdeas,
    deleteIdea,
    selectIdea,
    
    // Utility
    resetChanges: () => dispatch(resetFormData()),
  };
};

// Type for components that require brand data
export interface WithBrandProps {
  brand: Brand | null;
  brandId: string;
  isLoading: boolean;
  error: string | null;
}