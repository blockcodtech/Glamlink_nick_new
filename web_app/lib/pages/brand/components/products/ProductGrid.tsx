import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { ProductGridProps } from "../../types/components";
import { getProductCardClass, getPriceClass } from "../core/ui";
import { SpotlightBadge, OutOfStockOverlay } from "@/lib/components/ui/badges";
import { RatingStars } from "@/lib/components/ui/RatingStars";
import { EmptyState } from "@/lib/components/ui/EmptyState";

export default function ProductGrid({ props }: { props: ProductGridProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { products, filters, isLoading } = state;
  
  const spotlightProducts = products.filter(p => p.isSpotlight);
  const regularProducts = products.filter(p => !p.isSpotlight);
  
  if (products.length === 0 && !isLoading) {
    return <EmptyState message="No products found" />;
  }
  
  return (
    <div>
      {/* Header without filter button */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
      </div>
      
      {/* Spotlight Products */}
      {spotlightProducts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spotlight Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handlers?.onProductClick(product.id)}
                className={`${getProductCardClass(true, product.inStock)} cursor-pointer relative`}
              >
                <SpotlightBadge />
                <div className="aspect-w-1 aspect-h-1 relative h-64">
                  <SafeImage
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    fill
                    className="object-cover"
                    fallbackType="product"
                    showPlaceholder
                  />
                  {!product.inStock && <OutOfStockOverlay />}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className={getPriceClass(!!product.originalPrice)}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="flex items-center text-sm">
                        <RatingStars rating={product.rating} />
                        <span className="ml-1 text-gray-600">({product.reviewCount})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Products */}
      {regularProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Products</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {regularProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handlers?.onProductClick(product.id)}
                className={`${getProductCardClass(false, product.inStock)} cursor-pointer relative`}
              >
                <div className="aspect-w-1 aspect-h-1 relative h-48">
                  <SafeImage
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    fill
                    className="object-cover"
                    fallbackType="product"
                    showPlaceholder
                  />
                  {!product.inStock && <OutOfStockOverlay />}
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={getPriceClass(!!product.originalPrice)}>
                      ${product.price}
                    </span>
                    {product.rating && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}