import { useCallback } from 'react';
import { useProfileStore } from './useProfileStore';
import { BrainstormIdea } from '@/lib/pages/brand/types';

/**
 * Enhanced brainstorm hook that uses the admin profile Redux store
 * Provides all brainstorm-related functionality with centralized state management
 */
export const useAdminBrainstorm = () => {
  const {
    // State
    brand,
    brainstormIdeas,
    selectedIdeaId,
    isGenerating,
    error,
    
    // Actions
    generateIdeas,
    deleteIdea,
    selectIdea,
    getSelectedIdea,
  } = useProfileStore();
  
  // Generate new ideas with options
  const handleGenerateIdeas = useCallback(async (options: {
    count: number;
    category?: string;
  }) => {
    if (!brand) {
      // No brand found
      return [];
    }
    
    const result = await generateIdeas(brand, {
      focus: options.category === 'all' ? undefined : options.category,
      count: options.count
    });
    
    return result.payload || [];
  }, [brand, generateIdeas]);
  
  // Delete an idea
  const handleDeleteIdea = useCallback(async (ideaId: string): Promise<boolean> => {
    if (!brand) {
      // No brand found
      return false;
    }
    
    try {
      await deleteIdea(brand.id, ideaId);
      return true;
    } catch (error) {
      // Failed to delete idea
      return false;
    }
  }, [brand, deleteIdea]);
  
  // Select/view an idea
  const handleSelectIdea = useCallback((ideaId: string | null) => {
    selectIdea(ideaId);
  }, [selectIdea]);
  
  // Get ideas by category
  const getIdeasByCategory = useCallback((category?: string) => {
    if (!category || category === 'all') {
      return brainstormIdeas;
    }
    return brainstormIdeas.filter(idea => idea.category === category);
  }, [brainstormIdeas]);
  
  // Get category counts
  const getCategoryCounts = useCallback(() => {
    const counts: Record<string, number> = {
      all: brainstormIdeas.length,
      'product-development': 0,
      'certifications': 0,
      'marketing': 0,
      'expansion': 0,
      'innovation': 0,
    };
    
    brainstormIdeas.forEach((idea: BrainstormIdea) => {
      if (idea.category && counts[idea.category] !== undefined) {
        counts[idea.category]++;
      }
    });
    
    return counts;
  }, [brainstormIdeas]);
  
  return {
    // State
    ideas: brainstormIdeas,
    selectedIdea: getSelectedIdea(),
    selectedIdeaId,
    isGenerating,
    error,
    
    // Actions
    generateIdeas: handleGenerateIdeas,
    deleteIdea: handleDeleteIdea,
    selectIdea: handleSelectIdea,
    
    // Helpers
    getIdeasByCategory,
    getCategoryCounts,
  };
};