import { useState } from 'react';
import { Brand } from '@/lib/pages/brand/types';
import firebaseProfileService from '../../server/firebaseProfileService';

interface UseBrandCreationProps {
  userId: string;
  userEmail?: string;
  userDisplayName?: string;
}

export const useBrandCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBrandForUser = async ({
    userId,
    userEmail,
    userDisplayName
  }: UseBrandCreationProps): Promise<Brand | null> => {
    if (!userId || userEmail === 'admin@glamlink.net') {
      setError('Cannot create brand for admin user');
      return null;
    }
    
    setIsCreating(true);
    setError(null);
    
    try {
      // Create new brand
      const brandId = `brand_${userId}_${Date.now()}`;
      const newBrand: Brand = {
        id: brandId,
        ownerId: userId, // Changed from userId to ownerId
        name: `${userDisplayName || userEmail?.split('@')[0] || 'My'} Beauty Brand`,
        tagline: "Transform Your Beauty Journey",
        mission: "Empowering beauty through innovation and expertise",
        description: "",
        summary: "",
        category: "Beauty",
        themeColor: "#DC2626",
        profileImage: "", // Required field
        isFollowing: false, // Required field
        followerCount: 0, // Required field
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [],
        certifiedProviders: [],
        beforeAfters: [],
        trainingPrograms: [],
        reviews: [],
        brainstormIdeas: []
      };
      
      // Save to Firestore
      await firebaseProfileService.createBrand(brandId, newBrand);
      
      // Update user with brandId - assuming this method exists or we need to create it
      await firebaseProfileService.updateDocument('users', userId, {
        brandId: brandId
      });
      
      return newBrand;
    } catch (err) {
      // Error creating brand
      setError("Error creating brand. Please try again.");
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createBrandForUser,
    isCreating,
    error,
  };
};