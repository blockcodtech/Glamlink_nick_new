import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  fetchQuestionnaire,
  saveQuestionnaire,
} from '@/store/slices/profileSlice';
import { BrandQuestionnaireData } from '../../types';

export const useQuestionnaireData = (userId: string | undefined) => {
  const dispatch = useAppDispatch();
  
  const {
    questionnaire: savedQuestionnaire,
    questionnaireLoading: isLoading,
    questionnaireError: error,
  } = useAppSelector((state) => state.profile);

  // Fetch questionnaire when userId changes
  useEffect(() => {
    if (userId && !savedQuestionnaire) {
      dispatch(fetchQuestionnaire(userId));
    }
  }, [userId, savedQuestionnaire, dispatch]);

  const saveProgress = useCallback(async (data: BrandQuestionnaireData): Promise<boolean> => {
    if (!userId) {
      return false;
    }
    
    const result = await dispatch(saveQuestionnaire({ userId, data }));
    return saveQuestionnaire.fulfilled.match(result);
  }, [userId, dispatch]);

  return {
    savedQuestionnaire,
    isLoading,
    error,
    saveProgress,
  };
};