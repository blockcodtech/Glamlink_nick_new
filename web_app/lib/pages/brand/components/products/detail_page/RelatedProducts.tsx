import React from "react";
import ProductImage from "@/lib/components/ProductImage";
import { Product } from "@/lib/pages/brand/types";
import { RelatedProductsProps } from "../../../types/products";

export default function RelatedProducts({
  relatedProducts,
  handleNavigateToRelatedProduct
}: RelatedProductsProps) {
  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            onClick={() => handleNavigateToRelatedProduct(relatedProduct.id)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="aspect-w-1 aspect-h-1 relative h-48 rounded-t-lg overflow-hidden">
              <ProductImage
                src={relatedProduct.image}
                alt={relatedProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                {relatedProduct.rating && (
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">{relatedProduct.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}