import { useState, useRef, useEffect } from 'react';
import storageService from '@/lib/services/firebase/storageService';
import type { GeneratedImage } from '@/lib/services/ai/imageGeneratorService';

interface UseSingleImageUploadProps {
  brandId: string;
  contentType: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  contentId?: string;
  initialValue?: string;
  onUploadComplete?: (url: string) => void;
}

export const useSingleImageUpload = ({
  brandId,
  contentType,
  contentId,
  initialValue = '',
  onUploadComplete
}: UseSingleImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with value prop when it changes
  useEffect(() => {
    setPreview(initialValue);
  }, [initialValue]);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'Image size must be less than 5MB';
    }
    return null;
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return null;
    }

    setError(null);
    setIsUploading(true);

    try {
      const timestamp = Date.now();
      const filename = `${contentType}_${timestamp}_${file.name}`;
      const path = `brands/${brandId}/${contentType}s/${contentId || 'temp'}/${filename}`;

      const downloadUrl = await storageService.uploadImage(file, path, {
        contentType: file.type,
        customMetadata: {
          brandId,
          contentType,
          contentId: contentId || '',
          originalName: file.name,
          altText: altText || ''
        }
      });

      setPreview(downloadUrl);
      onUploadComplete?.(downloadUrl);
      return downloadUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleGeneratedImage = async (generatedImage: GeneratedImage): Promise<string | null> => {
    setError(null);
    setIsUploading(true);
    
    try {
      // Fetch the image and convert to blob
      const response = await fetch(generatedImage.url);
      const blob = await response.blob();
      
      // Create a file from the blob
      const file = new File([blob], `generated_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      // Upload to Firebase Storage
      const timestamp = Date.now();
      const filename = `${contentType}_generated_${timestamp}.jpg`;
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
      
      setPreview(downloadUrl);
      setAltText(generatedImage.prompt || '');
      onUploadComplete?.(downloadUrl);
      return downloadUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to save generated image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview('');
    setAltText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadComplete?.('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    preview,
    isUploading,
    error,
    altText,
    fileInputRef,
    setAltText,
    uploadFile,
    handleGeneratedImage,
    removeImage,
    triggerFileInput,
  };
};