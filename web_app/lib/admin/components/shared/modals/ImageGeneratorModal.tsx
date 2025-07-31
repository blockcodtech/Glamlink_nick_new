"use client";

import { Brand } from '@/lib/pages/brand/types';
import { useImageGenerator } from '../../../hooks/useImageGenerator';
import { ImageType, ImageGeneratorModalProps } from '@/lib/admin/types';
import ImagePreview from './ImagePreview';

export default function ImageGeneratorModal({
  isOpen,
  onClose,
  type,
  onImagesGenerated,
  brand,
  itemContext
}: ImageGeneratorModalProps) {
  const {
    isGenerating,
    generatedImages,
    selectedImages,
    error,
    count,
    prompt,
    config,
    setCount,
    setPrompt,
    handleGenerate,
    toggleImageSelection,
    toggleSelectAll,
    getSelectedImages,
    reset
  } = useImageGenerator(type, brand, itemContext);

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    const selectedImagesData = getSelectedImages();
    onImagesGenerated(selectedImagesData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">{config.description}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {generatedImages.length === 0 ? (
            <div className="space-y-6">
              {/* Custom Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the style or specific details you want in the images..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Count Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of images to generate
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max={config.maxCount}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-medium text-gray-900">
                    {count}
                  </span>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !brand}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating Images...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Generate Images
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <ImagePreview
              images={generatedImages}
              selectedImages={selectedImages}
              onToggleSelection={toggleImageSelection}
              onToggleSelectAll={toggleSelectAll}
            />
          )}
        </div>

        {/* Footer */}
        {generatedImages.length > 0 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex justify-between">
              <button
                onClick={() => reset()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Generate New
              </button>
              <button
                onClick={handleSave}
                disabled={selectedImages.size === 0}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Use Selected ({selectedImages.size})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}