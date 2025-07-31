"use client";

import { useBrand } from "../../hooks/useBrand";
import { getComponentStates } from "../core/ui";
import { LoadingSpinner } from "@/lib/components/ui/LoadingSpinner";
import BrandBanner from "@/lib/components/banners/BrandBanner";
import BrandNavigation from "../core/BrandNavigation";
import TrainingInfo from "./TrainingInfo";
import ReviewsSection from "../reviews/ReviewsSection";

interface BrandTrainingPageClientProps {
  brandId: string;
}

export default function BrandTrainingPageClient({ brandId }: BrandTrainingPageClientProps) {
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
  
  const { header_state, training_state, reviews_state } = getComponentStates(state);
  
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
        <TrainingInfo 
          props={{ 
            state: training_state,
            handlers: {
              onProgramClick: handlers.onProgramClick,
              onEnroll: handlers.onEnroll
            }
          }} 
        />        
      </div>
    </div>
  );
}