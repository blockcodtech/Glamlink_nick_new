// Hook types

import { GenerationType } from './modals';

export interface GeneratorConfig {
  products: {
    title: string;
    description: string;
    endpoint: string;
    defaultCount: number;
    maxCount: number;
    placeholder?: string;
  };
  providers: {
    title: string;
    description: string;
    endpoint: string;
    defaultCount: number;
    maxCount: number;
    placeholder?: string;
  };
  training: {
    title: string;
    description: string;
    endpoint: string;
    defaultCount: number;
    maxCount: number;
    placeholder?: string;
  };
  reviews: {
    title: string;
    description: string;
    endpoint: string;
    defaultCount: number;
    maxCount: number;
    placeholder?: string;
  };
  beforeafter: {
    title: string;
    description: string;
    endpoint: string;
    defaultCount: number;
    maxCount: number;
    placeholder?: string;
  };
}

export type ImageType = 'product-main' | 'product-gallery' | 'provider-profile' | 'provider-portfolio' | 'beforeafter' | 'training' | 'review';

export interface ImageGeneratorConfig {
  'product-main': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
  'product-gallery': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
  'provider-profile': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
  'provider-portfolio': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
  'beforeafter': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
  'training': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
  'review': {
    title: string;
    description: string;
    defaultCount: number;
    maxCount: number;
  };
}