"use client";

import { Review, Product } from '@/lib/pages/brand/types';
import ReviewCard from './ReviewCard';

interface ReviewsListProps {
  reviews: Review[];
  products: Product[];
  isLoading: boolean;
  hasBrand: boolean;
  onEdit: (review: Review) => void;
  onApprove: (reviewId: string) => void;
  onDelete: (reviewId: string) => Promise<void>;
}

export default function ReviewsList({ 
  reviews, 
  products,
  isLoading, 
  hasBrand,
  onEdit, 
  onApprove,
  onDelete 
}: ReviewsListProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">
          {!hasBrand 
            ? "No brand associated with your account" 
            : "No reviews found yet. Generate some with AI to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          products={products}
          onEdit={onEdit}
          onApprove={onApprove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}