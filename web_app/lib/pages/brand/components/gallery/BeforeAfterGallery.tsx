import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { BeforeAfterGalleryProps } from "../../types/components";
import { Product } from "../../types";
import { EmptyState } from "@/lib/components/ui/EmptyState";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function BeforeAfterGallery({ props }: { props: BeforeAfterGalleryProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { items, isLoading } = state;
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract brand ID from the current path
  const pathSegments = pathname.split('/');
  const brandIndex = pathSegments.indexOf('brand');
  const brandId = brandIndex !== -1 ? pathSegments[brandIndex + 1] : '';
  
  if (items.length === 0 && !isLoading) {
    return <EmptyState message="No products with before/after transformations available" />;
  }
  
  const handleItemClick = (productId: string) => {
    if (brandId) {
      router.push(`/brand/${brandId}/products/${productId}`);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Before & After Gallery</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative">
              <div className="grid grid-cols-2">
                <div className="relative h-48">
                  <SafeImage
                    src={item.beforeImagePrimary || ''}
                    alt="Before treatment"
                    fill
                    className="object-cover"
                    fallbackType="transformation"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs font-medium py-1 text-center">
                    Before
                  </div>
                </div>
                <div className="relative h-48">
                  <SafeImage
                    src={item.afterImagePrimary || ''}
                    alt="After treatment"
                    fill
                    className="object-cover"
                    fallbackType="transformation"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs font-medium py-1 text-center">
                    After
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{item.category}</p>
                <span className="text-indigo-600 text-sm font-medium">View Product →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}