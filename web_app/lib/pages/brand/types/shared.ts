import { FilterOptions } from "./state";

// Filter sidebar props
export interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

// Breadcrumb navigation types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

// Share buttons props
export interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

// Back to list button props
export interface BackToListButtonProps {
  label?: string;
}