import { useState, useRef } from 'react';
import storageService from '@/lib/services/firebase/storageService';
import type { GeneratedImage } from '@/lib/services/ai/imageGeneratorService';

interface ImageData {
  url: string;
  altText?: string;
}

interface UseMultiImageUploadProps {
  brandId: string;
  contentType: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  contentId?: string;
  initialValue?: string[] | ImageData[];
  maxImages?: number;
  onUploadComplete?: (images: ImageData[]) => void;
}

export const useMultiImageUpload = ({
  brandId,
  contentType,
  contentId,
  initialValue = [],
  maxImages = 10,
  onUploadComplete
}: UseMultiImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize value to ImageData array
  const normalizeImages = (images: string[] | ImageData[]): ImageData[] => {
    if (!images || images.length === 0) return [];
    
    if (typeof images[0] === 'string') {
      return (images as string[]).map(url => ({ url, altText: '' }));
    }
    return images as ImageData[];
  };

  const currentImages = normalizeImages(initialValue);

  const validateFiles = (files: FileList, currentCount: number): string | null => {
    const remainingSlots = maxImages - currentCount;
    if (remainingSlots <= 0) {
      return `Maximum ${maxImages} images allowed`;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        return `${file.name} is not an image file`;
      }
      if (file.size > 5 * 1024 * 1024) {
        return `${file.name} is larger than 5MB`;
      }
    }
    return null;
  };

  const uploadFiles = async (files: FileList): Promise<ImageData[]> => {
    const validationError = validateFiles(files, currentImages.length);
    if (validationError) {
      setError(validationError);
      return [];
    }

    const remainingSlots = maxImages - currentImages.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    
    setError(null);
    setIsUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const filename = `${contentType}_${timestamp}_${randomId}_${file.name}`;
        const path = `brands/${brandId}/${contentType}s/${contentId || 'temp'}/${filename}`;

        const downloadUrl = await storageService.uploadImage(file, path, {
          contentType: file.type,
          customMetadata: {
            brandId,
            contentType,
            contentId: contentId || '',
            originalName: file.name
          }
        });

        return { url: downloadUrl, altText: '' };
      });

      const newImages = await Promise.all(uploadPromises);
      const updatedImages = [...currentImages, ...newImages];
      onUploadComplete?.(updatedImages);
      return newImages;
    } catch (err: any) {
      setError(err.message || 'Failed to upload images');
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleGeneratedImages = async (generatedImages: GeneratedImage[]): Promise<ImageData[]> => {
    if (generatedImages.length === 0) return [];
    
    setError(null);
    setIsUploading(true);
    
    try {
      const uploadPromises = generatedImages.map(async (generatedImage) => {
        const response = await fetch(generatedImage.url);
        const blob = await response.blob();
        const file = new File([blob], `generated_${Date.now()}_${Math.random()}.jpg`, { type: 'image/jpeg' });
        
        const timestamp = Date.now();
        const filename = `${contentType}_generated_${timestamp}_${Math.random()}.jpg`;
        const path = `brands/${brandId}/${contentType}s/${contentId || 'temp'}/${filename}`;
        
        const downloadUrl = await storageService.uploadImage(file, path, {
          contentType: 'image/jpeg',
          customMetadata: {
            brandId,
            contentType,
            contentId: contentId || '',
            originalName: 'AI Generated Image',
            altText: generatedImage.prompt || ''
          }
        });
        
        return { url: downloadUrl, altText: generatedImage.prompt || '' };
      });
      
      const newImages = await Promise.all(uploadPromises);
      const updatedImages = [...currentImages, ...newImages];
      onUploadComplete?.(updatedImages);
      return newImages;
    } catch (err: any) {
      setError(err.message || 'Failed to save generated images');
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    onUploadComplete?.(newImages);
  };

  const updateAltText = (index: number, altText: string) => {
    const newImages = [...currentImages];
    newImages[index] = { ...newImages[index], altText };
    onUploadComplete?.(newImages);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImages = [...currentImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onUploadComplete?.(newImages);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    currentImages,
    isUploading,
    error,
    fileInputRef,
    uploadFiles,
    handleGeneratedImages,
    removeImage,
    updateAltText,
    reorderImages,
    triggerFileInput,
  };
};