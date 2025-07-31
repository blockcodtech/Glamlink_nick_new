"use client";

import Image from "next/image";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import ShareButtons from "../shared/ShareButtons";
import BackToListButton from "../shared/BackToListButton";
import SafeImage from "@/lib/components/SafeImage";
import { getLevelBadgeClass } from "../core/ui";
import { useTrainingProgramDetailPage } from "../../hooks/training/useTrainingProgramDetailPage";

interface TrainingProgramDetailPageProps {
  brandId: string;
  programId: string;
}

export default function TrainingProgramDetailPage({ brandId, programId }: TrainingProgramDetailPageProps) {
  const {
    program,
    brand,
    isLoading,
    activeImageIndex,
    programImages,
    setActiveImageIndex,
    handleNextImage,
    handlePrevImage,
    handleEnroll,
    handleContactInstructor
  } = useTrainingProgramDetailPage(brandId, programId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!program || !brand) {
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
            { label: "Training", href: `/brand/${brandId}/training` },
            { label: program.name }
          ]}
        />

        {/* Back Button */}
        <BackToListButton label="Back to Training Programs" />

        {/* Program Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-96 lg:h-auto bg-gray-100">
              {programImages.length > 0 ? (
                <>
                  <SafeImage
                    src={programImages[activeImageIndex]}
                    alt={program.imageAlt || program.name}
                    fill
                    className="object-cover"
                    fallbackType="training"
                  />
                  
                  {/* Image Navigation */}
                  {programImages.length > 1 && (
                    <>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {programImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`View image ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Next image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg className="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{program.name}</h1>
                    <div className="flex items-center gap-4">
                      <span className={getLevelBadgeClass(program.level)}>
                        {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                      </span>
                      {program.certificationOffered && (
                        <span className="inline-flex items-center text-sm text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Certificate offered
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Program Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="text-lg font-semibold text-gray-900">{program.duration}</p>
                  </div>
                  {program.price !== undefined && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Price</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {program.price === 0 ? 'Free' : `$${program.price}`}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Enrolled</p>
                    <p className="text-lg font-semibold text-gray-900">{program.enrollmentCount} students</p>
                  </div>
                  {program.nextSessionDate && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Next Session</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(program.nextSessionDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Instructor Info */}
                {(program.instructorName || program.instructorImage) && (
                  <div className="border-t pt-6 mb-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-3">Instructor</h3>
                    <div className="flex items-center gap-4">
                      {program.instructorImage && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <SafeImage
                            src={program.instructorImage}
                            alt={program.instructorName || "Instructor"}
                            fill
                            className="object-cover"
                            fallbackType="provider"
                          />
                        </div>
                      )}
                      <div>
                        {program.instructorName && (
                          <p className="font-semibold text-gray-900">{program.instructorName}</p>
                        )}
                        {program.instructorTitle && (
                          <p className="text-sm text-gray-600">{program.instructorTitle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <button 
                  onClick={handleEnroll}
                  className="w-full bg-glamlink-teal text-white py-3 px-6 rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Program</h2>
              <p className="text-gray-700 whitespace-pre-line">{program.description}</p>
            </div>

            {/* Topics Covered */}
            {program.topics && program.topics.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Topics Covered</h2>
                <ul className="space-y-3">
                  {program.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-glamlink-teal mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-glamlink-teal mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Comprehensive Course Materials</h4>
                    <p className="text-sm text-gray-600">Access to all training materials and resources</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-glamlink-teal mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Live Sessions</h4>
                    <p className="text-sm text-gray-600">Interactive sessions with experienced instructors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-glamlink-teal mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Hands-on Practice</h4>
                    <p className="text-sm text-gray-600">Practical exercises and real-world applications</p>
                  </div>
                </div>
                {program.certificationOffered && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-glamlink-teal mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-900">Professional Certification</h4>
                      <p className="text-sm text-gray-600">Industry-recognized certificate upon completion</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-600">Duration</dt>
                  <dd className="font-medium text-gray-900">{program.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Level</dt>
                  <dd className="font-medium text-gray-900 capitalize">{program.level}</dd>
                </div>
                {program.price !== undefined && (
                  <div>
                    <dt className="text-sm text-gray-600">Investment</dt>
                    <dd className="font-medium text-gray-900">
                      {program.price === 0 ? 'Free' : `$${program.price}`}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-gray-600">Students Enrolled</dt>
                  <dd className="font-medium text-gray-900">{program.enrollmentCount}</dd>
                </div>
                {program.nextSessionDate && (
                  <div>
                    <dt className="text-sm text-gray-600">Next Session</dt>
                    <dd className="font-medium text-gray-900">
                      {new Date(program.nextSessionDate).toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Have questions about this program? We're here to help!
              </p>
              <button 
                onClick={handleContactInstructor}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Contact Support
              </button>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Program</h3>
              <ShareButtons
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title={program.name}
                description={`${program.level} training program at ${brand.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}