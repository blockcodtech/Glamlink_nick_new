"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import ShareButtons from "../shared/ShareButtons";
import BackToListButton from "../shared/BackToListButton";
import { useProviderProfilePage } from "../../hooks/providers/useProviderProfilePage";

interface ProviderProfilePageProps {
  brandId: string;
  providerId: string;
}

export default function ProviderProfilePage({ brandId, providerId }: ProviderProfilePageProps) {
  const router = useRouter();
  const {
    provider,
    brand,
    providerReviews,
    providerWork,
    isLoading,
    activeTab,
    averageRating,
    reviewBreakdown,
    getCertificationBadgeColor,
    handleTabChange,
    handleContactProvider,
    handleBookAppointment
  } = useProviderProfilePage(brandId, providerId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start space-x-8">
                <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider || !brand) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <BreadcrumbNav
          items={[
            { label: "Brands", href: "/brand" },
            { label: brand.name, href: `/brand/${brandId}` },
            { label: "Providers", href: `/brand/${brandId}` },
            { label: provider.name }
          ]}
        />

        {/* Back Button */}
        <BackToListButton label="Back to Providers" />

        {/* Provider Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:space-x-8">
            {/* Profile Image */}
            <div className="mb-6 md:mb-0">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-glamlink-teal">
                <Image
                  src={provider.profileImage}
                  alt={provider.imageAlt || provider.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Provider Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.name}</h1>
                  <p className="text-xl text-gray-700 mb-4">{provider.specialty}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {/* Location */}
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {provider.location}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(provider.rating) ? 'fill-current' : 'fill-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{provider.rating} ({provider.reviewCount} reviews)</span>
                    </div>

                    {/* Certification Level */}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCertificationBadgeColor(provider.certificationLevel)}`}>
                      {provider.certificationLevel.charAt(0).toUpperCase() + provider.certificationLevel.slice(1)} Certified
                    </span>

                    {/* Verified Badge */}
                    {provider.isVerified && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  {provider.certificationDate && !isNaN(new Date(provider.certificationDate).getTime()) && (
                    <p className="text-gray-600">
                      Certified since {new Date(provider.certificationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 md:mt-0 space-y-3">
                  <button 
                    onClick={handleBookAppointment}
                    className="w-full md:w-auto bg-glamlink-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors">
                    Book Appointment
                  </button>
                  <button 
                    onClick={handleContactProvider}
                    className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => handleTabChange('about')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'about'
                    ? 'text-glamlink-teal border-glamlink-teal'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleTabChange('portfolio')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'portfolio'
                    ? 'text-glamlink-teal border-glamlink-teal'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                Portfolio ({providerWork.length + (provider.images?.length || 0)})
              </button>
              <button
                onClick={() => handleTabChange('reviews')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-glamlink-teal border-glamlink-teal'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                Reviews ({providerReviews.length})
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                {/* Professional Background / Bio */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Background</h2>
                  <p className="text-gray-700">
                    {provider.bio || `${provider.name} is a certified ${provider.specialty.toLowerCase()} specialist with ${provider.yearsExperience || (new Date().getFullYear() - new Date(provider.certificationDate).getFullYear())} years of experience in the beauty industry. Known for exceptional attention to detail and personalized approach to each client.`}
                  </p>
                </div>

                {/* Years of Experience */}
                {provider.yearsExperience && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
                    <p className="text-gray-700">
                      <span className="font-medium">{provider.yearsExperience} years</span> in the beauty industry
                    </p>
                  </div>
                )}

                {/* Services Offered */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h2>
                  {provider.services && provider.services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.services.map((service, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-glamlink-teal mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <h4 className="font-medium text-gray-900">{service}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No specific services listed yet.</p>
                  )}
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    {provider.email && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Email:</span> {provider.email}
                      </p>
                    )}
                    {provider.phone && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Phone:</span> {provider.phone}
                      </p>
                    )}
                    <p className="text-gray-700">
                      <span className="font-medium">Location:</span> {provider.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                {/* Show before/after work if available */}
                {providerWork.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Before & After Transformations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {providerWork.map((work) => (
                        <div
                          key={work.id}
                          onClick={() => router.push(`/brand/${brandId}/gallery/${work.id}`)}
                          className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <div className="grid grid-cols-2">
                            <div className="relative h-64">
                              <Image
                                src={work.beforeImage}
                                alt="Before"
                                fill
                                className="object-cover"
                              />
                              <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                Before
                              </span>
                            </div>
                            <div className="relative h-64">
                              <Image
                                src={work.afterImage}
                                alt="After"
                                fill
                                className="object-cover"
                              />
                              <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                After
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900 mb-1">{work.treatmentType}</h4>
                            <p className="text-sm text-gray-600">Duration: {work.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : provider.images && provider.images.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {provider.images.map((image, index) => (
                        <div key={index} className="relative h-64 bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <Image
                            src={typeof image === 'string' ? image : (image.url || '')}
                            alt={typeof image === 'string' ? `Portfolio ${index + 1}` : (image.altText || `Portfolio ${index + 1}`)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No portfolio items yet.</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                {providerReviews.length > 0 ? (
                  <div className="space-y-6">
                    {providerReviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                            <div className="flex items-center mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`}
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              {review.verifiedPurchase && (
                                <span className="ml-2 text-xs text-green-600">Verified Client</span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.title && (
                          <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                        )}
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-8 text-center">
          <ShareButtons
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={`${provider.name} - ${provider.specialty}`}
            description={`Certified beauty professional at ${brand.name}`}
          />
        </div>
      </div>
    </div>
  );
}