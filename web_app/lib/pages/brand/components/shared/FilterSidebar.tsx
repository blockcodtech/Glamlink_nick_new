import React from "react";
import { FilterOptions } from "../../types/state";
import { ProductCategory, SkinType } from "@/lib/pages/brand/types";
import { FilterSidebarProps } from "../../types/shared";

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const categories: ProductCategory[] = ['skincare', 'makeup', 'haircare', 'tools', 'supplements', 'treatments'];
  const skinTypes: SkinType[] = ['oily', 'dry', 'combination', 'sensitive', 'normal', 'all'];
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...filters,
      category: value === 'all' ? undefined : value as ProductCategory
    });
  };
  
  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...filters,
      skinType: value === 'all' ? undefined : value as SkinType
    });
  };
  
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all') {
      onFilterChange({
        ...filters,
        priceRange: undefined
      });
    } else {
      const [min, max] = value.split('-').map(Number);
      onFilterChange({
        ...filters,
        priceRange: { min, max }
      });
    }
  };
  
  const handleResetFilters = () => {
    onFilterChange({});
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
        <button
          onClick={handleResetFilters}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Reset
        </button>
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category-filter"
          value={filters.category || 'all'}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Skin Type Filter */}
      <div className="mb-6">
        <label htmlFor="skin-type-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Skin / Hair Type
        </label>
        <select
          id="skin-type-filter"
          value={filters.skinType || 'all'}
          onChange={handleSkinTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Types</option>
          {skinTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Price
        </label>
        <select
          id="price-filter"
          value={
            filters.priceRange 
              ? `${filters.priceRange.min}-${filters.priceRange.max}`
              : 'all'
          }
          onChange={handlePriceRangeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Prices</option>
          <option value="0-25">Under $25</option>
          <option value="25-50">$25 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-999999">Over $100</option>
        </select>
      </div>
    </div>
  );
}