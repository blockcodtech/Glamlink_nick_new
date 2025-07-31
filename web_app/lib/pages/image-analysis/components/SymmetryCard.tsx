import React from "react";
import { SymmetryResult } from "../config";
import { SectionCard, ScoreBar, OverallScoreDisplay } from "./ui";

interface SymmetryCardProps {
  state: {
    symmetry: SymmetryResult;
    isLoading: boolean;
  };
}

export default function SymmetryCard({ props }: { props: SymmetryCardProps }) {
  if (!props) {
    return null;
  }
  const { state } = props;
  const { symmetry } = state;
  
  return (
    <SectionCard title="Facial Symmetry Analysis" icon="📐">
      <div className="mb-6">
        <OverallScoreDisplay score={symmetry.overallScore} />
      </div>
      
      <div className="space-y-4">
        <ScoreBar label="Eye Symmetry" score={symmetry.eyeSymmetry} />
        <ScoreBar label="Nose Alignment" score={symmetry.noseAlignment} />
        <ScoreBar label="Lip Symmetry" score={symmetry.lipSymmetry} />
        <ScoreBar label="Overall Facial Balance" score={symmetry.facialBalance} />
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Perfect symmetry is rare in nature. Your unique features contribute to your individual beauty and character.
        </p>
      </div>
    </SectionCard>
  );
}