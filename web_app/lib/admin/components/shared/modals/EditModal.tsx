"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ImageUploadField from "../../fields/ImageUploadField";
import MultiImageUploadField from "../../fields/MultiImageUploadField";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { EditModalProps, FieldConfig } from '@/lib/admin/types';

export default function EditModal({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  fields, 
  initialData = {},
  contentId,
  headerMessage
}: EditModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleArrayFieldChange = (fieldName: string, index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: [
        ...(prev[fieldName] || []).slice(0, index),
        value,
        ...(prev[fieldName] || []).slice(index + 1)
      ]
    }));
  };

  const addArrayItem = (fieldName: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), '']
    }));
  };

  const removeArrayItem = (fieldName: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: (prev[fieldName] || []).filter((_: any, i: number) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              {title}
            </Dialog.Title>
          </div>

          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {headerMessage}
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  {field.type === 'image' ? (
                    <ImageUploadField
                      value={formData[field.name] || ''}
                      onChange={(url) => handleFieldChange(field.name, url)}
                      label={field.label}
                      required={field.required}
                      brandId={user?.brandId || ''}
                      contentType={field.contentType || 'product'}
                      contentId={contentId}
                      placeholder={field.placeholder}
                      context={{
                        name: formData.name,
                        description: formData.description,
                        category: formData.category,
                        treatmentType: formData.treatmentType,
                        specializations: formData.specializations
                      }}
                    />
                  ) : field.type === 'image-array' ? (
                    <MultiImageUploadField
                      value={formData[field.name] || []}
                      onChange={(images) => handleFieldChange(field.name, images)}
                      label={field.label}
                      required={field.required}
                      brandId={user?.brandId || ''}
                      contentType={field.contentType || 'product'}
                      contentId={contentId}
                      maxImages={field.maxImages}
                      placeholder={field.placeholder}
                      context={{
                        name: formData.name,
                        description: formData.description,
                        category: formData.category,
                        treatmentType: formData.treatmentType,
                        specializations: formData.specializations
                      }}
                    />
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {field.type === 'text' && (
                        <input
                          type="text"
                          value={formData[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )}

                      {field.type === 'date' && (
                        <input
                          type="date"
                          value={formData[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                          required={field.required}
                        />
                      )}

                      {field.type === 'textarea' && (
                        <textarea
                          value={formData[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                          rows={4}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )}

                      {field.type === 'number' && (
                        <input
                          type="number"
                          value={formData[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value ? parseFloat(e.target.value) : undefined)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                          placeholder={field.placeholder}
                          required={field.required}
                          step="0.01"
                        />
                      )}

                      {field.type === 'select' && (
                        <select
                          value={formData[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map((option: { value: string; label: string }) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === 'checkbox' && (
                        <input
                          type="checkbox"
                          checked={formData[field.name] || false}
                          onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                          className="h-4 w-4 text-glamlink-teal focus:ring-glamlink-teal border-gray-300 rounded"
                        />
                      )}

                      {field.type === 'array' && (
                        <div className="space-y-2">
                          {(formData[field.name] || []).map((item: string, index: number) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayFieldChange(field.name, index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                                placeholder={`${field.label} ${index + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => removeArrayItem(field.name, index)}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addArrayItem(field.name)}
                            className="text-sm text-glamlink-teal hover:text-glamlink-teal-dark"
                          >
                            + Add {field.label}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-glamlink-teal text-white rounded-md hover:bg-glamlink-teal-dark disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}