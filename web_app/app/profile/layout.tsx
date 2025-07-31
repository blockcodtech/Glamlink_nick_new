"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import Link from "next/link";

interface ProfileLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  icon: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Get Started",
    href: "/profile",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  },
  {
    label: "Dashboard",
    href: "/profile/dashboard",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  },
  {
    label: "Brand",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    children: [
      { label: "Brand Profile", href: "/profile/brand", icon: "" },
      { label: "Products", href: "/profile/brand/products", icon: "" },
      { label: "Providers", href: "/profile/brand/providers", icon: "" },
      { label: "Training", href: "/profile/brand/training", icon: "" },
      { label: "Reviews", href: "/profile/brand/reviews", icon: "" },
      { label: "Brainstorm", href: "/profile/brand/brainstorm", icon: "" },
    ]
  },
];

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hasUser = !!user?.email;

  // Redirect admin to admin page
  useEffect(() => {
    if (!isLoading && hasUser && user?.email === 'admin@glamlink.net') {
      router.push("/admin");
    }
  }, [isLoading, hasUser, user, router]);

  // Auto-expand parent items based on current path
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          child.href && pathname.startsWith(child.href)
        );
        if (hasActiveChild && !expandedItems.includes(item.label)) {
          setExpandedItems(prev => [...prev, item.label]);
        }
      }
    });
  }, [pathname]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    if (href === "/profile") return pathname === href;
    if (href === "/profile/brand") return pathname === href; // Exact match for brand profile
    return pathname.startsWith(href);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-8">
            You must be logged in to access your profile.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Go to Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to get current page title
  const getCurrentPageTitle = () => {
    const currentNav = navItems.find(item => {
      if (item.href === pathname) return true;
      if (item.children) {
        return item.children.some(child => child.href === pathname);
      }
      return false;
    });

    if (currentNav?.href === pathname) {
      return currentNav.label;
    }

    // Check children
    for (const item of navItems) {
      if (item.children) {
        const child = item.children.find(c => c.href === pathname);
        if (child) return child.label;
      }
    }

    return 'Profile';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {getCurrentPageTitle()}
          </h1>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm
          transform transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="h-full overflow-y-auto">
            {/* Mobile close button */}
            <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-6">
              {navItems.map((item) => (
                <div key={item.label} className="mb-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm transition-colors rounded-lg ${
                        isActiveRoute(item.href)
                          ? 'bg-glamlink-teal/10 text-gray-900 font-bold'
                          : 'text-gray-700 hover:bg-gray-100 font-medium'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors rounded-lg ${
                          expandedItems.includes(item.label) || navItems.find(n => n.label === item.label)?.children?.some(c => isActiveRoute(c.href))
                            ? 'bg-glamlink-teal/10 text-gray-900 font-bold'
                            : 'text-gray-700 hover:bg-gray-100 font-medium'
                        }`}
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                          {item.label}
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            expandedItems.includes(item.label) ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedItems.includes(item.label) && item.children && (
                        <div className="mt-2 ml-8">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href || '#'}
                              className={`block px-4 py-2 text-sm transition-colors rounded-lg mb-1 ${
                                isActiveRoute(child.href)
                                  ? 'bg-glamlink-teal/10 text-gray-900 font-bold'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                              onClick={() => setIsSidebarOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Settings at bottom */}
            <div className="mt-8 pt-8 border-t border-gray-200 px-4">
              <Link
                href="/profile/settings"
                className={`flex items-center px-4 py-3 text-sm transition-colors rounded-lg ${
                  isActiveRoute('/profile/settings')
                    ? 'bg-glamlink-teal/10 text-gray-900 font-bold'
                    : 'text-gray-700 hover:bg-gray-100 font-medium'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:pt-0 pt-32">
          {children}
        </main>
      </div>
    </div>
  );
}