import React from "react";
import Image from "next/image";
import ShareButtons from "../../shared/ShareButtons";
import { BeforeAfter, CertifiedProvider, Brand } from "../../../types";
import { TransformationSidebarProps } from "../../../types/gallery";

export default function TransformationSidebar({
  transformation,
  provider,
  brand,
  handleNavigateToProvider
}: TransformationSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Provider Info */}
      {provider && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performed By</h3>
          <div
            onClick={() => handleNavigateToProvider(provider.id)}
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={provider.profileImage}
                alt={provider.imageAlt || provider.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{provider.name}</h4>
              <p className="text-sm text-gray-600">{provider.specialty}</p>
              <div className="flex items-center mt-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm">{provider.rating}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in This Treatment?</h3>
        <p className="text-gray-600 mb-4">
          Contact us to learn more about achieving similar results.
        </p>
        <button className="w-full bg-glamlink-teal text-white py-3 px-6 rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors">
          Book Consultation
        </button>
      </div>

      {/* Share */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Transformation</h3>
        <ShareButtons
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={transformation.treatmentType}
          description={`Amazing ${transformation.duration} transformation at ${brand.name}`}
        />
      </div>
    </div>
  );
}