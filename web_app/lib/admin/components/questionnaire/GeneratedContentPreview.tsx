"use client";

import React, { useState } from 'react';
import { Product, CertifiedProvider, TrainingProgram, BeforeAfter } from '@/lib/pages/brand/types';
import ContentEditModal from './ContentEditModal';

interface GeneratedContentPreviewProps {
  products: Product[];
  providers: CertifiedProvider[];
  trainingPrograms: TrainingProgram[];
  beforeAfters: BeforeAfter[];
  onAccept: () => void;
  onRegenerate: (contentType: 'products' | 'providers' | 'training' | 'beforeAfter', feedback: string) => Promise<void>;
  isRegenerating: boolean;
}

export default function GeneratedContentPreview({
  products,
  providers,
  trainingPrograms,
  beforeAfters,
  onAccept,
  onRegenerate,
  isRegenerating
}: GeneratedContentPreviewProps) {
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    contentType: 'products' | 'providers' | 'training' | 'beforeAfter' | null;
    title: string;
  }>({
    isOpen: false,
    contentType: null,
    title: ''
  });

  const handleEdit = (contentType: 'products' | 'providers' | 'training' | 'beforeAfter', title: string) => {
    setEditModal({
      isOpen: true,
      contentType,
      title
    });
  };

  const handleRegenerateSubmit = async (feedback: string) => {
    if (editModal.contentType) {
      await onRegenerate(editModal.contentType, feedback);
      setEditModal({ isOpen: false, contentType: null, title: '' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Generated Content is Ready! 🎉</h2>
        <p className="text-gray-600">
          Review the generated content below. You can edit any section if needed, or accept everything to add it to your brand.
        </p>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({products.length})
          </h3>
          <button
            onClick={() => handleEdit('products', 'Products')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Edit Section
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
              <p className="text-sm text-gray-600 capitalize">{product.category}</p>
              <p className="text-lg font-semibold text-purple-600">${product.price}</p>
            </div>
          ))}
        </div>
        {products.length > 6 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            And {products.length - 6} more products...
          </p>
        )}
      </div>

      {/* Training Programs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Training Programs ({trainingPrograms.length})
          </h3>
          <button
            onClick={() => handleEdit('training', 'Training Programs')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Edit Section
          </button>
        </div>
        <div className="space-y-4">
          {trainingPrograms.map((program) => (
            <div key={program.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{program.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-500">Duration: {program.duration}</span>
                    <span className="text-gray-500">Level: {program.level}</span>
                    {program.price && (
                      <span className="text-purple-600 font-medium">${program.price}</span>
                    )}
                  </div>
                </div>
                {program.certificationOffered && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Certification
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Transformations ({beforeAfters.length})
          </h3>
          <button
            onClick={() => handleEdit('beforeAfter', 'Transformations')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Edit Section
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beforeAfters.slice(0, 4).map((transformation) => (
            <div key={transformation.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Before</p>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {transformation.beforeImage && (
                      <img
                        src={transformation.beforeImage}
                        alt={transformation.beforeImageAlt || 'Before'}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">After</p>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {transformation.afterImage && (
                      <img
                        src={transformation.afterImage}
                        alt={transformation.afterImageAlt || 'After'}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-gray-900">{transformation.treatmentType}</h4>
              <p className="text-sm text-gray-600">Duration: {transformation.duration}</p>
            </div>
          ))}
        </div>
        {beforeAfters.length > 4 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            And {beforeAfters.length - 4} more transformations...
          </p>
        )}
      </div>

      {/* Providers Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Certified Providers ({providers.length})
          </h3>
          <button
            onClick={() => handleEdit('providers', 'Providers')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Edit Section
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.slice(0, 6).map((provider) => (
            <div key={provider.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                  {provider.profileImage && (
                    <img
                      src={provider.profileImage}
                      alt={provider.imageAlt || provider.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{provider.name}</h4>
                  <p className="text-xs text-gray-600">{provider.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{provider.specialty}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded capitalize ${
                  provider.certificationLevel === 'platinum' ? 'bg-purple-100 text-purple-700' :
                  provider.certificationLevel === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                  provider.certificationLevel === 'silver' ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {provider.certificationLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
        {providers.length > 6 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            And {providers.length - 6} more providers...
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onAccept}
          disabled={isRegenerating}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
        >
          Accept & Add to My Brand
        </button>
      </div>

      {/* Edit Modal */}
      <ContentEditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, contentType: null, title: '' })}
        onSubmit={handleRegenerateSubmit}
        title={`Edit ${editModal.title}`}
        isSubmitting={isRegenerating}
      />
    </div>
  );
}