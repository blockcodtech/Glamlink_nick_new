"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandNavigationProps, NavItem } from "../../types/core";

export default function BrandNavigation({ 
  brandId, 
  productCount,
  providerCount,
  galleryCount,
  trainingCount,
  reviewCount
}: BrandNavigationProps) {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    { 
      id: 'summary', 
      label: 'Summary', 
      href: `/brand/${brandId}` 
    },
    { 
      id: 'products', 
      label: 'Products', 
      href: `/brand/${brandId}/products`,
      count: productCount
    },
    { 
      id: 'providers', 
      label: 'Certified Providers', 
      href: `/brand/${brandId}/providers`,
      count: providerCount
    },
    { 
      id: 'gallery', 
      label: 'Before & After', 
      href: `/brand/${brandId}/gallery`,
      count: galleryCount
    },
    { 
      id: 'training', 
      label: 'Training & Certification', 
      href: `/brand/${brandId}/training`,
      count: trainingCount
    },
    { 
      id: 'reviews', 
      label: 'Reviews', 
      href: `/brand/${brandId}/reviews`,
      count: reviewCount
    },
  ];
  
  const isActiveRoute = (href: string) => {
    // Exact match for summary (brand root)
    if (href === `/brand/${brandId}`) {
      return pathname === href;
    }
    // For other routes, check if pathname starts with href
    return pathname.startsWith(href);
  };
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex -mb-px overflow-x-auto">
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                  transition-colors duration-200 flex items-center
                  ${isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {item.label}
                {item.count !== undefined && item.count > 0 && (
                  <span className={`
                    ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                    ${isActive 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}