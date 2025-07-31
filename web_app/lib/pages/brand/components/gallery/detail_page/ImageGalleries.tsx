import React from "react";
import Image from "next/image";
import { ImageGalleriesProps } from "../../../types/gallery";

export default function ImageGalleries({
  beforeImages,
  afterImages,
  selectedBeforeIndex,
  selectedAfterIndex,
  setSelectedBeforeIndex,
  setSelectedAfterIndex
}: ImageGalleriesProps) {
  return (
    <>
      {/* Before Images Gallery */}
      {beforeImages.length > 1 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Before Images</h3>
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4">
                {beforeImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBeforeIndex(index)}
                    className={`relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedBeforeIndex === index 
                        ? 'ring-4 ring-glamlink-teal shadow-lg transform scale-105' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Before image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedBeforeIndex === index && (
                      <div className="absolute inset-0 bg-glamlink-teal/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* After Images Gallery */}
      {afterImages.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All After Images</h3>
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4">
                {afterImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAfterIndex(index)}
                    className={`relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedAfterIndex === index 
                        ? 'ring-4 ring-glamlink-teal shadow-lg transform scale-105' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`After image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedAfterIndex === index && (
                      <div className="absolute inset-0 bg-glamlink-teal/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}