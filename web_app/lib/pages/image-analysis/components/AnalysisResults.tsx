import React from "react";
import { AnalysisResultsProps } from "../config";
import { OverallScoreDisplay, SectionCard } from "./ui";
import SkinQualityCard from "./SkinQualityCard";
import SymmetryCard from "./SymmetryCard";
import GroomingCard from "./GroomingCard";
import ExpressionCard from "./ExpressionCard";

export default function AnalysisResults({ props }: { props: AnalysisResultsProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { result, isLoading } = state;
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your beauty features...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <SectionCard title="Overall Beauty Score" icon="⭐">
        <OverallScoreDisplay score={result.overall.score} />
        <div className="mt-6">
          <p className="text-gray-700 mb-4">{result.overall.summary}</p>
          <h4 className="font-medium text-gray-900 mb-2">Top Recommendations:</h4>
          <ul className="space-y-2">
            {result.overall.topRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span className="text-sm text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionCard>
      
      {/* Skin Quality */}
      <SkinQualityCard 
        props={{ 
          state: { skinQuality: result.skinQuality, isLoading: false } 
        }} 
      />
      
      {/* Facial Symmetry */}
      <SymmetryCard 
        props={{ 
          state: { symmetry: result.facialSymmetry, isLoading: false } 
        }} 
      />
      
      {/* Grooming */}
      <GroomingCard 
        props={{ 
          state: { grooming: result.grooming, isLoading: false } 
        }} 
      />
      
      {/* Expression & Lighting */}
      <ExpressionCard 
        props={{ 
          state: { 
            expression: result.expression, 
            lighting: result.lighting,
            isLoading: false 
          } 
        }} 
      />
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button
          onClick={handlers?.onSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
          </svg>
          Save Results
        </button>
        <button
          onClick={handlers?.onShare}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}