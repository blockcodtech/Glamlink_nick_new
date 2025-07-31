"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMultiImageUpload } from '../../hooks/images/useMultiImageUpload';
import ImageGeneratorModal from '../shared/modals/ImageGeneratorModal';
import { ImageData, MultiImageUploadFieldProps } from '@/lib/admin/types';
import type { GeneratedImage } from '@/lib/services/ai/imageGeneratorService';
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';

export default function MultiImageUploadField({
  value = [],
  onChange,
  label,
  required = false,
  brandId,
  contentType,
  contentId,
  maxImages = 10,
  placeholder = "Click to add images or drag them here",
  context
}: MultiImageUploadFieldProps) {
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
        return 'product-gallery'; // For multiple images, use gallery type
      case 'provider':
        return 'provider-portfolio'; // For multiple images, use portfolio type
      case 'beforeafter':
        return 'beforeafter';
      case 'training':
        return 'training';
      case 'review':
        return 'review';
      default:
        return 'product-gallery'; // Default fallback
    }
  };
  
  const {
    currentImages,
    isUploading,
    error,
    fileInputRef,
    uploadFiles,
    handleGeneratedImages,
    removeImage,
    updateAltText,
    reorderImages,
    triggerFileInput
  } = useMultiImageUpload({
    brandId,
    contentType,
    contentId,
    initialValue: value,
    maxImages,
    onUploadComplete: onChange
  });

  const handleFileSelect = async (files: FileList) => {
    await uploadFiles(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleGeneratedImagesCallback = (imageUrls: string[]) => {
    // Convert string URLs to GeneratedImage objects
    const generatedImages: GeneratedImage[] = imageUrls.map(url => ({
      url,
      prompt: '',
      type: 'additional' as const
    }));
    handleGeneratedImages(generatedImages);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
          <span className="text-xs text-gray-500 ml-2">
            ({currentImages.length}/{maxImages} images)
          </span>
        </label>
        {contentType !== 'review' && currentImages.length < maxImages && (
          <button
            type="button"
            onClick={() => setShowGeneratorModal(true)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Images
          </button>
        )}
      </div>

      {/* Existing Images */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.altText || `Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay controls */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {/* Move left */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => reorderImages(index, index - 1)}
                      className="bg-white rounded-full p-1.5 hover:bg-gray-100"
                      title="Move left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Move right */}
                  {index < currentImages.length - 1 && (
                    <button
                      type="button"
                      onClick={() => reorderImages(index, index + 1)}
                      className="bg-white rounded-full p-1.5 hover:bg-gray-100"
                      title="Move right"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Alt text input */}
              <input
                type="text"
                value={image.altText || ''}
                onChange={(e) => updateAltText(index, e.target.value)}
                placeholder="Alt text"
                className="mt-1 w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {currentImages.length < maxImages && (
        <div
          onClick={triggerFileInput}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`
            border-2 border-dashed rounded-lg p-6 cursor-pointer
            transition-all duration-200 
            border-gray-400 hover:border-purple-500 hover:bg-purple-50
            ${isUploading ? 'opacity-50 cursor-wait' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />

          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">{placeholder}</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Uploading...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {/* Image Generator Modal */}
      {showGeneratorModal && contentType !== 'review' && (
        <ImageGeneratorModal
          isOpen={showGeneratorModal}
          onClose={() => setShowGeneratorModal(false)}
          onImagesGenerated={handleGeneratedImagesCallback}
          type={getImageType()}
          brand={brand}
          itemContext={context}
        />
      )}
    </div>
  );
}