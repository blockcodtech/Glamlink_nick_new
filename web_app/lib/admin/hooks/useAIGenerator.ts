import { useState, useEffect } from 'react';
import { Product, CertifiedProvider, TrainingProgram, Review, BeforeAfter } from '@/lib/pages/brand/types';
import { GenerationType, GeneratorConfig } from '@/lib/admin/types';

export const generatorConfig: GeneratorConfig = {
  products: {
    title: 'Generate Products with AI',
    description: 'AI will create professional product listings based on your brand profile.',
    endpoint: '/api/ai/generate-products',
    defaultCount: 3,
    maxCount: 10,
  },
  providers: {
    title: 'Generate Providers with AI',
    description: 'AI will create certified provider profiles for your brand.',
    endpoint: '/api/ai/generate-providers',
    defaultCount: 4,
    maxCount: 10,
  },
  training: {
    title: 'Generate Training Programs with AI',
    description: 'AI will create professional training and certification programs.',
    endpoint: '/api/ai/generate-training',
    defaultCount: 2,
    maxCount: 5,
  },
  reviews: {
    title: 'Generate Reviews with AI',
    description: 'AI will create sample reviews for testing purposes.',
    endpoint: '/api/ai/generate-reviews',
    defaultCount: 3,
    maxCount: 10,
  },
  beforeafter: {
    title: 'Generate Before/After Examples',
    description: 'AI will create transformation examples for your gallery.',
    endpoint: '/api/ai/generate-beforeafter',
    defaultCount: 2,
    maxCount: 5,
  },
};

export const useAIGenerator = (type: GenerationType, brandId: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [error, setError] = useState('');
  const [count, setCount] = useState(generatorConfig[type].defaultCount);

  const config = generatorConfig[type];

  useEffect(() => {
    // Select all items by default when generated
    if (generatedItems.length > 0) {
      setSelectedItems(new Set(generatedItems.map((_, index) => index)));
    }
  }, [generatedItems]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setGeneratedItems([]);
    
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandId, count }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }
      
      let items: any[] = [];
      switch (type) {
        case 'products':
          items = data.products || [];
          break;
        case 'providers':
          items = data.providers || [];
          break;
        case 'training':
          items = data.programs || [];
          break;
        case 'reviews':
          items = data.reviews || [];
          break;
        case 'beforeafter':
          items = data.transformations || [];
          break;
      }
      
      if (items.length === 0) {
        throw new Error('No items were generated. Please try again.');
      }
      
      setGeneratedItems(items);
    } catch (error) {
      // Error generating content
      setError(error instanceof Error ? error.message : 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleItemSelection = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === generatedItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(generatedItems.map((_, index) => index)));
    }
  };

  const getSelectedItems = () => {
    return generatedItems.filter((_, index) => selectedItems.has(index));
  };

  const reset = () => {
    setGeneratedItems([]);
    setSelectedItems(new Set());
    setError('');
    setCount(config.defaultCount);
  };

  return {
    // State
    isGenerating,
    generatedItems,
    selectedItems,
    error,
    count,
    config,
    
    // Actions
    setCount,
    handleGenerate,
    toggleItemSelection,
    toggleSelectAll,
    getSelectedItems,
    reset,
  };
};