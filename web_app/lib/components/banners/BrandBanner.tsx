import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { BrandHeaderProps } from "@/lib/pages/brand/types/components";
import { SocialIcon } from "@/lib/pages/brand/components/core/ui";

export default function BrandBanner({ props }: { props: BrandHeaderProps }) {
  if (!props) {
    // BrandBanner: props is undefined
    return null;
  }
  const { state, handlers } = props;
  const { brand } = state;
  
  return (
    <div className="relative bg-white shadow-sm">
      {/* Cover Image */}
      <div className="h-48 md:h-64 relative">
        {brand.coverImage ? (
          <SafeImage
            src={brand.coverImage}
            alt={`${brand.name} cover`}
            fill
            className="object-cover"
            fallbackType="brand"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        )}
      </div>
      
      {/* Brand Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Image */}
            <div className="relative">
              <SafeImage
                src={brand.profileImage}
                alt={brand.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-white shadow-lg"
                fallbackType="brand"
              />
            </div>
            
            {/* Brand Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{brand.name}</h1>
                  <p className="text-lg text-gray-600 mt-1">{brand.tagline}</p>
                </div>
                
                {/* Follow Button */}
                {handlers && (
                  <button
                    onClick={handlers.onFollowToggle}
                    className={`mt-4 sm:mt-0 px-6 py-2 rounded-full font-medium transition-colors ${
                      brand.isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {brand.isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 mt-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">{brand.followerCount.toLocaleString()}</span>
                  <span className="text-gray-600 ml-1">followers</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{(brand as any).products?.length || 0}</span>
                  <span className="text-gray-600 ml-1">products</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{(brand as any).certifiedProviders?.length || 0}</span>
                  <span className="text-gray-600 ml-1">certified providers</span>
                </div>
              </div>
              
              {/* Mission */}
              <p className="text-gray-700 mt-4 max-w-3xl">{brand.mission}</p>
              
              {/* Links */}
              <div className="flex items-center space-x-4 mt-4">
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Website
                  </a>
                )}
                
                {brand.location && (
                  <span className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {brand.location}
                  </span>
                )}
                
                {/* Social Links */}
                {brand.socialLinks && (
                  <div className="flex items-center space-x-3 ml-4">
                    {Object.entries(brand.socialLinks).map(([platform, handle]) => (
                      handle && (
                        <a
                          key={platform}
                          href={`https://${platform}.com/${handle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <SocialIcon platform={platform} />
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}