"use client";

import React from 'react';

interface BrandOverviewStepProps {
  data: {
    vision: string;
    targetAudience: string;
    uniqueSellingPoints: string[];
    currentProducts?: string;
    inspiration?: string;
  };
  onChange: (updates: any) => void;
  onNext: () => void;
}

export default function BrandOverviewStep({ data, onChange, onNext }: BrandOverviewStepProps) {
  // Ensure at least one empty USP field exists
  React.useEffect(() => {
    if (!data.uniqueSellingPoints || data.uniqueSellingPoints.length === 0) {
      onChange({ uniqueSellingPoints: [''] });
    }
  }, []);

  const handleUSPChange = (index: number, value: string) => {
    const newUSPs = [...data.uniqueSellingPoints];
    newUSPs[index] = value;
    onChange({ uniqueSellingPoints: newUSPs });
  };

  const addUSP = () => {
    onChange({ uniqueSellingPoints: [...data.uniqueSellingPoints, ''] });
  };

  const removeUSP = (index: number) => {
    const newUSPs = data.uniqueSellingPoints.filter((_, i) => i !== index);
    onChange({ uniqueSellingPoints: newUSPs });
  };

  const canProceed = data.vision && data.targetAudience && data.uniqueSellingPoints.some(usp => usp.trim());

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Let's start with your brand vision</h3>
        <p className="text-gray-600 mb-6">
          This information will help us generate content that perfectly aligns with your brand identity.
        </p>
      </div>

      {/* Brand Vision */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's your brand vision? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.vision}
          onChange={(e) => onChange({ vision: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: To empower everyone to feel confident in their own skin through natural, effective beauty solutions that are accessible and sustainable."
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Who is your target audience? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.targetAudience}
          onChange={(e) => onChange({ targetAudience: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Example: Women aged 25-45 who are health-conscious, prefer natural ingredients, and are looking for effective skincare solutions for busy lifestyles."
        />
      </div>

      {/* Unique Selling Points */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What makes your brand unique? <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">List your unique selling points (USPs)</p>
        
        {data.uniqueSellingPoints.map((usp, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={usp}
              onChange={(e) => handleUSPChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
              placeholder="E.g., 100% organic ingredients"
            />
            <button
              onClick={() => removeUSP(index)}
              className="text-red-600 hover:text-red-800 p-2"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        <button
          onClick={addUSP}
          className="mt-2 text-sm text-glamlink-teal hover:text-glamlink-teal-dark flex items-center"
          type="button"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add another USP
        </button>
      </div>

      {/* Current Products (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have any existing products? (Optional)
        </label>
        <textarea
          value={data.currentProducts || ''}
          onChange={(e) => onChange({ currentProducts: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Describe any products you currently offer or plan to offer..."
        />
      </div>

      {/* Inspiration (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand inspiration or competitors (Optional)
        </label>
        <textarea
          value={data.inspiration || ''}
          onChange={(e) => onChange({ inspiration: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          placeholder="Are there any brands that inspire you or that you see as competitors?"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6 border-t">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-3 bg-glamlink-teal text-white rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next: Products
        </button>
      </div>
    </div>
  );
}