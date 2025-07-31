import { useState, useRef } from 'react';
import { parseRequirementsFile } from '@/lib/admin/utils/requirementsParser';
import { BrandQuestionnaireData } from '../../types';

export const useFileUpload = () => {
  const [uploadedData, setUploadedData] = useState<BrandQuestionnaireData | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    
    try {
      const text = await file.text();
      const result = parseRequirementsFile(text);
      
      if (result.success && result.data) {
        setUploadedData(result.data);
        return true;
      } else {
        setUploadError(result.errors?.join('\n') || 'Failed to parse file');
        return false;
      }
    } catch (error) {
      setUploadError('Failed to read file. Please ensure it\'s a valid text file.');
      return false;
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const clearUploadedData = () => {
    setUploadedData(null);
    setUploadError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    uploadedData,
    uploadError,
    fileInputRef,
    handleFileUpload,
    clearUploadedData,
    triggerFileInput,
  };
};