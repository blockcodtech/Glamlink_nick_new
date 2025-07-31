"use client";

import EditModal from '../shared/modals/EditModal';
import { productEditFields } from './config';

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export default function CreateProductModal({ isOpen, onClose, onSave }: CreateProductModalProps) {
  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      title="Create New Product"
      fields={productEditFields}
      initialData={{
        inStock: true,
        isSpotlight: false,
        category: 'skincare'
      }}
    />
  );
}