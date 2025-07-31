"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSingleImageUpload } from '../../hooks/images/useSingleImageUpload';
import ImageGeneratorModal from '../shared/modals/ImageGeneratorModal';
import { ImageUploadFieldProps } from '@/lib/admin/types';
import type { GeneratedImage } from '@/lib/services/ai/imageGeneratorService';
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';

export default function ImageUploadField({
  value,
  onChange,
  label,
  required = false,
  brandId,
  contentType,
  contentId,
  placeholder = "Click to upload or drag image here",
  context
}: ImageUploadFieldProps) {
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);
  
  // Fetch brand data
  useEffect(() => {
    if (brandId) {
      firestoreService.getDocument<Brand>('brands', brandId)
        .then(brandData => setBrand(brandData))
        .catch(error => {
          // Error fetching brand
        });
    }
  }, [brandId]);
  
  // Map contentType to ImageType for the generator
  const getImageType = () => {
    switch (contentType) {
      case 'product':
        return 'product-main';
      case 'provider':
        return 'provider-profile';
      case 'beforeafter':
        return 'beforeafter';
      case 'training':
        return 'training';
      case 'review':
        return 'review';
      default:
        return 'product-main'; // Default fallback
    }
  };
  
  const {
    preview,
    isUploading,
    error,
    altText,
    fileInputRef,
    setAltText,
    uploadFile,
    handleGeneratedImage,
    removeImage,
    triggerFileInput
  } = useSingleImageUpload({
    brandId,
    contentType,
    contentId,
    initialValue: value,
    onUploadComplete: onChange
  });

  const handleFileSelect = async (file: File) => {
    await uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleGeneratedImages = (imageUrls: string[]) => {
    if (imageUrls.length === 0) return;
    // Create a GeneratedImage object from the URL for compatibility
    const generatedImage: GeneratedImage = {
      url: imageUrls[0],
      prompt: '',
      type: 'main'
    };
    handleGeneratedImage(generatedImage);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {contentType !== 'review' && (
          <button
            type="button"
            onClick={() => setShowGeneratorModal(true)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Image
          </button>
        )}
      </div>

      {/* Upload Area */}
      <div
        onClick={triggerFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative border-2 border-dashed rounded-lg p-6 cursor-pointer
          transition-all duration-200 
          ${preview 
            ? 'border-gray-300 bg-gray-50' 
            : 'border-gray-400 hover:border-purple-500 hover:bg-purple-50'
          }
          ${isUploading ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {preview ? (
          <div className="relative">
            <div className="relative h-48 w-full">
              <Image
                src={preview}
                alt={altText || 'Uploaded image'}
                fill
                className="object-contain rounded"
              />
            </div>
            
            {/* Action buttons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                title="Replace image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="bg-white rounded-full p-2 shadow-md hover:bg-red-100"
                title="Remove image"
              >
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">{placeholder}</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Alt Text Input */}
      {preview && (
        <div className="mt-3">
          <label htmlFor="alt-text" className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text (for accessibility)
          </label>
          <input
            id="alt-text"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe this image"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      
      {/* Image Generator Modal */}
      {showGeneratorModal && contentType !== 'review' && (
        <ImageGeneratorModal
          isOpen={showGeneratorModal}
          onClose={() => setShowGeneratorModal(false)}
          onImagesGenerated={handleGeneratedImages}
          type={getImageType()}
          brand={brand}
          itemContext={context}
        />
      )}
    </div>
  );
}