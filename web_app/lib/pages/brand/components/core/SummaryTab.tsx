import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { BrandStateInterface } from "../../types/state";
import FilterSidebar from "../shared/FilterSidebar";
import { SpotlightBadge, OutOfStockOverlay } from "@/lib/components/ui/badges";
import { RatingStars } from "@/lib/components/ui/RatingStars";
import TrainingProgramCard from "../training/TrainingProgramCard";
import { useSummaryTab } from "../../hooks/core/useSummaryTab";

import { SummaryTabProps } from "../../types/core";

export default function SummaryTab({ state, handlers }: SummaryTabProps) {
  const { filters, reviews } = state;
  
  const {
    currentAfterImageIndex,
    currentBeforeImageIndex,
    filteredProducts,
    spotlightProduct,
    spotlightBeforeImages,
    spotlightAfterImages,
    topProducts,
    topProviders,
    topPrograms,
    topReviews,
    productsWithTransformations,
    reviewThemeColors,
    handlePrevBeforeImage,
    handleNextBeforeImage,
    handlePrevAfterImage,
    handleNextAfterImage
  } = useSummaryTab(state);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Row 1: Filter + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {/* Filter Sidebar - Column 1 */}
        <div className="lg:col-span-1">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handlers.onFilterChange} 
          />
        </div>
        
        {/* Products - Columns 2-4 */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handlers.onProductClick(product.id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="relative h-48">
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    fallbackType="product"
                    showPlaceholder
                  />
                  {!product.inStock && <OutOfStockOverlay />}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.rating && (
                      <div className="flex items-center text-sm">
                        <RatingStars rating={product.rating} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Row 2: Spotlight + Before/After of Spotlight */}
      {spotlightProduct && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Spotlight</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Spotlight Product - Column 1 */}
            <div className="lg:col-span-1">
              <div
                onClick={() => handlers.onProductClick(spotlightProduct.id)}
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
      )}
      
      {/* Row 3: Certified Providers + Training Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Certified Providers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certified Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => handlers.onProviderClick(provider.id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <SafeImage
                      src={provider.profileImage}
                      alt={provider.name}
                      fill
                      className="object-cover"
                      fallbackType="provider"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                    <p className="text-sm text-gray-600">{provider.certificationLevel}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        <RatingStars rating={provider.rating} />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Before & After Gallery Preview */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Before & After Gallery</h2>
          <div className="space-y-4">
            {productsWithTransformations.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handlers.onProductClick(product.id)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex">
                    {/* Before Image */}
                    <div className="relative w-1/2 h-32">
                      <SafeImage
                        src={product.beforeImagePrimary}
                        alt="Before treatment"
                        fill
                        className="object-cover"
                        fallbackType="transformation"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Before
                      </span>
                    </div>
                    {/* After Image */}
                    <div className="relative w-1/2 h-32">
                      <SafeImage
                        src={product.afterImagePrimary}
                        alt="After treatment"
                        fill
                        className="object-cover"
                        fallbackType="transformation"
                      />
                      <span className="absolute bottom-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                        After
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-indigo-600 mt-1">View Product →</p>
                  </div>
                </div>
              ))}
            {productsWithTransformations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products with transformations available yet
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Row 4: Training & Certification Info - Full Width */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Training & Certification Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topPrograms.map((program) => (
            <TrainingProgramCard
              key={program.id}
              program={program}
              onProgramClick={handlers.onProgramClick}
              onEnroll={handlers.onEnroll}
            />
          ))}
        </div>
      </div>
      
      {/* Row 5: Reviews - Full Width */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
          <button
            onClick={handlers.onWriteReview}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Write a Review
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topReviews.map((review, index) => {
            const reviewColor = reviewThemeColors[index % reviewThemeColors.length];
            
            return (
              <div
                key={review.id}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ backgroundColor: reviewColor }}
              >
                {/* Background with User Image and Overlay */}
                <div className="relative h-[300px] overflow-hidden">
                  {/* User Avatar as Background */}
                  <div className="absolute inset-0">
                    <SafeImage
                      src={review.userImage || '/api/placeholder/400/400'}
                      alt={review.userName}
                      fill
                      className="object-cover blur-xl opacity-30"
                      fallbackType="generic"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Section - User Info and Badges */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/50">
                          <SafeImage
                            src={review.userImage || '/api/placeholder/100/100'}
                            alt={review.userName}
                            fill
                            className="object-cover"
                            fallbackType="generic"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{review.userName}</h4>
                          <span className="text-xs text-white/70">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {review.verifiedPurchase && (
                        <span className="px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    
                    {/* Middle Section - Rating */}
                    <div className="text-center py-4">
                      <div className="flex justify-center text-2xl text-yellow-400">
                        <RatingStars rating={review.rating} />
                      </div>
                    </div>
                    
                    {/* Bottom Section - Review Text */}
                    <div className="text-white">
                      <p className="text-sm leading-relaxed line-clamp-4 text-white/90">
                        {review.comment}
                      </p>
                      
                      {/* Helpful Button */}
                      <button
                        onClick={() => handlers.onReviewHelpful(review.id)}
                        className="mt-4 text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful ({review.helpfulCount})
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Colored Bottom Bar */}
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: reviewColor }}
                />
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}