import React from "react";
import { AnalysisTypesProps } from "../config";
import { getAnalysisTypeClass } from "./ui";

export default function AnalysisTypes({ props }: { props: AnalysisTypesProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { selectedType, categories } = state;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Analysis Type</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => handlers?.onTypeSelect(category.key)}
            className={`relative p-4 rounded-lg border-2 transition-all ${getAnalysisTypeClass(selectedType === category.key)}`}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="font-medium text-sm">{category.label}</span>
              <span className="text-xs mt-1 opacity-75">{category.description}</span>
            </div>
            
            {selectedType === category.key && (
              <div className="absolute top-2 right-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}