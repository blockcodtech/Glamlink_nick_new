// Page visibility configuration
export interface PageConfig {
  path: string;
  name: string;
  description: string;
  isVisible: boolean;
}

// Default page visibility settings
export const defaultPageVisibility: PageConfig[] = [
  {
    path: '/about',
    name: 'About',
    description: 'Company information, mission, and values',
    isVisible: false // Hidden by default
  },
  {
    path: '/blog',
    name: 'Blog',
    description: 'Beauty insights and industry news',
    isVisible: false
  },
  {
    path: '/faqs',
    name: 'FAQs',
    description: 'Frequently asked questions',
    isVisible: false
  },
  {
    path: '/for-clients',
    name: 'For Clients',
    description: 'Information for beauty service clients',
    isVisible: false
  },
  {
    path: '/for-professionals',
    name: 'For Professionals',
    description: 'Resources for beauty professionals',
    isVisible: false
  },
  {
    path: '/beautician-near-me',
    name: 'Beautician Near Me',
    description: 'Location-based beautician search',
    isVisible: false
  },
  {
    path: '/terms',
    name: 'Terms of Service',
    description: 'Legal terms and conditions',
    isVisible: false
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    description: 'Privacy and data protection policy',
    isVisible: false
  }
];

// Pages that should always be accessible
export const alwaysVisiblePages = [
  '/',
  '/login',
  '/signup',
  '/admin',
  '/brand',
  '/profile',
  '/image-analysis',
  '/content-settings',
  '/api'
];