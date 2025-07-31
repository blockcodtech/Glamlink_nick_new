"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductsQuestionnaireStepProps {
  data: {
    description: string;
    images: string[];
    categories: string[];
    priceRange: { min: number; max: number };
    ingredients?: string;
    benefits?: string;
  };
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PRODUCT_CATEGORIES = [
  'Skincare',
  'Makeup',
  'Haircare',
  'Fragrance',
  'Tools & Accessories',
  'Supplements',
  'Body Care',
  'Men\'s Grooming',
];

export default function ProductsQuestionnaireStep({ data, onChange, onNext, onPrevious }: ProductsQuestionnaireStepProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(data.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleCategoryToggle = (category: string) => {
    const newCategories = data.categories.includes(category)
      ? data.categories.filter(c => c !== category)
      : [...data.categories, category];
    onChange({ categories: newCategories });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const dataUrl = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        
        newImages.push(dataUrl);
      }

      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      onChange({ images: updatedImages });
    } catch (error) {
      // Error uploading images
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onChange({ images: newImages });
  };

  const canProceed = data.description && data.categories.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us about your products</h3>
        <p className="text-gray-600 mb-6">
          Describe what kind of products you want to offer. You can also upload images of products you like for reference.
        </p>
      </div>

      {/* Product Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your product line <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: I want to create a line of natural skincare products focused on anti-aging, including serums, moisturizers, and face masks. The products should use botanical ingredients and be suitable for sensitive skin."
        />
      </div>

      {/* Product Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select product categories <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRODUCT_CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryToggle(category)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.categories.includes(category)
                  ? 'border-glamlink-teal bg-glamlink-teal text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price range for your products
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Min Price ($)</label>
            <input
              type="number"
              value={data.priceRange.min}
              onChange={(e) => onChange({ priceRange: { ...data.priceRange, min: Number(e.target.value) } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
              min="1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Max Price ($)</label>
            <input
              type="number"
              value={data.priceRange.max}
              onChange={(e) => onChange({ priceRange: { ...data.priceRange, max: Number(e.target.value) } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Key Ingredients */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key ingredients or materials (Optional)
        </label>
        <textarea
          value={data.ingredients || ''}
          onChange={(e) => onChange({ ingredients: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: Hyaluronic acid, vitamin C, retinol, peptides, botanical extracts..."
        />
      </div>

      {/* Product Benefits */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main benefits your products should provide (Optional)
        </label>
        <textarea
          value={data.benefits || ''}
          onChange={(e) => onChange({ benefits: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: Anti-aging, hydration, brightening, acne control, sun protection..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload reference images (Optional)
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Upload images of products you like or want to create similar to
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            id="product-images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
          <label
            htmlFor="product-images"
            className="flex flex-col items-center cursor-pointer"
          >
            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-600">
              {isUploading ? 'Uploading...' : 'Click to upload images or drag and drop'}
            </span>
          </label>
        </div>

        {uploadedImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Product reference ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onPrevious}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-3 bg-glamlink-teal text-white rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next: Training Programs
        </button>
      </div>
    </div>
  );
}