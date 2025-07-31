// ============================================
// ADMIN TYPES CENTRAL EXPORT
// ============================================

// Export all training types
export * from './training';

// Export all component types
export * from './components';

// Export all form types
export * from './forms';

// Export all modal types
export * from './modals';

// Export questionnaire types
export * from './questionnaire';

// Export brainstorm types
export * from './brainstorm';

// Export profile types
export * from './profile';

// Export product types
export * from './products';

// Export provider types
export * from './providers';

// Export review types
export * from './reviews';

// Export field component types
export * from './fields';

// Export hook types
export * from './hooks';

// Re-export commonly used types from brand for convenience
export type {
  Brand,
  Product,
  CertifiedProvider,
  TrainingProgram,
  Review,
  BeforeAfter,
  BrandQuestionnaire,
  BrainstormIdea
} from '@/lib/pages/brand/types';