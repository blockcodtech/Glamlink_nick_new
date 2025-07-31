"use client";

import { ImagePreviewProps } from '@/lib/admin/types';

export default function ImagePreview({ 
  images, 
  selectedImages, 
  onToggleSelection, 
  onToggleSelectAll 
}: ImagePreviewProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-900">Generated Images</h4>
        <button
          type="button"
          onClick={onToggleSelectAll}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          {selectedImages.size === images.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => {
          const isSelected = selectedImages.has(index);
          return (
            <div
              key={index}
              onClick={() => onToggleSelection(index)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                isSelected
                  ? 'border-purple-500 ring-2 ring-purple-200'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Generated image ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelection(index)}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-purple-500 bg-opacity-10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
      
      <p className="mt-4 text-sm text-gray-600 text-center">
        {selectedImages.size} of {images.length} images selected
      </p>
    </div>
  );
}