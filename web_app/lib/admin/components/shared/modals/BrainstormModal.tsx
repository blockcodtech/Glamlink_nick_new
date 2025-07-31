"use client";

import React, { useState } from 'react';
import { BrainstormIdea } from '@/lib/services/ai/contentGeneratorService';
import { BrainstormModalProps } from '@/lib/admin/types';

export default function BrainstormModal({ onClose, onGenerate, isGenerating }: BrainstormModalProps) {
  const [focus, setFocus] = useState<BrainstormIdea['category'] | 'all'>('all');
  const [count, setCount] = useState(5);

  const handleGenerate = () => {
    onGenerate({
      focus: focus === 'all' ? undefined : focus,
      count
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Generate Brainstorm Ideas</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isGenerating}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Focus Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Focus Area
            </label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="product">Product Development</option>
              <option value="certification">Professional Certifications</option>
              <option value="marketing">Marketing & Branding</option>
              <option value="expansion">Business Expansion</option>
              <option value="innovation">Innovation & Technology</option>
            </select>
          </div>

          {/* Number of Ideas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Ideas
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="w-12 text-center font-medium">{count}</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-1">AI-Powered Ideas</h4>
            <p className="text-sm text-purple-700">
              Our AI will generate creative, actionable ideas tailored to your brand's growth. 
              Each idea includes action items, timeframes, and resource requirements.
            </p>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <span>Generate Ideas</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}