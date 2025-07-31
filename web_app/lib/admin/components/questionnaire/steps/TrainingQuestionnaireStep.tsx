"use client";

import React from 'react';

interface TrainingQuestionnaireStepProps {
  data: {
    goals: string;
    targetLearners: string;
    certificationTypes: string[];
    duration?: string;
    priceRange?: { min: number; max: number };
  };
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CERTIFICATION_TYPES = [
  'Basic Certification',
  'Advanced Certification',
  'Master Class',
  'Professional Diploma',
  'Workshop Certificate',
  'Online Course Certificate',
  'Hands-on Training',
  'Mentorship Program',
];

export default function TrainingQuestionnaireStep({ data, onChange, onNext, onPrevious }: TrainingQuestionnaireStepProps) {
  const handleCertificationToggle = (type: string) => {
    const newTypes = data.certificationTypes.includes(type)
      ? data.certificationTypes.filter(t => t !== type)
      : [...data.certificationTypes, type];
    onChange({ certificationTypes: newTypes });
  };

  const canProceed = data.goals && data.targetLearners && data.certificationTypes.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Design your training programs</h3>
        <p className="text-gray-600 mb-6">
          Tell us about the educational programs you want to offer to beauty professionals.
        </p>
      </div>

      {/* Training Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your training program goals? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.goals}
          onChange={(e) => onChange({ goals: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: I want to create comprehensive training programs that teach professionals how to use our products effectively, master advanced skincare techniques, and build successful beauty businesses."
        />
      </div>

      {/* Target Learners */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Who are your target learners? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.targetLearners}
          onChange={(e) => onChange({ targetLearners: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: Licensed estheticians, makeup artists, beauty school students, spa professionals, or anyone interested in starting a career in beauty."
        />
      </div>

      {/* Certification Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Types of certifications to offer <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CERTIFICATION_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleCertificationToggle(type)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.certificationTypes.includes(type)
                  ? 'border-glamlink-teal bg-glamlink-teal text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Typical program duration (Optional)
        </label>
        <input
          type="text"
          value={data.duration || ''}
          onChange={(e) => onChange({ duration: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: 2 days, 1 week, 6 weeks, 3 months..."
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Training program price range (Optional)
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Min Price ($)</label>
            <input
              type="number"
              value={data.priceRange?.min || 100}
              onChange={(e) => onChange({ priceRange: { ...data.priceRange, min: Number(e.target.value) } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
              min="1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Max Price ($)</label>
            <input
              type="number"
              value={data.priceRange?.max || 2000}
              onChange={(e) => onChange({ priceRange: { ...data.priceRange, max: Number(e.target.value) } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Consider offering both online and in-person training options</li>
          <li>• Include hands-on practice sessions in your programs</li>
          <li>• Provide ongoing support and refresher courses</li>
          <li>• Create different levels (beginner, intermediate, advanced)</li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onPrevious}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-3 bg-glamlink-teal text-white rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next: Transformations
        </button>
      </div>
    </div>
  );
}