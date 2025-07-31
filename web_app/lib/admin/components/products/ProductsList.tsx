"use client";

import { Product } from '@/lib/pages/brand/types';
import { ProductsListProps } from '@/lib/admin/types';
import ProductItem from './ProductItem';

export default function ProductsList({ 
  products, 
  isLoading, 
  hasBrand,
  onEdit, 
  onDelete 
}: ProductsListProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">
          {hasBrand 
            ? "No products found. Add your first product or generate some with AI to get started."
            : "No brand associated with your account. Please contact support."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}