"use client";

import { useImageAnalysis } from "../hooks/useImageAnalysis";
import { getComponentStates } from "./ui";
import { ErrorAlert } from "@/lib/components/ui/Alert";
import ImageUploader from "./ImageUploader";
import AnalysisTypes from "./AnalysisTypes";
import AnalysisResults from "./AnalysisResults";

export default function ImageAnalysisPage() {
  const { state, handlers } = useImageAnalysis();
  
  const { 
    uploader_state, 
    analysisTypes_state, 
    results_state,
    history_state 
  } = getComponentStates(state);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Beauty Analysis</h1>
          <p className="mt-2 text-lg text-gray-600">
            Get personalized beauty insights powered by advanced AI
          </p>
        </div>
        
        {state.error && (
          <ErrorAlert error={state.error} onDismiss={handlers.onClearError} />
        )}
        
        {!state.result ? (
          <div className="space-y-6">
            <ImageUploader 
              props={{ 
                state: uploader_state,
                handlers: {
                  onImageSelect: handlers.onImageSelect,
                  onReset: handlers.onReset
                }
              }} 
            />
            
            {state.imageUri && (
              <>
                <AnalysisTypes 
                  props={{ 
                    state: analysisTypes_state,
                    handlers: {
                      onTypeSelect: handlers.onAnalysisTypeChange
                    }
                  }} 
                />
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Analysis Request (Optional)
                  </label>
                  <textarea
                    value={state.prompt}
                    onChange={(e) => handlers.onPromptChange(e.target.value)}
                    placeholder="Any specific areas you'd like the AI to focus on?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  />
                  
                  <button
                    onClick={handlers.onAnalyze}
                    disabled={state.isLoading}
                    className="mt-4 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  >
                    {state.isLoading ? 'Analyzing...' : '🔍 Analyze My Beauty'}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <AnalysisResults 
            props={{ 
              state: results_state,
              handlers: {
                onSave: handlers.onSaveAnalysis,
                onShare: handlers.onShare
              }
            }} 
          />
        )}
        
        {state.result && (
          <div className="mt-8 text-center">
            <button
              onClick={handlers.onReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start New Analysis
            </button>
          </div>
        )}
        
        {/* Analysis History */}
        {history_state.items.length > 0 && !state.result && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Analyses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history_state.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-1 aspect-h-1 relative h-32 mb-3">
                    <img
                      src={item.imageUrl}
                      alt="Analysis"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {item.analysisType.charAt(0).toUpperCase() + item.analysisType.slice(1)}
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {item.overallScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}