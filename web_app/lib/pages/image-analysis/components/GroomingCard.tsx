import React from "react";
import { GroomingResult } from "../config";
import { SectionCard, RecommendationList } from "./ui";

interface GroomingCardProps {
  state: {
    grooming: GroomingResult;
    isLoading: boolean;
  };
}

export default function GroomingCard({ props }: { props: GroomingCardProps }) {
  if (!props) {
    return null;
  }
  const { state } = props;
  const { grooming } = state;
  
  return (
    <SectionCard title="Grooming & Style Analysis" icon="💈">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Eyebrows</h4>
          <p className="text-gray-700 text-sm">{grooming.eyebrows}</p>
        </div>
        
        {grooming.facialHair && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Facial Hair</h4>
            <p className="text-gray-700 text-sm">{grooming.facialHair}</p>
          </div>
        )}
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Hair Condition</h4>
          <p className="text-gray-700 text-sm">{grooming.hairCondition}</p>
        </div>
        
        {grooming.recommendations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Grooming Tips:</h4>
            <RecommendationList recommendations={grooming.recommendations} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}