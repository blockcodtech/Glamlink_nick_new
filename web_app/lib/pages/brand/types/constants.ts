import { BrandTab } from './components';

// Brand Tabs Configuration
export const BRAND_TABS: BrandTab[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'products', label: 'Products' },
  { id: 'providers', label: 'Certified Providers' },
  { id: 'gallery', label: 'Before & After' },
  { id: 'training', label: 'Training & Certification' },
];

// API Constants
export const BRAND_API_ENDPOINT = "/api/brand";
export const DEFAULT_BRAND_ID = "glamour_beauty_co";