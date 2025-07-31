import React from "react";
import { TrainingInfoProps } from "../../types/components";
import { EmptyState } from "@/lib/components/ui/EmptyState";
import TrainingProgramCard from "./TrainingProgramCard";

export default function TrainingInfo({ props }: { props: TrainingInfoProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { programs, isLoading } = state;
  
  if (programs.length === 0 && !isLoading) {
    return <EmptyState message="No training programs available" />;
  }
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Training & Certification Programs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <TrainingProgramCard
            key={program.id}
            program={program}
            onProgramClick={handlers?.onProgramClick}
            onEnroll={handlers?.onEnroll}
          />
        ))}
      </div>
    </div>
  );
}