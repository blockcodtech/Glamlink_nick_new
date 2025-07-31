import React from "react";
import { Product } from "@/lib/pages/brand/types";
import { ProductDetailsProps } from "../../../types/products";

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h2>
          <ul className="list-disc list-inside space-y-1">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-700">{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ingredients */}
      {product.ingredients && product.ingredients.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Key Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Usage */}
      {product.usage && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">How to Use</h2>
          <p className="text-gray-700">{product.usage}</p>
        </div>
      )}
    </>
  );
}