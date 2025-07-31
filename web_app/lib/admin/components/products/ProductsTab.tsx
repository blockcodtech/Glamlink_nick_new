"use client";

import { useState, useEffect } from "react";
import { Product } from '@/lib/pages/brand/types';
import firebaseProductService from '../../server/firebaseProductService';
import { useBrandStore } from '../../hooks/useBrandStore';
import EnhancedAIGeneratorModal from '../shared/modals/EnhancedAIGeneratorModal';
import EditModal from '../shared/modals/EditModal';
import ProductsList from './ProductsList';
import CreateProductModal from './CreateProductModal';
import { productEditFields } from './config';

export default function ProductsTab() {
  // Use Redux store for brand data
  const { brand, brandId, isLoading, refreshBrand } = useBrandStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Get products from brand data
  const products = brand?.products || [];
  
  // Refresh brand data when component mounts
  useEffect(() => {
    if (brandId && !brand) {
      refreshBrand();
    }
  }, [brandId, brand, refreshBrand]);
  
  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      await firebaseProductService.removeProduct(brandId, productId);
      // Refresh the brand data from Redux
      await refreshBrand();
    } catch (error) {
      // Error deleting product
      alert("Failed to delete product");
    }
  };
  
  const handleAIGenerate = async (generatedProducts: Product[]) => {
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      for (const product of generatedProducts) {
        await firebaseProductService.addProduct(brandId, product);
      }
      
      // Refresh the brand data from Redux
      await refreshBrand();
      alert(`Successfully added ${generatedProducts.length} products!`);
    } catch (error) {
      // Error saving generated products
      alert("Failed to save generated products");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!brandId || !editingProduct) return;

    try {
      // Clean up the data - remove originalPrice if it's empty or undefined
      const cleanedData = { ...updatedData };
      if (!cleanedData.originalPrice || cleanedData.originalPrice === '') {
        delete cleanedData.originalPrice;
      }
      
      await firebaseProductService.updateProduct(
        brandId,
        editingProduct.id,
        cleanedData
      );
      
      // Refresh the brand data from Redux
      await refreshBrand();
      setEditingProduct(null);
      alert("Product updated successfully!");
    } catch (error) {
      // Error updating product
      throw new Error("Failed to update product");
    }
  };

  const handleCreateProduct = async (productData: any) => {
    if (!brandId) return;

    try {
      // Clean up the data - remove originalPrice if it's empty
      const cleanedData = { ...productData };
      if (!cleanedData.originalPrice || cleanedData.originalPrice === '') {
        delete cleanedData.originalPrice;
      }

      const newProduct: Product = {
        id: `prod_${Date.now()}`,
        ...cleanedData,
        image: cleanedData.image || 'https://source.unsplash.com/300x300/?beauty,product',
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        inStock: cleanedData.inStock !== undefined ? cleanedData.inStock : true,
        isSpotlight: cleanedData.isSpotlight || false
      };

      await firebaseProductService.addProduct(brandId, newProduct);
      // Refresh the brand data from Redux
      await refreshBrand();
      alert("Product created successfully!");
    } catch (error) {
      // Error creating product
      throw new Error("Failed to create product");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Products Management</h2>
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
            Add New Product
          </button>
        </div>
      </div>
      
      <ProductsList
        products={products}
        isLoading={isLoading}
        hasBrand={!!brandId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* AI Generator Modal */}
      {brandId && (
        <EnhancedAIGeneratorModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          type="products"
          brandId={brandId}
          onGenerate={handleAIGenerate}
        />
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveEdit}
          title="Edit Product"
          fields={productEditFields}
          initialData={editingProduct}
          contentId={editingProduct.id}
        />
      )}

      {/* Create Modal */}
      <CreateProductModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateProduct}
      />
    </div>
  );
}