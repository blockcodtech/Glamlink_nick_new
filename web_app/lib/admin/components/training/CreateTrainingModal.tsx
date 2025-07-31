"use client";

import { CreateTrainingModalProps, TrainingInitialData } from '@/lib/admin/types';
import EditModal from '../shared/modals/EditModal';
import { trainingEditFields } from './config';

export default function CreateTrainingModal({ isOpen, onClose, onSave }: CreateTrainingModalProps) {
  const initialData: TrainingInitialData = {
    level: 'beginner',
    certificationOffered: false,
    price: 199
  };

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      title="Create New Training Program"
      fields={trainingEditFields}
      initialData={initialData}
    />
  );
}