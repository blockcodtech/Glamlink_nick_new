"use client";

import EditModal from '../shared/modals/EditModal';
import { Product } from '@/lib/pages/brand/types';
import { getReviewEditFields } from './config';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  products: Product[];
}

export default function CreateReviewModal({ isOpen, onClose, onSave, products }: CreateReviewModalProps) {
  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      title="Create New Review"
      fields={getReviewEditFields(products)}
      initialData={{
        rating: 5,
        verifiedPurchase: false,
        helpfulCount: 0
      }}
      headerMessage={
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="font-semibold">Testing Feature Only</h4>
              <p className="text-sm mt-1">
                This feature is for testing purposes only. In production, reviews should only come from actual customers. 
                Creating fake reviews violates platform policies and trust.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}