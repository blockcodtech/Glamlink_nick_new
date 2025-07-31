import { BrainstormIdea } from '@/lib/pages/brand/types';

export const getCategoryIcon = (category: BrainstormIdea['category']) => {
  const icons = {
    product: '🧴',
    certification: '📜',
    marketing: '📢',
    expansion: '🚀',
    innovation: '💡'
  };
  return icons[category] || '💡';
};

export const getDifficultyColor = (difficulty: BrainstormIdea['difficulty']) => {
  const colors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-800';
};