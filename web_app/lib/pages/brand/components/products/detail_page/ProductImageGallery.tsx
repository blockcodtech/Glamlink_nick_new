import React from "react";
import ProductImage from "@/lib/components/ProductImage";
import { ProductImageGalleryProps } from "../../../types/products";

export default function ProductImageGallery({
  productImages,
  selectedImage,
  setSelectedImage,
  imageAlts
}: ProductImageGalleryProps) {
  // If no images available, show placeholder
  if (!productImages || productImages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-w-1 aspect-h-1 relative h-[500px]">
          <ProductImage
            src={null}
            alt="No image available"
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        <div className="aspect-w-1 aspect-h-1 relative h-[500px]">
          <ProductImage
            src={productImages[selectedImage]}
            alt={imageAlts[selectedImage]}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Thumbnail Images - only show if more than one image */}
      {productImages.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {productImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-32 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-glamlink-teal' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ProductImage
                src={img}
                alt={imageAlts[index]}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}