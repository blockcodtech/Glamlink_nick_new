"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import brandReadService from "../../server/brandReadService";
import { Brand } from "../../types";

import { DEFAULT_THEME_COLORS, DEFAULT_CATEGORIES, ExtendedBrand } from "../../types/core";

export default function AllBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchBrands();
  }, []);
  
  const fetchBrands = async () => {
    try {
      const fetchedBrands = await brandReadService.getDocuments<Brand>('brands');
      // Filter out unpublished brands and add default values for new fields if they don't exist
      const publishedBrands = fetchedBrands
        .filter(brand => brand.isPublished === true)
        .map((brand, index) => ({
          ...brand,
          category: brand.category || DEFAULT_CATEGORIES[index % DEFAULT_CATEGORIES.length],
          themeColor: brand.themeColor || DEFAULT_THEME_COLORS[index % DEFAULT_THEME_COLORS.length],
          summary: brand.summary || brand.description || brand.tagline || 'Discover amazing beauty products and services from this innovative brand.',
        }));
      setBrands(publishedBrands);
    } catch (error) {
      // Error fetching brands
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glamlink-teal mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading brands...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            THE MARKETPLACE <br />
            FOR BRANDS OF <br />
            ALL SIZES.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover innovative beauty brands and connect with certified professionals. 
            From boutique skincare lines to established beauty empires, find your perfect match.
          </p>
        </div>
        
        {/* Brands Grid */}
        {brands.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No brands yet</h3>
            <p className="mt-2 text-gray-500">
              Be the first to create a brand on our platform!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.id}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ backgroundColor: brand.themeColor }}
              >
                {/* Background Image with Overlay */}
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={brand.coverImage || brand.profileImage || '/api/placeholder/400/400'}
                    alt={brand.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Top Section - Category Tags */}
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                        {brand.category}
                      </span>
                      {brand.location && (
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                          {brand.location}
                        </span>
                      )}
                    </div>
                    
                    {/* Bottom Section - Brand Info */}
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-2">{brand.name}</h2>
                      <p className="text-base leading-relaxed mb-4 line-clamp-3 text-white/90">
                        {brand.summary}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-white/80">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          {brand.products?.length || 0} Products
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {brand.certifiedProviders?.length || 0} Providers
                        </span>
                      </div>
                      
                      {/* Read More Link */}
                      <div className="inline-flex items-center text-white font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>Read More</span>
                        <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Colored Bottom Bar */}
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: brand.themeColor }}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}