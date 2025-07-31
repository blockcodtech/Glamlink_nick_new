"use client";

import React from 'react';
import { BrandQuestionnaireData } from '../../../types';

interface ReviewAndGenerateStepProps {
  data: BrandQuestionnaireData;
  onGenerate: () => void;
  onPrevious: () => void;
  isGenerating: boolean;
}

export default function ReviewAndGenerateStep({ data, onGenerate, onPrevious, isGenerating }: ReviewAndGenerateStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review your brand setup</h3>
        <p className="text-gray-600 mb-6">
          Here's a summary of what we'll create for your brand. Click "Generate My Brand Content" to proceed.
        </p>
      </div>

      {/* Brand Overview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Brand Overview</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">Vision:</span>
            <p className="text-gray-800 mt-1">{data.brandOverview.vision}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Target Audience:</span>
            <p className="text-gray-800 mt-1">{data.brandOverview.targetAudience}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Unique Selling Points:</span>
            <ul className="list-disc list-inside text-gray-800 mt-1">
              {data.brandOverview.uniqueSellingPoints.filter(usp => usp).map((usp, index) => (
                <li key={index}>{usp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">Description:</span>
            <p className="text-gray-800 mt-1">{data.products.description}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Categories:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.products.categories.map((category, index) => (
                <span key={index} className="px-2 py-1 bg-white rounded text-gray-700">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Price Range:</span>
            <span className="text-gray-800 ml-2">${data.products.priceRange.min} - ${data.products.priceRange.max}</span>
          </div>
          {data.products.images.length > 0 && (
            <div>
              <span className="font-medium text-gray-600">Reference Images:</span>
              <span className="text-gray-800 ml-2">{data.products.images.length} uploaded</span>
            </div>
          )}
        </div>
      </div>

      {/* Training Programs */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Training Programs</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">Goals:</span>
            <p className="text-gray-800 mt-1">{data.training.goals}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Target Learners:</span>
            <p className="text-gray-800 mt-1">{data.training.targetLearners}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Certification Types:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.training.certificationTypes.map((type, index) => (
                <span key={index} className="px-2 py-1 bg-white rounded text-gray-700">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Transformations */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Transformations</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">Goals:</span>
            <p className="text-gray-800 mt-1">{data.beforeAfter.transformationGoals}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Treatment Types:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.beforeAfter.treatmentTypes.map((type, index) => (
                <span key={index} className="px-2 py-1 bg-white rounded text-gray-700">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Timeline:</span>
            <span className="text-gray-800 ml-2">{data.beforeAfter.expectedDuration}</span>
          </div>
        </div>
      </div>

      {/* Providers */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Provider Network</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">Specialties:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.providers.specialtiesNeeded.map((specialty, index) => (
                <span key={index} className="px-2 py-1 bg-white rounded text-gray-700">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Certification Levels:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.providers.certificationLevels.map((level, index) => (
                <span key={index} className="px-2 py-1 bg-white rounded text-gray-700">
                  {level}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Locations:</span>
            <p className="text-gray-800 mt-1">{data.providers.locationPreferences}</p>
          </div>
        </div>
      </div>

      {/* What will be generated */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-3">✨ What we'll generate for you</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-purple-800 mb-2">Products</h5>
            <ul className="space-y-1 text-purple-700">
              <li>• 10-15 detailed product listings</li>
              <li>• Complete with descriptions & benefits</li>
              <li>• Ingredient lists & usage instructions</li>
              <li>• Realistic pricing & categories</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-purple-800 mb-2">Training Programs</h5>
            <ul className="space-y-1 text-purple-700">
              <li>• 3-5 professional training courses</li>
              <li>• Certification details & curriculum</li>
              <li>• Duration & pricing information</li>
              <li>• Target audience specifications</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-purple-800 mb-2">Transformations</h5>
            <ul className="space-y-1 text-purple-700">
              <li>• 5-8 before/after examples</li>
              <li>• Treatment descriptions & timelines</li>
              <li>• Products used in treatments</li>
              <li>• Client testimonials</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-purple-800 mb-2">Providers</h5>
            <ul className="space-y-1 text-purple-700">
              <li>• 8-12 certified professionals</li>
              <li>• Complete profiles & credentials</li>
              <li>• Specialties & experience levels</li>
              <li>• Location & contact details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onPrevious}
          disabled={isGenerating}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating Your Brand Content...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate My Brand Content
            </>
          )}
        </button>
      </div>
    </div>
  );
}