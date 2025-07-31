// ============================================
// TRAINING-RELATED TYPE DEFINITIONS
// ============================================

import { TrainingProgram } from '@/lib/pages/brand/types';

// Training Tab Types
export interface TrainingTabProps {
  // No props needed - uses internal state
}

// Training List Types
export interface TrainingListProps {
  programs: TrainingProgram[];
  isLoading: boolean;
  hasBrand: boolean;
  onEdit: (program: TrainingProgram) => void;
  onDelete: (programId: string) => Promise<void>;
}

// Training Program Card Types
export interface TrainingProgramCardProps {
  program: TrainingProgram;
  onEdit: (program: TrainingProgram) => void;
  onDelete: (programId: string) => Promise<void>;
}

// Create Training Modal Types
export interface CreateTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

// Training Edit Field Configuration
export interface TrainingEditField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'image' | 'image-array' | 'array';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  contentType?: 'training';
  maxImages?: number;
}

// Training Form Data (for create/edit)
export interface TrainingFormData {
  name: string;
  description: string;
  duration: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  image?: string;
  images?: string[];
  topics?: string[];
  nextSessionDate?: string;
  certificationOffered: boolean;
  instructorName?: string;
  instructorTitle?: string;
  instructorImage?: string;
}

// Training Initial Data
export interface TrainingInitialData {
  level: 'beginner' | 'intermediate' | 'advanced';
  certificationOffered: boolean;
  price: number;
}