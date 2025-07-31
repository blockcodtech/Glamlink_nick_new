"use client";

import { useBrand } from "../../hooks/useBrand";
import { getComponentStates } from "../core/ui";
import { LoadingSpinner } from "@/lib/components/ui/LoadingSpinner";
import BrandBanner from "@/lib/components/banners/BrandBanner";
import BrandNavigation from "../core/BrandNavigation";
import ReviewsSection from "./ReviewsSection";
import WriteReviewModal from "./WriteReviewModal";

interface BrandReviewsPageClientProps {
  brandId: string;
}

export default function BrandReviewsPageClient({ brandId }: BrandReviewsPageClientProps) {
  const { state, handlers } = useBrand(brandId);
  
  if (state.isLoading && !state.brand) {
    return <LoadingSpinner />;
  }
  
  if (!state.brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No brand data available</p>
      </div>
    );
  }
  
  // Check if brand is unpublished
  if (state.brand.isPublished === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brand Not Available</h3>
          <p className="text-gray-500">This brand is currently private and not available for viewing.</p>
        </div>
      </div>
    );
  }
  
  const { header_state, reviews_state } = getComponentStates(state);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandBanner 
        props={{ 
          state: header_state,
          handlers: {
            onFollowToggle: handlers.onFollowToggle
          }
        }} 
      />
      
      <BrandNavigation 
        brandId={brandId}
        productCount={state.products.length}
        providerCount={state.providers.length}
        galleryCount={state.products.filter(p => p.beforeImagePrimary && p.afterImagePrimary).length}
        trainingCount={state.trainingPrograms.length}
        reviewCount={state.reviews.length}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewsSection 
          props={{ 
            state: reviews_state,
            handlers: {
              onReviewHelpful: handlers.onReviewHelpful,
              onWriteReview: handlers.onWriteReview
            }
          }} 
        />
      </div>
      
      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={state.isReviewModalOpen}
        onClose={handlers.onCloseReviewModal}
        onSubmit={handlers.onSubmitReview}
        products={state.products}
        providers={state.providers}
        isSubmitting={state.isSubmittingReview}
      />
    </div>
  );
}