import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import {
  fetchBrandProfile,
  updateBrandProfile,
  createBrandForUser,
  uploadBrandImage,
  saveQuestionnaireData,
  generateBrainstormIdeas,
  deleteBrainstormIdea,
  setActiveTab,
  updateFormData,
  resetFormData,
  setQuestionnaireData,
  setQuestionnaireProgress,
  setSelectedIdea,
  clearError,
} from '@/lib/admin/store/adminProfileSlice';
import { Brand, BrainstormIdea } from '@/lib/pages/brand/types';

/**
 * Custom hook to interact with the profile Redux store
 * Provides all profile-related state and actions
 */
export const useProfileStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Select all admin profile state
  const profileState = useSelector((state: RootState) => state.adminProfile);
  
  // Destructure for easier access
  const {
    brand,
    isLoading,
    isSaving,
    isGenerating,
    error,
    profileFormData,
    hasUnsavedChanges,
    questionnaireData,
    questionnaireProgress,
    brainstormIdeas,
    selectedIdeaId,
    uploadingImages,
    activeTab,
  } = profileState;
  
  // Brand actions
  const loadBrandProfile = useCallback((brandId: string) => {
    return dispatch(fetchBrandProfile(brandId));
  }, [dispatch]);
  
  const saveBrandProfile = useCallback((brandId: string, updates: Partial<Brand>) => {
    return dispatch(updateBrandProfile({ brandId, updates }));
  }, [dispatch]);
  
  const createBrand = useCallback((userId: string, email: string) => {
    return dispatch(createBrandForUser({ userId, email }));
  }, [dispatch]);
  
  // Image upload actions
  const uploadImage = useCallback((
    brandId: string, 
    file: File, 
    imageType: 'profile' | 'cover'
  ) => {
    return dispatch(uploadBrandImage({ brandId, file, imageType }));
  }, [dispatch]);
  
  // Questionnaire actions
  const saveQuestionnaire = useCallback((brandId: string, data: any) => {
    return dispatch(saveQuestionnaireData({ brandId, data }));
  }, [dispatch]);
  
  const updateQuestionnaireData = useCallback((data: any) => {
    dispatch(setQuestionnaireData(data));
  }, [dispatch]);
  
  const updateQuestionnaireProgress = useCallback((progress: string | null) => {
    dispatch(setQuestionnaireProgress(progress));
  }, [dispatch]);
  
  // Brainstorm actions
  const generateIdeas = useCallback((
    brand: Brand, 
    options: { focus?: string; count: number }
  ) => {
    return dispatch(generateBrainstormIdeas({ brand, options }));
  }, [dispatch]);
  
  const deleteIdea = useCallback((brandId: string, ideaId: string) => {
    return dispatch(deleteBrainstormIdea({ brandId, ideaId }));
  }, [dispatch]);
  
  const selectIdea = useCallback((ideaId: string | null) => {
    dispatch(setSelectedIdea(ideaId));
  }, [dispatch]);
  
  // Form actions
  const updateForm = useCallback((updates: Partial<Brand>) => {
    dispatch(updateFormData(updates));
  }, [dispatch]);
  
  const resetForm = useCallback(() => {
    dispatch(resetFormData());
  }, [dispatch]);
  
  // UI actions
  const changeTab = useCallback((tab: string) => {
    dispatch(setActiveTab(tab));
  }, [dispatch]);
  
  const clearProfileError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);
  
  // Helper functions
  const getSelectedIdea = useCallback((): BrainstormIdea | undefined => {
    return brainstormIdeas.find(idea => idea.id === selectedIdeaId);
  }, [brainstormIdeas, selectedIdeaId]);
  
  return {
    // State
    brand,
    isLoading,
    isSaving,
    isGenerating,
    error,
    profileFormData,
    hasUnsavedChanges,
    questionnaireData,
    questionnaireProgress,
    brainstormIdeas,
    selectedIdeaId,
    uploadingImages,
    activeTab,
    
    // Actions
    loadBrandProfile,
    saveBrandProfile,
    createBrand,
    uploadImage,
    saveQuestionnaire,
    updateQuestionnaireData,
    updateQuestionnaireProgress,
    generateIdeas,
    deleteIdea,
    selectIdea,
    updateForm,
    resetForm,
    changeTab,
    clearProfileError,
    
    // Helpers
    getSelectedIdea,
  };
};