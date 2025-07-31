import React from "react";
import { SkinQualityResult } from "../config";
import { SectionCard, ScoreBar, RecommendationList } from "./ui";

interface SkinQualityCardProps {
  state: {
    skinQuality: SkinQualityResult;
    isLoading: boolean;
  };
}

export default function SkinQualityCard({ props }: { props: SkinQualityCardProps }) {
  if (!props) {
    return null;
  }
  const { state } = props;
  const { skinQuality } = state;
  
  // Calculate hydration score (inverse of dryness)
  const hydrationScore = 100 - skinQuality.dryness;
  
  return (
    <SectionCard title="Skin Quality Analysis" icon="🧴">
      <div className="space-y-4">
        <ScoreBar label="Clear Skin (Acne Control)" score={skinQuality.acne} color="#10b981" />
        <ScoreBar label="Oil Balance" score={skinQuality.oiliness} color="#f59e0b" />
        <ScoreBar label="Hydration Level" score={hydrationScore} color="#3b82f6" />
        <ScoreBar label="Tone Evenness" score={skinQuality.evenness} color="#8b5cf6" />
        <ScoreBar label="Texture Quality" score={skinQuality.texture} color="#ec4899" />
        
        {skinQuality.recommendations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Skincare Recommendations:</h4>
            <RecommendationList recommendations={skinQuality.recommendations} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}