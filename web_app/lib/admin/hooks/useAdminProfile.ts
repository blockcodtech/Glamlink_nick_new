import { useCallback, useEffect } from 'react';
import { useProfileStore } from './useProfileStore';
import { useUserBrand } from './auth/useUserBrand';

/**
 * Enhanced profile hook that uses the admin profile Redux store
 * This replaces the old useProfile hook with better state management
 */
export const useAdminProfile = () => {
  const {
    // State
    brand,
    isLoading,
    isSaving,
    error,
    profileFormData,
    hasUnsavedChanges,
    uploadingImages,
    
    // Actions
    loadBrandProfile,
    saveBrandProfile,
    createBrand,
    uploadImage,
    updateForm,
    resetForm,
    clearProfileError,
  } = useProfileStore();
  
  const { user, brandId, canCreateBrand } = useUserBrand();
  
  // Load brand profile when brandId is available
  useEffect(() => {
    if (brandId && !brand) {
      loadBrandProfile(brandId);
    }
  }, [brandId, brand, loadBrandProfile]);
  
  // Create brand for new users
  useEffect(() => {
    if (user && canCreateBrand && !isLoading && !brand) {
      createBrand(user.uid, user.email || '');
    }
  }, [user, canCreateBrand, isLoading, brand, createBrand]);
  
  // Clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearProfileError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearProfileError]);
  
  // Form handlers
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  }, [updateForm]);
  
  const handleSocialLinkChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const platform = name.replace('socialLinks.', '');
    updateForm({
      socialLinks: {
        ...(profileFormData?.socialLinks || {}),
        [platform]: value
      }
    });
  }, [updateForm, profileFormData]);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brand?.id || !profileFormData) {
      return;
    }
    
    await saveBrandProfile(brand.id, profileFormData);
  }, [brand, profileFormData, saveBrandProfile]);
  
  const handleProfileImageUpload = useCallback(async (file: File) => {
    if (!brand?.id) return;
    await uploadImage(brand.id, file, 'profile');
  }, [brand, uploadImage]);
  
  const handleCoverImageUpload = useCallback(async (file: File) => {
    if (!brand?.id) return;
    await uploadImage(brand.id, file, 'cover');
  }, [brand, uploadImage]);
  
  return {
    // User info
    user,
    
    // Brand data
    brand,
    formData: profileFormData || {},
    
    // Loading states
    isLoading,
    isSaving,
    isUploadingProfile: uploadingImages.profile,
    isUploadingCover: uploadingImages.cover,
    
    // Status
    hasUnsavedChanges,
    message: error || '',
    
    // Form handlers
    handleInputChange,
    handleSocialLinkChange,
    handleSubmit,
    handleProfileImageUpload,
    handleCoverImageUpload,
    
    // Actions
    resetForm,
  };
};