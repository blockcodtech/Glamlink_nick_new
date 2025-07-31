"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchBrandData, 
  toggleFollowBrand, 
  setFilters, 
  setSearchQuery, 
  clearError,
  openReviewModal,
  closeReviewModal,
  setSubmittingReview
} from "../store/brandSlice";
import { FilterOptions } from "../types/state";
import { Review } from "../types";
import { ReviewFormData } from "../components/reviews/WriteReviewModal";
import firebaseReviewService from "@/lib/admin/server/firebaseReviewService";

export function useBrand(brandId?: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const brandState = useAppSelector((state) => state.brand);
  const authState = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    // Use provided brandId or default to 'glamlink' for backward compatibility
    dispatch(fetchBrandData(brandId || 'glamlink'));
  }, [dispatch, brandId]);
  
  
  const handleFilterChange = useCallback((filters: FilterOptions) => {
    dispatch(setFilters(filters));
  }, [dispatch]);
  
  const handleFollowToggle = useCallback(() => {
    if (brandState.brand) {
      dispatch(toggleFollowBrand({
        brandId: brandState.brand.id,
        isFollowing: !brandState.brand.isFollowing
      }));
    }
  }, [brandState.brand, dispatch]);
  
  const handleSearchChange = useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);
  
  const handleProductClick = useCallback((productId: string) => {
    if (brandId) {
      router.push(`/brand/${brandId}/products/${productId}`);
    }
  }, [brandId, router]);
  
  const handleProviderClick = useCallback((providerId: string) => {
    if (brandId) {
      router.push(`/brand/${brandId}/providers/${providerId}`);
    }
  }, [brandId, router]);
  
  const handleProgramClick = useCallback((programId: string) => {
    if (brandId) {
      router.push(`/brand/${brandId}/training/${programId}`);
    }
  }, [brandId, router]);
  
  const handleEnroll = useCallback((programId: string) => {
    // TODO: Handle enrollment
  }, []);
  
  const handleReviewHelpful = useCallback((reviewId: string) => {
    // TODO: Mark review as helpful
  }, []);
  
  const handleWriteReview = useCallback(() => {
    if (!authState.isAuthenticated) {
      alert('You must be signed in to write a review');
      return;
    }
    dispatch(openReviewModal());
  }, [authState.isAuthenticated, dispatch]);

  const handleCloseReviewModal = useCallback(() => {
    dispatch(closeReviewModal());
  }, [dispatch]);

  const handleSubmitReview = useCallback(async (reviewData: ReviewFormData) => {
    if (!authState.user || !brandId) return;

    try {
      dispatch(setSubmittingReview(true));
      
      // Generate a unique ID for the review
      const reviewId = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create the review object with required fields
      const newReview: Review = {
        id: reviewId,
        userId: authState.user.uid,
        userName: authState.user.displayName || authState.user.email || 'Anonymous',
        rating: reviewData.rating,
        comment: reviewData.comment,
        helpfulCount: 0,
        verifiedPurchase: false,
        createdAt: new Date().toISOString()
      };

      // Add optional fields only if they have values (not empty strings)
      if (authState.user.photoURL) {
        newReview.userImage = authState.user.photoURL;
      }
      if (reviewData.title && reviewData.title.trim()) {
        newReview.title = reviewData.title;
      }
      if (reviewData.productId && reviewData.productId.trim()) {
        newReview.productId = reviewData.productId;
      }
      if (reviewData.providerId && reviewData.providerId.trim()) {
        newReview.providerId = reviewData.providerId;
      }

      // Add review to brand's reviews array
      await firebaseReviewService.addReview(brandId, newReview);
      
      // Refresh brand data to show the new review
      await dispatch(fetchBrandData(brandId));
      
      // Close modal
      dispatch(closeReviewModal());
      
      // Show success message
      alert('Thank you for your review!');
    } catch (error) {
      // Error submitting review
      alert('Failed to submit review. Please try again.');
    } finally {
      dispatch(setSubmittingReview(false));
    }
  }, [authState.user, brandId, dispatch]);
  
  const handleItemClick = useCallback((itemId: string) => {
    if (brandId) {
      router.push(`/brand/${brandId}/gallery/${itemId}`);
    }
  }, [brandId, router]);
  
  return {
    state: brandState,
    handlers: {
      onFilterChange: handleFilterChange,
      onFollowToggle: handleFollowToggle,
      onSearchChange: handleSearchChange,
      onClearError: () => dispatch(clearError()),
      onProductClick: handleProductClick,
      onProviderClick: handleProviderClick,
      onProgramClick: handleProgramClick,
      onEnroll: handleEnroll,
      onReviewHelpful: handleReviewHelpful,
      onWriteReview: handleWriteReview,
      onCloseReviewModal: handleCloseReviewModal,
      onSubmitReview: handleSubmitReview,
      onItemClick: handleItemClick
    },
  };
}