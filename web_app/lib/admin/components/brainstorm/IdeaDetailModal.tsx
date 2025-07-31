"use client";

import { BrainstormIdea } from '@/lib/pages/brand/types';
import { IdeaDetailModalProps } from '@/lib/admin/types';
import { getCategoryIcon, getDifficultyColor } from './utils';

export default function IdeaDetailModal({ idea, onClose }: IdeaDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{idea.title}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xl">{getCategoryIcon(idea.category)}</span>
                <span className="text-gray-600 capitalize">{idea.category}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700">{idea.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-1">Difficulty</h5>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(idea.difficulty)}`}>
                {idea.difficulty}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-1">Timeframe</h5>
              <p className="text-gray-700">{idea.estimatedTimeframe}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-1">Investment</h5>
              <p className="text-gray-700">{idea.estimatedInvestment}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Potential ROI</h4>
            <p className="text-gray-700">{idea.potentialROI}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Action Items</h4>
            <ol className="list-decimal list-inside space-y-2">
              {idea.actionItems.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Resources Needed</h4>
            <ul className="list-disc list-inside space-y-1">
              {idea.resources.map((resource, index) => (
                <li key={index} className="text-gray-700">{resource}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}