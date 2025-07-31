"use client";

import { BrainstormIdea } from '@/lib/pages/brand/types';
import { IdeaCardProps } from '@/lib/admin/types';
import { getCategoryIcon, getDifficultyColor } from './utils';

export default function IdeaCard({ idea, onClick, onDelete }: IdeaCardProps) {
  return (
    <div
      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">{getCategoryIcon(idea.category)}</span>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{idea.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{idea.description}</p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
          {idea.difficulty}
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {idea.estimatedTimeframe}
        </span>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          {idea.estimatedInvestment}
        </span>
      </div>

      <div className="text-sm text-gray-600">
        <p className="font-medium">Next Steps:</p>
        <ul className="list-disc list-inside mt-1">
          {idea.actionItems.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          {idea.actionItems.length > 3 && (
            <li>...and {idea.actionItems.length - 3} more</li>
          )}
        </ul>
      </div>
    </div>
  );
}