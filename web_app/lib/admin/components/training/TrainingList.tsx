"use client";

import { TrainingListProps } from '@/lib/admin/types';
import TrainingProgramCard from './TrainingProgramCard';

export default function TrainingList({ 
  programs, 
  isLoading, 
  hasBrand,
  onEdit, 
  onDelete 
}: TrainingListProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading training programs...</div>;
  }

  if (programs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">
          {!hasBrand 
            ? "No brand associated with your account" 
            : "No training programs found. Add your first program or generate some with AI."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {programs.map((program) => (
        <TrainingProgramCard
          key={program.id}
          program={program}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}