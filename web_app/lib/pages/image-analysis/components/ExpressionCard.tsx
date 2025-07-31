import React from "react";
import { ExpressionResult, LightingResult } from "../config";
import { SectionCard, ScoreBar, RecommendationList } from "./ui";

interface ExpressionCardProps {
  state: {
    expression: ExpressionResult;
    lighting: LightingResult;
    isLoading: boolean;
  };
}

export default function ExpressionCard({ props }: { props: ExpressionCardProps }) {
  if (!props) {
    return null;
  }
  const { state } = props;
  const { expression, lighting } = state;
  
  return (
    <SectionCard title="Photo Quality & Expression" icon="💡">
      <div className="space-y-6">
        {/* Lighting Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Lighting Quality</h4>
          <div className="mb-3">
            <ScoreBar label={lighting.quality} score={lighting.score} />
          </div>
          {lighting.recommendations.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-3">
              <h5 className="text-sm font-medium text-amber-900 mb-2">Lighting Tips:</h5>
              <ul className="space-y-1">
                {lighting.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-amber-800">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Expression Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Expression Analysis</h4>
          <div className="space-y-3">
            <ScoreBar label="Confidence Level" score={expression.confidence} />
            <ScoreBar label="Smile Warmth" score={expression.smile} />
            <ScoreBar label="Eye Contact" score={expression.eyeContact} />
          </div>
          
          {expression.suggestions.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Expression Tips:</h5>
              <RecommendationList recommendations={expression.suggestions} />
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}