"use client";

import { Product } from '@/lib/pages/brand/types';

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => Promise<void>;
}

export default function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  return (
    <li>
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{product.name}</div>
              <div className="text-sm text-gray-500">
                <span className={product.originalPrice ? "text-green-600 font-medium" : ""}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-2">· {product.category} · {product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <div className="flex items-center space-x-2">
              {product.rating && (
                <span className="flex items-center">
                  <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1">{product.rating} ({product.reviewCount})</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="ml-5 flex-shrink-0 flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="text-glamlink-teal hover:text-glamlink-teal-dark"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}