// ============================================
// MODAL TYPE DEFINITIONS
// ============================================

import { Brand, BrainstormIdea } from '@/lib/pages/brand/types';
import { ImageType } from './hooks';
import { FieldConfig } from './forms';

// Base modal props
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// Edit modal types
export interface EditModalProps extends BaseModalProps {
  onSave: (data: any) => Promise<void>;
  fields: FieldConfig[];
  initialData?: any;
  contentId?: string;
  headerMessage?: React.ReactNode;
}

// Create modal pattern
export interface CreateModalProps<T = any> extends BaseModalProps {
  onSave: (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
}

// Generator types
export type GenerationType = 'products' | 'providers' | 'training' | 'reviews' | 'beforeafter';

// AI Generator modal types
export interface AIGeneratorModalProps extends BaseModalProps {
  type: GenerationType;
  brandId: string;
  onGenerate: (items: any[]) => Promise<void>;
  brandName?: string;
  brandTagline?: string;
  brandMission?: string;
}

// Image generator modal types
export interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ImageType;
  onImagesGenerated: (images: string[]) => void;
  brand: Brand | null;
  itemContext?: any;
}

// Brainstorm modal types
export interface BrainstormModalProps {
  onClose: () => void;
  onGenerate: (options: {
    focus?: BrainstormIdea['category'];
    count: number;
  }) => Promise<void>;
  isGenerating: boolean;
}

// Confirmation modal types
export interface ConfirmModalProps extends BaseModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'danger' | 'warning' | 'info';
}

// Preview modal types
export interface PreviewModalProps<T = any> extends BaseModalProps {
  items: T[];
  onAccept: (selectedItems: T[]) => void;
  itemRenderer?: (item: T) => React.ReactNode;
  selectable?: boolean;
}

// Image preview component
export interface ModalImagePreviewProps {
  images: string[];
  selectedImages: Set<number>;
  onToggleSelection: (index: number) => void;
  onToggleSelectAll: () => void;
}

// Generator preview component
export interface ModalGeneratorPreviewProps {
  items: any[];
  type: GenerationType;
  selectedItems: Set<number>;
  onToggleSelection: (index: number) => void;
  onToggleSelectAll: () => void;
}

// Enhanced AI Generator Modal
export interface EnhancedAIGeneratorModalProps extends BaseModalProps {
  type: GenerationType;
  brandId: string;
  brand: Brand | null;
  onItemsGenerated: (items: any[]) => Promise<void>;
}