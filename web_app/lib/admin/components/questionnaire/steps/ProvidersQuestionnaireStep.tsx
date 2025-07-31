"use client";

import React from 'react';

interface ProvidersQuestionnaireStepProps {
  data: {
    specialtiesNeeded: string[];
    certificationLevels: string[];
    locationPreferences: string;
    experienceLevel?: string;
  };
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SPECIALTIES = [
  'Advanced Skincare',
  'Makeup Artistry',
  'Bridal Beauty',
  'Medical Aesthetics',
  'Lash Extensions',
  'Brow Design',
  'Microblading',
  'Chemical Peels',
  'Laser Treatments',
  'Injectable Specialist',
  'Holistic Beauty',
  'Men\'s Grooming',
];

const CERTIFICATION_LEVELS = [
  'Bronze',
  'Silver', 
  'Gold',
  'Platinum',
];

export default function ProvidersQuestionnaireStep({ data, onChange, onNext, onPrevious }: ProvidersQuestionnaireStepProps) {
  const handleSpecialtyToggle = (specialty: string) => {
    const newSpecialties = data.specialtiesNeeded.includes(specialty)
      ? data.specialtiesNeeded.filter(s => s !== specialty)
      : [...data.specialtiesNeeded, specialty];
    onChange({ specialtiesNeeded: newSpecialties });
  };

  const handleCertificationToggle = (level: string) => {
    const newLevels = data.certificationLevels.includes(level)
      ? data.certificationLevels.filter(l => l !== level)
      : [...data.certificationLevels, level];
    onChange({ certificationLevels: newLevels });
  };

  const canProceed = data.specialtiesNeeded.length > 0 && data.certificationLevels.length > 0 && data.locationPreferences;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Define your provider network</h3>
        <p className="text-gray-600 mb-6">
          Tell us about the certified providers you want to work with or feature in your brand.
        </p>
      </div>

      {/* Specialties Needed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Provider specialties needed <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SPECIALTIES.map(specialty => (
            <button
              key={specialty}
              type="button"
              onClick={() => handleSpecialtyToggle(specialty)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.specialtiesNeeded.includes(specialty)
                  ? 'border-glamlink-teal bg-glamlink-teal text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Certification Levels */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certification levels to include <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">Select the certification levels for your provider network</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CERTIFICATION_LEVELS.map(level => (
            <button
              key={level}
              type="button"
              onClick={() => handleCertificationToggle(level)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.certificationLevels.includes(level)
                  ? 'border-glamlink-teal bg-glamlink-teal text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {level} Level
            </button>
          ))}
        </div>
      </div>

      {/* Location Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location preferences <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.locationPreferences}
          onChange={(e) => onChange({ locationPreferences: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: Major cities across the US including Los Angeles, New York, Miami, Chicago. Also interested in international providers in London, Paris, and Dubai."
        />
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum experience requirements (Optional)
        </label>
        <select
          value={data.experienceLevel || ''}
          onChange={(e) => onChange({ experienceLevel: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
        >
          <option value="">Any experience level</option>
          <option value="1+ years">1+ years experience</option>
          <option value="3+ years">3+ years experience</option>
          <option value="5+ years">5+ years experience</option>
          <option value="10+ years">10+ years experience</option>
        </select>
      </div>

      {/* Certification Info */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Certification Level Guide</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-orange-600 mr-2">Bronze:</span>
            <span className="text-gray-700">Entry-level certified professionals</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-600 mr-2">Silver:</span>
            <span className="text-gray-700">Experienced professionals with proven skills</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-yellow-600 mr-2">Gold:</span>
            <span className="text-gray-700">Expert-level with advanced certifications</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-purple-600 mr-2">Platinum:</span>
            <span className="text-gray-700">Master-level educators and industry leaders</span>
          </div>
        </div>
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
          Next: Review & Generate
        </button>
      </div>
    </div>
  );
}