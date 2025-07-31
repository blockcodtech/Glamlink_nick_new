import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { ReviewsSectionProps } from "../../types/components";
import { RatingStars } from "@/lib/components/ui/RatingStars";
import { EmptyState } from "@/lib/components/ui/EmptyState";

export default function ReviewsSection({ props }: { props: ReviewsSectionProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { reviews, isLoading } = state;
  
  if (reviews.length === 0 && !isLoading) {
    return <EmptyState message="No reviews yet" />;
  }
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <button
          onClick={handlers?.onWriteReview}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Write a Review
        </button>
      </div>
      
      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="mt-2"><RatingStars rating={averageRating} /></div>
            <p className="text-sm text-gray-600 mt-1">Based on {reviews.length} reviews</p>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-2">
              {ratingCounts.map(({ rating, count }) => (
                <div key={rating} className="flex items-center">
                  <span className="text-sm text-gray-600 w-12">{rating} star</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: `${(count / reviews.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                {review.userImage ? (
                  <SafeImage
                    src={review.userImage}
                    alt={review.userName}
                    width={48}
                    height={48}
                    className="rounded-full"
                    fallbackType="generic"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                <div className="ml-4">
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    {review.verifiedPurchase && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <RatingStars rating={review.rating} />
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {review.title && (
              <h5 className="font-medium text-gray-900 mt-4">{review.title}</h5>
            )}
            
            <p className="text-gray-700 mt-2">{review.comment}</p>
            
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mt-4">
                {review.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <SafeImage
                      src={image}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover rounded"
                      fallbackType="product"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => handlers?.onReviewHelpful(review.id)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Helpful ({review.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}