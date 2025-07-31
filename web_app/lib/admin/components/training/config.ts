import { TrainingEditField } from '@/lib/admin/types';

export const trainingEditFields: TrainingEditField[] = [
  { name: 'name', label: 'Program Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'duration', label: 'Duration', type: 'text', required: true },
  { name: 'price', label: 'Price ($)', type: 'number', required: true },
  { 
    name: 'level', 
    label: 'Level', 
    type: 'select', 
    required: true,
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  },
  { name: 'image', label: 'Main Image', type: 'image', contentType: 'training' },
  { name: 'images', label: 'Additional Images', type: 'image-array', contentType: 'training', maxImages: 5 },
  { name: 'topics', label: 'Topics Covered', type: 'array' },
  { name: 'nextSessionDate', label: 'Next Session Date', type: 'date' },
  { name: 'certificationOffered', label: 'Certification Offered', type: 'checkbox' }
];