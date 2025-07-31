// Field component types

export interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
  brandId: string;
  contentType: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  contentId?: string;
  placeholder?: string;
  context?: {
    name?: string;
    description?: string;
    category?: string;
    treatmentType?: string;
    specializations?: string[];
  };
}

export interface ImageData {
  url: string;
  alt?: string;
}

export interface MultiImageUploadFieldProps {
  value: ImageData[];
  onChange: (value: ImageData[]) => void;
  label: string;
  required?: boolean;
  brandId: string;
  contentType: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  contentId?: string;
  maxImages?: number;
  placeholder?: string;
  context?: {
    name?: string;
    description?: string;
    category?: string;
    treatmentType?: string;
    specializations?: string[];
  };
}