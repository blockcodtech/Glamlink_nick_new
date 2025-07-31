import React from "react";
import { ImageAnalysisStateInterface, getScoreColor, getScoreLabel, AnalysisType } from "../config";

// Component State Extraction
export function getComponentStates(state: ImageAnalysisStateInterface) {
  return {
    uploader_state: {
      imageUri: state.imageUri,
      isLoading: state.isLoading,
    },
    analysisTypes_state: {
      selectedType: state.analysisType,
      categories: [
        { key: 'comprehensive' as AnalysisType, label: 'Complete Analysis', icon: '🔍', description: 'Full beauty assessment' },
        { key: 'skin' as AnalysisType, label: 'Skin Quality', icon: '🧴', description: 'Skin texture and health' },
        { key: 'symmetry' as AnalysisType, label: 'Facial Symmetry', icon: '📐', description: 'Facial balance' },
        { key: 'grooming' as AnalysisType, label: 'Grooming & Hair', icon: '💈', description: 'Grooming assessment' },
      ],
    },
    results_state: {
      result: state.result!,
      isLoading: state.isLoading,
    },
    history_state: {
      items: state.analysisHistory,
    },
  };
}

// Score Display Components
export function ScoreBar({ label, score, color }: { label: string; score: number; color?: string }) {
  const barColor = color || getScoreColor(score);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold" style={{ color: barColor }}>
          {score}/100
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${score}%`, 
            backgroundColor: barColor 
          }} 
        />
      </div>
    </div>
  );
}

export function OverallScoreDisplay({ score }: { score: number }) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  
  return (
    <div className="text-center py-6">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(score / 100) * 377} 377`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute">
          <div className="text-3xl font-bold" style={{ color }}>{score}</div>
          <div className="text-xs text-gray-600">out of 100</div>
        </div>
      </div>
      <div className="mt-3">
        <span className="px-3 py-1 rounded-full text-sm font-medium" 
              style={{ backgroundColor: `${color}20`, color }}>
          {label}
        </span>
      </div>
    </div>
  );
}

// Reusable Components
// Note: Reusable components have been moved to @/lib/components/ui/
// Import them using: import { LoadingSpinner, LoadingOverlay, EmptyState, ErrorAlert } from '@/lib/components/ui';

export function RecommendationList({ recommendations }: { recommendations: string[] }) {
  return (
    <div className="space-y-2">
      {recommendations.map((rec, index) => (
        <div key={index} className="flex items-start">
          <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="ml-2 text-sm text-gray-700">{rec}</p>
        </div>
      ))}
    </div>
  );
}

export function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2 text-2xl">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

// Styling utilities
export function getAnalysisTypeClass(isSelected: boolean) {
  return isSelected
    ? "bg-indigo-600 text-white border-indigo-600"
    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
}

export function getHistoryItemClass(score: number) {
  const baseClass = "bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer";
  if (score >= 80) return `${baseClass} border-l-4 border-green-500`;
  if (score >= 60) return `${baseClass} border-l-4 border-amber-500`;
  return `${baseClass} border-l-4 border-red-500`;
}