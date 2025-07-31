import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateBrandProfile } from '@/store/slices/profileSlice';
import firestoreService from '@/lib/services/firebase/firestoreService';

type ContentType = 'products' | 'certifiedProviders' | 'trainingPrograms' | 'reviews' | 'beforeAfters';

export const useContentManagement = (contentType: ContentType) => {
  const dispatch = useAppDispatch();
  const { brand } = useAppSelector((state) => state.profile);

  // Get content array from brand
  const content = brand?.[contentType] || [];

  // Add item to content array
  const addItem = useCallback(async (item: any) => {
    if (!brand) return false;

    try {
      const newItem = {
        ...item,
        id: item.id || `${contentType}_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // Update the brand document with the new item added to the array
      const updatedContent = [...content, newItem];
      await firestoreService.updateDocument('brands', brand.id, {
        [contentType]: updatedContent
      });
      
      // Update Redux state
      dispatch(updateBrandProfile({
        brandId: brand.id,
        updates: {
          [contentType]: updatedContent
        }
      }));

      return true;
    } catch (error) {
      // Error adding item
      return false;
    }
  }, [brand, content, contentType, dispatch]);

  // Update item in content array
  const updateItem = useCallback(async (itemId: string, updates: any) => {
    if (!brand) return false;

    try {
      // Update the specific item in the array
      const updatedContent = content.map(item => 
        item.id === itemId ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
      );
      
      await firestoreService.updateDocument('brands', brand.id, {
        [contentType]: updatedContent
      });
      
      dispatch(updateBrandProfile({
        brandId: brand.id,
        updates: {
          [contentType]: updatedContent
        }
      }));

      return true;
    } catch (error) {
      // Error updating item
      return false;
    }
  }, [brand, content, contentType, dispatch]);

  // Delete item from content array
  const deleteItem = useCallback(async (itemId: string) => {
    if (!brand) return false;

    try {
      // Remove the item from the array
      const updatedContent = content.filter(item => item.id !== itemId);
      
      await firestoreService.updateDocument('brands', brand.id, {
        [contentType]: updatedContent
      });
      
      dispatch(updateBrandProfile({
        brandId: brand.id,
        updates: {
          [contentType]: updatedContent
        }
      }));

      return true;
    } catch (error) {
      // Error deleting item
      return false;
    }
  }, [brand, content, contentType, dispatch]);

  // Add multiple items at once (for AI generation)
  const addMultipleItems = useCallback(async (items: any[]) => {
    if (!brand) return false;

    try {
      const newItems = items.map(item => ({
        ...item,
        id: item.id || `${contentType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      }));

      // Update the brand document with all new items added to the array
      const updatedContent = [...content, ...newItems];
      await firestoreService.updateDocument('brands', brand.id, {
        [contentType]: updatedContent
      });
      
      // Update Redux state
      dispatch(updateBrandProfile({
        brandId: brand.id,
        updates: {
          [contentType]: updatedContent
        }
      }));

      return true;
    } catch (error) {
      // Error adding multiple items
      return false;
    }
  }, [brand, content, contentType, dispatch]);

  return {
    content,
    addItem,
    updateItem,
    deleteItem,
    addMultipleItems,
    isLoading: !brand,
  };
};