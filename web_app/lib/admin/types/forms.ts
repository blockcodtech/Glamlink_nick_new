// ============================================
// FORM AND FIELD TYPE DEFINITIONS
// ============================================

// Base field configuration
export interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  validation?: FieldValidation;
}

// Field types
export type FieldType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'image'
  | 'image-array'
  | 'array'
  | 'color'
  | 'url';

// Select field options
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Extended field configurations
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: SelectOption[];
  multiple?: boolean;
}

export interface ImageFieldConfig extends BaseFieldConfig {
  type: 'image' | 'image-array';
  contentType: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  maxImages?: number;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
}

export interface ArrayFieldConfig extends BaseFieldConfig {
  type: 'array';
  itemType?: 'text' | 'number';
  maxItems?: number;
  minItems?: number;
}

// Field validation
export interface FieldValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null; // Returns error message or null
}

// Additional field config interface for EditModal
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'array' | 'image' | 'image-array' | 'date';
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  contentType?: 'product' | 'provider' | 'beforeafter' | 'training' | 'review';
  maxImages?: number;
}

// Form configuration - union type
export type ExtendedFieldConfig = 
  | BaseFieldConfig 
  | SelectFieldConfig 
  | ImageFieldConfig 
  | ArrayFieldConfig;

// Form state
export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Form handlers
export interface FormHandlers<T = any> {
  handleChange: (name: string, value: any) => void;
  handleBlur: (name: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  resetForm: () => void;
  validateField: (name: string) => string | null;
  validateForm: () => boolean;
}