"use client";

import { useState, useEffect } from "react";
import { Review } from '@/lib/pages/brand/types';
import firebaseReviewService from '../../server/firebaseReviewService';
import { useBrandStore } from '../../hooks/useBrandStore';
import EnhancedAIGeneratorModal from '../shared/modals/EnhancedAIGeneratorModal';
import EditModal from '../shared/modals/EditModal';
import ReviewsList from './ReviewsList';
import CreateReviewModal from './CreateReviewModal';
import { getReviewEditFields } from './config';

export default function ReviewsTab() {
  // Use Redux store for brand data
  const { brand, brandId, isLoading, refreshBrand } = useBrandStore();
  const [showAIModal, setShowAIModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Get reviews and products from brand data
  const reviews = brand?.reviews || [];
  const products = brand?.products || [];
  
  // Refresh brand data when component mounts
  useEffect(() => {
    if (brandId && !brand) {
      refreshBrand();
    }
  }, [brandId, brand, refreshBrand]);
  
  const handleAIGenerate = async (generatedReviews: Review[]) => {
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      for (const review of generatedReviews) {
        await firebaseReviewService.addReview(brandId, review);
      }
      
      // Refresh the brand data from Redux
      await refreshBrand();
      alert(`Successfully added ${generatedReviews.length} reviews!`);
    } catch (error) {
      // Error saving generated reviews
      alert("Failed to save generated reviews");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!brandId || !editingReview) return;

    try {
      await firebaseReviewService.updateReview(
        brandId,
        editingReview.id,
        updatedData
      );
      
      // Refresh the brand data from Redux
      await refreshBrand();
      setEditingReview(null);
      alert("Review updated successfully!");
    } catch (error) {
      // Error updating review
      throw new Error("Failed to update review");
    }
  };
  
  const handleCreateReview = async (reviewData: any) => {
    if (!brandId) return;

    try {
      const newReview: Review = {
        id: `review_${Date.now()}`,
        ...reviewData,
        userImage: reviewData.userImage || 'https://source.unsplash.com/100x100/?portrait',
        helpfulCount: reviewData.helpfulCount || 0,
        createdAt: new Date().toISOString().split('T')[0],
        verifiedPurchase: reviewData.verifiedPurchase || false
      };

      await firebaseReviewService.addReview(brandId, newReview);
      // Refresh the brand data from Redux
      await refreshBrand();
      alert("Review created successfully!");
    } catch (error) {
      // Error creating review
      throw new Error("Failed to create review");
    }
  };

  const handleApprove = async (reviewId: string) => {
    // In a real app, you'd update the review status
    // Currently approving review: reviewId
  };
  
  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      await firebaseReviewService.removeReview(brandId, reviewId);
      // Refresh the brand data from Redux
      await refreshBrand();
    } catch (error) {
      // Error deleting review
      alert("Failed to delete review");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Total: {reviews.length} reviews
          </span>
          <button 
            onClick={() => setShowAIModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 inline-flex items-center"
            disabled={!brandId}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Generate with AI
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-glamlink-teal text-white px-4 py-2 rounded-lg hover:bg-glamlink-teal-dark inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Review (Testing Only)
          </button>
        </div>
      </div>
      
      <ReviewsList
        reviews={reviews}
        products={products}
        isLoading={isLoading}
        hasBrand={!!brandId}
        onEdit={handleEdit}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />

      {/* AI Generator Modal */}
      {brandId && (
        <EnhancedAIGeneratorModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          type="reviews"
          brandId={brandId}
          onGenerate={handleAIGenerate}
        />
      )}

      {/* Edit Modal */}
      {editingReview && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingReview(null);
          }}
          onSave={handleSaveEdit}
          title="Edit Review"
          fields={getReviewEditFields(products)}
          initialData={editingReview}
          contentId={editingReview.id}
        />
      )}

      {/* Create Modal */}
      <CreateReviewModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateReview}
        products={products}
      />
    </div>
  );
}