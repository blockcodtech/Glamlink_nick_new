// Auth Configuration and Type Definitions

import { BrandQuestionnaireData } from '@/lib/admin/types';

// Redux State Interface
export interface AuthStateInterface {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;
}

// User type
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  userType?: 'client' | 'professional' | 'admin';
  brandId?: string; // Associated brand for brand owners
  questionnaire?: BrandQuestionnaireData; // User's saved questionnaire data
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
}

// Component Props
export type LoginPageProps = {
  onSuccess?: () => void;
};

// Admin user emails (in production, store this in Firebase)
export const ADMIN_EMAILS = [
  'admin@glamlink.net',
  'test@glamlink.com', // For testing
];

// Super admin email (has access only to settings)
export const SUPER_ADMIN_EMAIL = 'admin@glamlink.net';