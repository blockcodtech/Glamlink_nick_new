"use client";

import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  analyzeImage, 
  saveAnalysisResult,
  fetchAnalysisHistory,
  setImageFile, 
  setAnalysisType, 
  setPrompt, 
  resetAnalysis, 
  clearError 
} from "../store/imageAnalysisSlice";
import { AnalysisType, MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "../config";

export function useImageAnalysis() {
  const dispatch = useAppDispatch();
  const imageAnalysisState = useAppSelector((state) => state.imageAnalysis);
  
  useEffect(() => {
    dispatch(fetchAnalysisHistory());
  }, [dispatch]);
  
  const handleImageSelect = useCallback((file: File) => {
    // Validate file
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      dispatch(clearError());
      alert('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    
    if (file.size > MAX_IMAGE_SIZE) {
      dispatch(clearError());
      alert('Image size must be less than 5MB');
      return;
    }
    
    // Create object URL for preview
    const imageUri = URL.createObjectURL(file);
    dispatch(setImageFile({ file, uri: imageUri }));
  }, [dispatch]);
  
  const handleAnalysisTypeChange = useCallback((type: AnalysisType) => {
    dispatch(setAnalysisType(type));
  }, [dispatch]);
  
  const handlePromptChange = useCallback((prompt: string) => {
    dispatch(setPrompt(prompt));
  }, [dispatch]);
  
  const handleAnalyze = useCallback(() => {
    if (!imageAnalysisState.imageFile) {
      alert('Please select an image first');
      return;
    }
    
    dispatch(analyzeImage({
      file: imageAnalysisState.imageFile,
      analysisType: imageAnalysisState.analysisType,
      customPrompt: imageAnalysisState.prompt
    }));
  }, [dispatch, imageAnalysisState.imageFile, imageAnalysisState.analysisType, imageAnalysisState.prompt]);
  
  const handleReset = useCallback(() => {
    if (imageAnalysisState.imageUri) {
      URL.revokeObjectURL(imageAnalysisState.imageUri);
    }
    dispatch(resetAnalysis());
  }, [dispatch, imageAnalysisState.imageUri]);
  
  const handleSaveAnalysis = useCallback(async () => {
    if (!imageAnalysisState.imageFile || !imageAnalysisState.result) {
      return;
    }
    
    try {
      await dispatch(saveAnalysisResult({
        imageFile: imageAnalysisState.imageFile,
        result: imageAnalysisState.result,
        analysisType: imageAnalysisState.analysisType
      })).unwrap();
      
      alert('Analysis saved successfully!');
    } catch (error) {
      alert('Failed to save analysis. Please sign in to save your results.');
    }
  }, [dispatch, imageAnalysisState.imageFile, imageAnalysisState.result, imageAnalysisState.analysisType]);
  
  const handleShare = useCallback(() => {
    if (!imageAnalysisState.result) return;
    
    const shareText = `My beauty analysis score: ${imageAnalysisState.result.overall.score}/100\n\n${imageAnalysisState.result.overall.summary}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Beauty Analysis Results',
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  }, [imageAnalysisState.result]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imageAnalysisState.imageUri) {
        URL.revokeObjectURL(imageAnalysisState.imageUri);
      }
    };
  }, [imageAnalysisState.imageUri]);
  
  return {
    state: imageAnalysisState,
    handlers: {
      onImageSelect: handleImageSelect,
      onAnalysisTypeChange: handleAnalysisTypeChange,
      onPromptChange: handlePromptChange,
      onAnalyze: handleAnalyze,
      onReset: handleReset,
      onSaveAnalysis: handleSaveAnalysis,
      onShare: handleShare,
      onClearError: () => dispatch(clearError()),
    },
  };
}