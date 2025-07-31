"use client";

import { useState } from "react";
import Modal from "@/lib/components/Modal";
import SafeImage from "@/lib/components/SafeImage";
import { BeforeAfter } from "../../types";

interface BeforeAfterModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BeforeAfter | null;
}

export default function BeforeAfterModal({ isOpen, onClose, item }: BeforeAfterModalProps) {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  if (!item) return null;

  // Get images for current tab
  const primaryImage = activeTab === "before" ? item.beforeImage : item.afterImage;
  const additionalImages = activeTab === "before" ? item.beforeImages : item.afterImages;
  const imageAlt = activeTab === "before" ? item.beforeImageAlt : item.afterImageAlt;
  
  // Extract URLs from image objects (handling both old string format and new object format)
  const additionalImageUrls = additionalImages?.map((img: string | { url: string; altText: string }) => 
    typeof img === 'string' ? img : img.url
  ).filter((url: string) => url && url.trim() !== '') || [];
  
  // Combine all images into one array
  const allImages = [
    ...(primaryImage && primaryImage.trim() !== '' ? [primaryImage] : []),
    ...additionalImageUrls
  ];
  
  // Get alt texts for additional images
  const additionalAltTexts = additionalImages?.map((img: string | { url: string; altText: string }) => 
    typeof img === 'string' ? '' : (img.altText || '')
  ) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="p-6">
        {/* Header with Tabs */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transformation Details</h2>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("before")}
              className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                activeTab === "before"
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Before
              {activeTab === "before" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                activeTab === "after"
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              After
              {activeTab === "after" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>
          </div>
        </div>

        {/* Images Section - All in one row */}
        {allImages.length > 0 && (
          <div className="mb-8">
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-2">
                {allImages.map((img, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
                    <SafeImage
                      src={img}
                      alt={index === 0 ? (imageAlt || `${activeTab} image`) : (additionalAltTexts[index - 1] || `${activeTab} image ${index + 1}`)}
                      fill
                      className="object-cover"
                      fallbackType="transformation"
                    />
                    {/* Primary Badge on first image */}
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Details Section - Full width below images */}
        <div className="space-y-6 border-t pt-6">
          {/* Treatment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Treatment Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Treatment Type:</span>
                  <p className="text-gray-900">{item.treatmentType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Duration:</span>
                  <p className="text-gray-900">{item.duration}</p>
                </div>
                {item.createdAt && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Date:</span>
                    <p className="text-gray-900">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Provider Information */}
            {item.providerName && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Provider</h3>
                <p className="text-gray-900">{item.providerName}</p>
              </div>
            )}

            {/* Products Used */}
            {item.productsUsed && item.productsUsed.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Products Used</h3>
                <ul className="list-disc list-inside space-y-1">
                  {item.productsUsed.map((product, index) => (
                    <li key={index} className="text-gray-700">{product}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Description/Testimonial - Full width */}
          {(item.description || item.testimonial) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.testimonial ? "Client Testimonial" : "Description"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.testimonial || item.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}