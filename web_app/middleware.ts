import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultPageVisibility, alwaysVisiblePages, PageConfig } from './lib/config/pageVisibility';

async function getPageVisibilitySettings(request: NextRequest): Promise<PageConfig[]> {
  // Use the request's origin for server-side API calls
  const origin = request.nextUrl.origin;
  const apiUrl = `${origin}/api/settings/page-visibility`;
  
  try {
    // Always fetch fresh settings from API (no caching)
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      // Add a timeout to prevent hanging
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      const text = await response.text();
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        return defaultPageVisibility;
      }
      
      if (data.success && data.settings) {
        return data.settings;
      }
    }
  } catch (error) {
    // Error fetching settings, fall back to defaults
  }

  return defaultPageVisibility;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  
  // Skip visibility check for API routes
  if (url.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Skip static assets (images, fonts, etc.)
  if (url.startsWith('/images/') || 
      url.startsWith('/fonts/') || 
      url.startsWith('/_next/') ||
      url.endsWith('.png') || 
      url.endsWith('.jpg') || 
      url.endsWith('.jpeg') || 
      url.endsWith('.gif') || 
      url.endsWith('.webp') ||
      url.endsWith('.svg') ||
      url.endsWith('.ico') ||
      url.endsWith('.css') ||
      url.endsWith('.js') ||
      url.endsWith('.map')) {
    return NextResponse.next();
  }
  
  // Check page visibility settings
  const isAlwaysVisible = alwaysVisiblePages.some(page => 
    url === page || url.startsWith(page + '/')
  );
  
  if (!isAlwaysVisible) {
    // Get visibility settings from API
    const settings = await getPageVisibilitySettings(request);
    
    // Check if current page should be hidden
    const pageConfig = settings.find(page => page.path === url);
    
    // If page is not in settings, default to hidden
    if (!pageConfig) {
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
    
    // If page is in settings but not visible
    if (!pageConfig.isVisible) {
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};