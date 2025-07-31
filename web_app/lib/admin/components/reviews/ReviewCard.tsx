"use client";

import { Review, Product } from '@/lib/pages/brand/types';
import { formatDate } from "@/lib/components/ui/DateDisplay";

interface ReviewCardProps {
  review: Review;
  products: Product[];
  onEdit: (review: Review) => void;
  onApprove: (reviewId: string) => void;
  onDelete: (reviewId: string) => Promise<void>;
}

export default function ReviewCard({ review, products, onEdit, onApprove, onDelete }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {review.userImage && (
            <img
              src={review.userImage}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              {review.verifiedPurchase && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Verified Purchase
                </span>
              )}
            </div>
            
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-500">{formatDate(review.createdAt)}</span>
            </div>
            
            {review.title && (
              <h5 className="font-medium text-gray-900 mt-2">{review.title}</h5>
            )}
            
            <p className="text-gray-600 mt-2">{review.comment}</p>
            
            {review.productId && (
              <p className="text-sm text-gray-500 mt-2">
                Related Product: {products.find(p => p.id === review.productId)?.name || 'Unknown Product'}
              </p>
            )}
            
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mt-3">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={typeof image === 'string' ? image : (image as any).url}
                    alt={typeof image === 'string' ? `Review image ${index + 1}` : (image as any).alt || `Review image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center space-x-4 mt-4 text-sm">
              <span className="text-gray-500">
                {review.helpfulCount} people found this helpful
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(review)}
            className="text-glamlink-teal hover:text-glamlink-teal-dark text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onApprove(review.id)}
            className="text-green-600 hover:text-green-800 text-sm"
          >
            Approve
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}