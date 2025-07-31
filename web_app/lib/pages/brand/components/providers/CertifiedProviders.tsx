import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { CertifiedProvidersProps } from "../../types/components";
import { VerifiedBadge, CertificationBadge } from "@/lib/components/ui/badges";
import { RatingStars } from "@/lib/components/ui/RatingStars";
import { EmptyState } from "@/lib/components/ui/EmptyState";

export default function CertifiedProviders({ props }: { props: CertifiedProvidersProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { providers, isLoading } = state;
  
  if (providers.length === 0 && !isLoading) {
    return <EmptyState message="No certified providers found" />;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Certified Providers</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <SafeImage
                    src={provider.profileImage}
                    alt={provider.imageAlt || provider.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                    fallbackType="provider"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      {provider.isVerified && (
                        <div className="ml-2">
                          <VerifiedBadge />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{provider.specialty}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certification</span>
                  <CertificationBadge level={provider.certificationLevel} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-medium text-gray-900">{provider.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <RatingStars rating={provider.rating} />
                    <span className="ml-2 text-sm text-gray-600">({provider.reviewCount})</span>
                  </div>
                </div>
                
                {provider.certificationDate && !isNaN(new Date(provider.certificationDate).getTime()) && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Certified since</span>
                    <span>{new Date(provider.certificationDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handlers?.onProviderClick(provider.id)}
                className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}