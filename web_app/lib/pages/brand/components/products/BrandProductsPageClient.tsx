"use client";

import { useBrand } from "../../hooks/useBrand";
import { getComponentStates } from "../core/ui";
import { LoadingSpinner } from "@/lib/components/ui/LoadingSpinner";
import BrandBanner from "@/lib/components/banners/BrandBanner";
import BrandNavigation from "../core/BrandNavigation";
import ProductGrid from "./ProductGrid";
import FilterSidebar from "../shared/FilterSidebar";
import SafeImage from "@/lib/components/SafeImage";

interface BrandProductsPageClientProps {
  brandId: string;
}

export default function BrandProductsPageClient({ brandId }: BrandProductsPageClientProps) {
  const { state, handlers } = useBrand(brandId);
  
  if (state.isLoading && !state.brand) {
    return <LoadingSpinner />;
  }
  
  if (!state.brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No brand data available</p>
      </div>
    );
  }
  
  // Check if brand is unpublished
  if (state.brand.isPublished === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brand Not Available</h3>
          <p className="text-gray-500">This brand is currently private and not available for viewing.</p>
        </div>
      </div>
    );
  }
  
  const { header_state, products_state } = getComponentStates(state);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandBanner 
        props={{ 
          state: header_state,
          handlers: {
            onFollowToggle: handlers.onFollowToggle
          }
        }} 
      />
      
      <BrandNavigation 
        brandId={brandId}
        productCount={state.products.length}
        providerCount={state.providers.length}
        galleryCount={state.products.filter(p => p.beforeImagePrimary && p.afterImagePrimary).length}
        trainingCount={state.trainingPrograms.length}
        reviewCount={state.reviews.length}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar - Column 1 */}
          <div className="lg:col-span-1">
            <FilterSidebar 
              filters={state.filters} 
              onFilterChange={handlers.onFilterChange} 
            />
          </div>
          
          {/* Products - Columns 2-4 */}
          <div className="lg:col-span-3">
            <ProductGrid 
              props={{ 
                state: products_state, 
                handlers: {
                  onFilterChange: handlers.onFilterChange,
                  onProductClick: handlers.onProductClick
                }
              }} 
            />
          </div>
        </div>

        {/* Before & After Gallery Section */}
        {state.products.filter(product => product.beforeImagePrimary && product.afterImagePrimary).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Before & After Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.products
                .filter(product => product.beforeImagePrimary && product.afterImagePrimary)
                .map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handlers.onProductClick(product.id)}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex">
                      {/* Before Image */}
                      <div className="relative w-1/2 h-32">
                        <SafeImage
                          src={product.beforeImagePrimary}
                          alt="Before treatment"
                          fill
                          className="object-cover"
                          fallbackType="transformation"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Before
                        </span>
                      </div>
                      {/* After Image */}
                      <div className="relative w-1/2 h-32">
                        <SafeImage
                          src={product.afterImagePrimary}
                          alt="After treatment"
                          fill
                          className="object-cover"
                          fallbackType="transformation"
                        />
                        <span className="absolute bottom-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-indigo-600 mt-1">View Product →</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}