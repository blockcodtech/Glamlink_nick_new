// ============================================
// ADMIN COMPONENT TYPE DEFINITIONS
// ============================================

// Generic component prop patterns
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Common handler types
export interface CrudHandlers<T> {
  onCreate?: (data: Partial<T>) => Promise<void>;
  onUpdate?: (id: string, data: Partial<T>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (item: T) => void;
}

// List component pattern
export interface BaseListProps<T> extends BaseComponentProps {
  items: T[];
  isLoading: boolean;
  error?: string | null;
}

// Card component pattern
export interface BaseCardProps<T> extends BaseComponentProps {
  item: T;
  onAction?: (action: string, item: T) => void;
}

// Tab component pattern
export interface BaseTabProps extends BaseComponentProps {
  isActive?: boolean;
  onClick?: () => void;
}

// Dialog and progress components
export interface GenerationStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface GenerationProgressDialogProps {
  isOpen: boolean;
  steps: GenerationStep[];
  currentStep: string;
  onClose?: () => void;
  allowClose?: boolean;
}

// Preview components
export interface GeneratorPreviewProps {
  items: any[];
  type: 'products' | 'providers' | 'training' | 'reviews' | 'beforeafter';
  selectedItems: Set<number>;
  onToggleSelection: (index: number) => void;
  onToggleSelectAll: () => void;
}

export interface ImagePreviewProps {
  images: string[];
  selectedImages: Set<number>;
  onToggleSelection: (index: number) => void;
  onToggleSelectAll: () => void;
}