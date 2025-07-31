"use client";

import React from 'react';
import { ProfileFormProps } from '@/lib/admin/types';

export default function ProfileForm({ formData, onInputChange, onSubmit, isSaving }: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            >
              <option value="Beauty">Beauty</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Hair">Hair</option>
              <option value="Wellness">Wellness</option>
            </select>
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tagline *</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={onInputChange}
              required
              placeholder="A short, catchy phrase that represents your brand"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Mission Statement *</label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={onInputChange}
              required
              rows={3}
              placeholder="What is your brand's purpose and goals?"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Brand Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              rows={4}
              placeholder="Tell the story of your brand..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={onInputChange}
              rows={2}
              placeholder="A brief summary of your brand (shown in listings)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Additional Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={onInputChange}
              placeholder="https://example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onInputChange}
              placeholder="City, State/Country"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Theme Color</label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                name="themeColor"
                value={formData.themeColor}
                onChange={onInputChange}
                className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-500">{formData.themeColor}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-glamlink-teal hover:bg-glamlink-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-glamlink-teal disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}