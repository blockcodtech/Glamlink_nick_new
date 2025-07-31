import React from "react";
import ShareButtons from "../../shared/ShareButtons";
import { Product } from "@/lib/pages/brand/types";
import { ProductActionsProps } from "../../../types/products";

export default function ProductActions({
  product,
  quantity,
  handleQuantityChange,
  handleAddToCart
}: ProductActionsProps) {
  return (
    <>
      {/* Quantity and Add to Cart */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-2 hover:bg-gray-50"
            >
              -
            </button>
            <span className="px-4 py-2 border-x">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        <button
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="w-full bg-glamlink-teal text-white py-3 px-6 rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      {/* Share */}
      <div className="border-t pt-6">
        <ShareButtons
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={product.name}
          description={product.description}
        />
      </div>
    </>
  );
}