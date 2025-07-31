import React from "react";
import { Product } from "@/lib/pages/brand/types";
import { ProductInfoProps } from "../../../types/products";

export default function ProductInfo({
  product,
  averageRating,
  totalReviews
}: ProductInfoProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center space-x-4 mb-4">
          {averageRating > 0 && (
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-current' : 'fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({totalReviews} reviews)</span>
            </div>
          )}
          <span className="text-sm text-gray-500 uppercase">{product.category}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
          )}
          {product.originalPrice && (
            <span className="text-sm text-green-600 font-medium">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'} mt-2`}>
          {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </p>
      </div>
    </>
  );
}