import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  generateBrainstormIdeas,
  deleteBrainstormIdea,
  setErrorMessage,
} from '@/store/slices/profileSlice';

interface GenerateIdeasOptions {
  count: number;
  category: string;
}

export const useBrainstormIdeas = () => {
  const dispatch = useAppDispatch();
  const { brand } = useAppSelector((state) => state.profile);
  
  // Track loading state for brainstorm operations
  const isGenerating = useAppSelector((state) => 
    state.profile.brandLoading || false
  );

  const generateIdeas = useCallback(async (options: GenerateIdeasOptions) => {
    if (!brand) {
      dispatch(setErrorMessage('No brand found'));
      return [];
    }
    
    const result = await dispatch(generateBrainstormIdeas({ brand, options }));
    
    if (generateBrainstormIdeas.fulfilled.match(result)) {
      return result.payload;
    }
    
    return [];
  }, [brand, dispatch]);

  const deleteIdea = useCallback(async (ideaId: string): Promise<boolean> => {
    if (!brand) {
      dispatch(setErrorMessage('No brand found'));
      return false;
    }

    const result = await dispatch(deleteBrainstormIdea({ brand, ideaId }));
    return deleteBrainstormIdea.fulfilled.match(result);
  }, [brand, dispatch]);

  return {
    generateIdeas,
    deleteIdea,
    isGenerating,
    error: null, // Error is now managed in Redux state
  };
};