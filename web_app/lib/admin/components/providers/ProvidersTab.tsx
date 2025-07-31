"use client";

import { useState, useEffect } from "react";
import { CertifiedProvider } from '@/lib/pages/brand/types';
import firebaseProviderService from '../../server/firebaseProviderService';
import { useBrandStore } from '../../hooks/useBrandStore';
import EnhancedAIGeneratorModal from '../shared/modals/EnhancedAIGeneratorModal';
import EditModal from '../shared/modals/EditModal';
import ProvidersList from './ProvidersList';
import CreateProviderModal from './CreateProviderModal';
import { providerEditFields } from './config';

export default function ProvidersTab() {
  // Use Redux store for brand data
  const { brand, brandId, isLoading, refreshBrand } = useBrandStore();
  const [showAIModal, setShowAIModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState<CertifiedProvider | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Get providers from brand data
  const providers = brand?.certifiedProviders || [];
  
  // Refresh brand data when component mounts
  useEffect(() => {
    if (brandId && !brand) {
      refreshBrand();
    }
  }, [brandId, brand, refreshBrand]);
  
  const handleAIGenerate = async (generatedProviders: CertifiedProvider[]) => {
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      for (const provider of generatedProviders) {
        await firebaseProviderService.addProvider(brandId, provider);
      }
      
      // Refresh the brand data from Redux
      await refreshBrand();
      alert(`Successfully added ${generatedProviders.length} providers!`);
    } catch (error) {
      // Error saving generated providers
      alert("Failed to save generated providers");
    }
  };

  const handleVerify = async (providerId: string) => {
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      const updatedProvider = providers.find(p => p.id === providerId);
      if (updatedProvider) {
        await firebaseProviderService.updateProvider(
          brandId, 
          providerId, 
          { isVerified: true } as any
        );
        // Refresh the brand data from Redux
        await refreshBrand();
      }
    } catch (error) {
      // Error verifying provider
    }
  };

  const handleEdit = (provider: CertifiedProvider) => {
    setEditingProvider(provider);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!brandId || !editingProvider) return;

    try {
      await firebaseProviderService.updateProvider(
        brandId,
        editingProvider.id,
        updatedData
      );
      
      // Refresh the brand data from Redux
      await refreshBrand();
      setEditingProvider(null);
      alert("Provider updated successfully!");
    } catch (error) {
      // Error updating provider
      throw new Error("Failed to update provider");
    }
  };
  
  const handleDelete = async (providerId: string) => {
    if (!confirm("Are you sure you want to delete this provider?")) return;
    
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      await firebaseProviderService.removeProvider(brandId, providerId);
      // Refresh the brand data from Redux
      await refreshBrand();
    } catch (error) {
      // Error deleting provider
      alert("Failed to delete provider");
    }
  };
  
  const handleCreateProvider = async (providerData: any) => {
    if (!brandId) return;

    try {
      const newProvider: CertifiedProvider = {
        id: `provider_${Date.now()}`,
        ...providerData,
        profileImage: providerData.profileImage || 'https://source.unsplash.com/300x300/?professional,portrait',
        rating: providerData.rating || 5,
        reviewCount: providerData.reviewCount || 0,
        isVerified: providerData.isVerified || false,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      await firebaseProviderService.addProvider(brandId, newProvider);
      // Refresh the brand data from Redux
      await refreshBrand();
      alert("Provider created successfully!");
    } catch (error) {
      // Error creating provider
      throw new Error("Failed to create provider");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Certified Providers</h2>
        <div className="space-x-3">
          <button 
            onClick={() => setShowAIModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 inline-flex items-center"
            disabled={!brandId}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Generate with AI
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-glamlink-teal text-white px-4 py-2 rounded-lg hover:bg-glamlink-teal-dark"
          >
            Add New Provider
          </button>
        </div>
      </div>
      
      <ProvidersList
        providers={providers}
        isLoading={isLoading}
        hasBrand={!!brandId}
        onVerify={handleVerify}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* AI Generator Modal */}
      {brandId && (
        <EnhancedAIGeneratorModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          type="providers"
          brandId={brandId}
          onGenerate={handleAIGenerate}
        />
      )}

      {/* Edit Modal */}
      {editingProvider && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingProvider(null);
          }}
          onSave={handleSaveEdit}
          title="Edit Provider"
          fields={providerEditFields}
          initialData={editingProvider}
          contentId={editingProvider.id}
        />
      )}

      {/* Create Modal */}
      <CreateProviderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateProvider}
      />
    </div>
  );
}