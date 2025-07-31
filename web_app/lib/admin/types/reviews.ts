// Review types

import { Review } from '@/lib/pages/brand/types';

export interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Omit<Review, 'id'>) => Promise<void>;
  brandId: string;
}

export interface ReviewCardProps {
  review: Review;
  onDelete: () => void;
  isDeleteDisabled: boolean;
}

export interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  hasBrand: boolean;
  onDelete: (reviewId: string) => Promise<void>;
}