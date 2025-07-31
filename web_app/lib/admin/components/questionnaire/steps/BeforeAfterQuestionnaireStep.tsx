"use client";

import React from 'react';

interface BeforeAfterQuestionnaireStepProps {
  data: {
    transformationGoals: string;
    treatmentTypes: string[];
    expectedDuration: string;
    targetConcerns?: string[];
  };
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TREATMENT_TYPES = [
  'Acne Treatment',
  'Anti-Aging',
  'Brightening',
  'Hydration Therapy',
  'Scar Reduction',
  'Chemical Peels',
  'Microdermabrasion',
  'LED Light Therapy',
  'Facial Treatments',
  'Body Contouring',
  'Hair Restoration',
  'Makeup Application',
];

const TARGET_CONCERNS = [
  'Fine Lines & Wrinkles',
  'Dark Spots',
  'Acne & Breakouts',
  'Uneven Skin Tone',
  'Dry Skin',
  'Oily Skin',
  'Large Pores',
  'Redness & Sensitivity',
  'Dark Circles',
  'Sagging Skin',
  'Stretch Marks',
  'Cellulite',
];

export default function BeforeAfterQuestionnaireStep({ data, onChange, onNext, onPrevious }: BeforeAfterQuestionnaireStepProps) {
  const handleTreatmentToggle = (type: string) => {
    const newTypes = data.treatmentTypes.includes(type)
      ? data.treatmentTypes.filter(t => t !== type)
      : [...data.treatmentTypes, type];
    onChange({ treatmentTypes: newTypes });
  };

  const handleConcernToggle = (concern: string) => {
    const currentConcerns = data.targetConcerns || [];
    const newConcerns = currentConcerns.includes(concern)
      ? currentConcerns.filter(c => c !== concern)
      : [...currentConcerns, concern];
    onChange({ targetConcerns: newConcerns });
  };

  const canProceed = data.transformationGoals && data.treatmentTypes.length > 0 && data.expectedDuration;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Showcase your transformation results</h3>
        <p className="text-gray-600 mb-6">
          Tell us about the transformations your products and services can achieve.
        </p>
      </div>

      {/* Transformation Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What transformation results do you want to showcase? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.transformationGoals}
          onChange={(e) => onChange({ transformationGoals: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: I want to show dramatic improvements in skin texture, reduction of acne scars, brightening of dark spots, and overall skin rejuvenation. The transformations should demonstrate the effectiveness of our products and treatments."
        />
      </div>

      {/* Treatment Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Types of treatments to showcase <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TREATMENT_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleTreatmentToggle(type)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                data.treatmentTypes.includes(type)
                  ? 'border-glamlink-teal bg-glamlink-teal text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Expected Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Typical transformation timeline <span className="text-red-500">*</span>
        </label>
        <select
          value={data.expectedDuration}
          onChange={(e) => onChange({ expectedDuration: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
        >
          <option value="">Select duration</option>
          <option value="1 week">1 week</option>
          <option value="2 weeks">2 weeks</option>
          <option value="1 month">1 month</option>
          <option value="6 weeks">6 weeks</option>
          <option value="2 months">2 months</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="1 year">1 year</option>
        </select>
      </div>

      {/* Target Concerns */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skin concerns to address (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TARGET_CONCERNS.map(concern => (
            <button
              key={concern}
              type="button"
              onClick={() => handleConcernToggle(concern)}
              className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
                (data.targetConcerns || []).includes(concern)
                  ? 'border-glamlink-teal bg-glamlink-teal text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-900 mb-2">💡 What we'll create</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Before and after photo examples</li>
          <li>• Detailed treatment descriptions</li>
          <li>• Product recommendations for each transformation</li>
          <li>• Client testimonials and success stories</li>
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
          Next: Providers
        </button>
      </div>
    </div>
  );
}