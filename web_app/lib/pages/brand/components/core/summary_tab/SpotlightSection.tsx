import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { Product } from "@/lib/pages/brand/types";
import { SpotlightBadge } from "@/lib/components/ui/badges";

import { SpotlightSectionProps } from "../../../types/core";

export default function SpotlightSection({
  spotlightProduct,
  spotlightBeforeImages,
  spotlightAfterImages,
  currentBeforeImageIndex,
  currentAfterImageIndex,
  handlePrevBeforeImage,
  handleNextBeforeImage,
  handlePrevAfterImage,
  handleNextAfterImage,
  handleProductClick
}: SpotlightSectionProps) {
  if (!spotlightProduct) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Spotlight</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Spotlight Product - Column 1 */}
        <div className="lg:col-span-1">
          <div
            onClick={() => handleProductClick(spotlightProduct.id)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden relative"
          >
            <SpotlightBadge />
            <div className="relative h-64">
              <SafeImage
                src={spotlightProduct.image}
                alt={spotlightProduct.name}
                fill
                className="object-cover"
                fallbackType="product"
                showPlaceholder
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900">{spotlightProduct.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{spotlightProduct.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-indigo-600">${spotlightProduct.price}</span>
                {spotlightProduct.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${spotlightProduct.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Before/After Images - Columns 2-4 */}
        <div className="lg:col-span-3">
          {spotlightBeforeImages.length > 0 && spotlightAfterImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Images Carousel */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Before</h4>
                <div className="relative">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <SafeImage
                      key={spotlightBeforeImages[currentBeforeImageIndex].url}
                      src={spotlightBeforeImages[currentBeforeImageIndex].url}
                      alt="Before treatment"
                      fill
                      className="object-cover"
                      fallbackType="transformation"
                    />
                    {spotlightBeforeImages[currentBeforeImageIndex].isPrimary && (
                      <span className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  
                  {/* Navigation arrows for before images */}
                  {spotlightBeforeImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevBeforeImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous before image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextBeforeImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Next before image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {currentBeforeImageIndex + 1} / {spotlightBeforeImages.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* After Images Carousel */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">After</h4>
                <div className="relative">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <SafeImage
                      key={spotlightAfterImages[currentAfterImageIndex].url}
                      src={spotlightAfterImages[currentAfterImageIndex].url}
                      alt="After treatment"
                      fill
                      className="object-cover"
                      fallbackType="transformation"
                    />
                    {spotlightAfterImages[currentAfterImageIndex].isPrimary && (
                      <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  
                  {/* Navigation arrows for after images */}
                  {spotlightAfterImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevAfterImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous after image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextAfterImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Next after image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {currentAfterImageIndex + 1} / {spotlightAfterImages.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No transformations available for this product yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}