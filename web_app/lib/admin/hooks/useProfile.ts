import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useUserBrand } from './auth/useUserBrand';
import {
  fetchBrandProfile,
  createBrandForUser,
  updateBrandProfile,
  uploadProfileImage,
  uploadCoverImage,
  updateFormField,
  updateSocialLink,
  setSuccessMessage,
  setErrorMessage,
  clearMessages,
} from '@/store/slices/profileSlice';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { user, brandId, isAdmin, hasBrand, canCreateBrand } = useUserBrand();
  
  // Select profile state from Redux
  const {
    brand,
    brandLoading,
    brandError,
    formData,
    formDirty,
    isSaving,
    isCreatingBrand,
    uploadingProfile,
    uploadingCover,
    successMessage,
    errorMessage,
  } = useAppSelector((state) => state.profile);

  // Fetch brand profile when brandId changes
  useEffect(() => {
    if (brandId && !brand) {
      dispatch(fetchBrandProfile(brandId));
    }
  }, [brandId, brand, dispatch]);

  // Create brand for new users
  useEffect(() => {
    if (user && canCreateBrand && !brandLoading && !isCreatingBrand) {
      handleCreateBrand();
    }
  }, [user, canCreateBrand, brandLoading, isCreatingBrand]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleCreateBrand = useCallback(async () => {
    if (!user) return;
    
    const result = await dispatch(createBrandForUser({
      userId: user.uid,
      userEmail: user.email || undefined,
      userDisplayName: user.displayName || undefined
    }));
    
    if (createBrandForUser.fulfilled.match(result)) {
      // Refresh to get updated user with brandId
      window.location.reload();
    }
  }, [user, dispatch]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brand?.id) {
      dispatch(setErrorMessage("No brand found"));
      return;
    }
    
    dispatch(updateBrandProfile({
      brandId: brand.id,
      updates: formData
    }));
  }, [brand, formData, dispatch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name as any, value }));
  }, [dispatch]);

  const handleSocialLinkChange = useCallback((platform: string, value: string) => {
    dispatch(updateSocialLink({ platform, value }));
  }, [dispatch]);

  const handleProfileImageUpload = useCallback(async (file: File) => {
    if (!brand?.id) return;
    dispatch(uploadProfileImage({ brandId: brand.id, file }));
  }, [brand, dispatch]);

  const handleCoverImageUpload = useCallback(async (file: File) => {
    if (!brand?.id) return;
    dispatch(uploadCoverImage({ brandId: brand.id, file }));
  }, [brand, dispatch]);

  const setMessage = useCallback((message: string) => {
    if (message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')) {
      dispatch(setErrorMessage(message));
    } else {
      dispatch(setSuccessMessage(message));
    }
  }, [dispatch]);

  return {
    // State
    user,
    brand,
    formData,
    isLoading: brandLoading || isCreatingBrand,
    isSaving,
    isUploadingProfile: uploadingProfile,
    isUploadingCover: uploadingCover,
    message: successMessage || errorMessage || "",
    
    // Actions
    handleSubmit,
    handleInputChange,
    handleSocialLinkChange,
    handleProfileImageUpload,
    handleCoverImageUpload,
    setMessage
  };
};