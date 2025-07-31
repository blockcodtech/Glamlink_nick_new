import { useState } from 'react';
import storageService from '@/lib/services/firebase/storageService';
import firebaseProfileService from '../../server/firebaseProfileService';

interface UseImageUploadProps {
  brandId: string;
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export const useImageUpload = ({ brandId, onSuccess, onError }: UseImageUploadProps) => {
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleProfileImageUpload = async (file: File): Promise<string | null> => {
    if (!brandId) {
      const error = "Brand ID not found";
      setUploadError(error);
      onError?.(error);
      return null;
    }
    
    setIsUploadingProfile(true);
    setUploadError(null);
    
    try {
      const imageUrl = await storageService.uploadBrandProfileImage(brandId, file);
      
      // Update brand document
      await firebaseProfileService.updateDocument('brands', brandId, {
        profileImage: imageUrl,
        updatedAt: new Date().toISOString()
      });
      
      onSuccess?.(imageUrl);
      return imageUrl;
    } catch (error) {
      // Error uploading profile image
      const errorMessage = "Error uploading profile image";
      setUploadError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      setIsUploadingProfile(false);
    }
  };

  const handleCoverImageUpload = async (file: File): Promise<string | null> => {
    if (!brandId) {
      const error = "Brand ID not found";
      setUploadError(error);
      onError?.(error);
      return null;
    }
    
    setIsUploadingCover(true);
    setUploadError(null);
    
    try {
      const imageUrl = await storageService.uploadBrandCoverImage(brandId, file);
      
      // Update brand document
      await firebaseProfileService.updateDocument('brands', brandId, {
        coverImage: imageUrl,
        updatedAt: new Date().toISOString()
      });
      
      onSuccess?.(imageUrl);
      return imageUrl;
    } catch (error) {
      // Error uploading cover image
      const errorMessage = "Error uploading cover image";
      setUploadError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      setIsUploadingCover(false);
    }
  };

  const uploadGenericImage = async (
    file: File,
    path: string,
    metadata?: any
  ): Promise<string | null> => {
    try {
      const imageUrl = await storageService.uploadImage(file, path, metadata);
      return imageUrl;
    } catch (error) {
      // Error uploading image
      const errorMessage = error instanceof Error ? error.message : "Error uploading image";
      setUploadError(errorMessage);
      onError?.(errorMessage);
      return null;
    }
  };

  return {
    handleProfileImageUpload,
    handleCoverImageUpload,
    uploadGenericImage,
    isUploadingProfile,
    isUploadingCover,
    uploadError,
  };
};