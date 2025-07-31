import { useState } from 'react';
import { Brand } from '@/lib/pages/brand/types';
import imageGeneratorService from '@/lib/services/ai/imageGeneratorService';
import { ImageType, ImageGeneratorConfig } from '../types';

export const imageGeneratorConfig: ImageGeneratorConfig = {
  'product-main': {
    title: 'Generate Product Images',
    description: 'AI will create professional product photography for your listings.',
    defaultCount: 3,
    maxCount: 10,
  },
  'product-gallery': {
    title: 'Generate Product Gallery Images',
    description: 'AI will create multiple product images for your gallery.',
    defaultCount: 5,
    maxCount: 10,
  },
  'provider-profile': {
    title: 'Generate Provider Headshots',
    description: 'AI will create professional headshots for your providers.',
    defaultCount: 3,
    maxCount: 10,
  },
  'provider-portfolio': {
    title: 'Generate Provider Portfolio',
    description: 'AI will create portfolio images showcasing provider work.',
    defaultCount: 4,
    maxCount: 10,
  },
  'beforeafter': {
    title: 'Generate Before/After Images',
    description: 'AI will create transformation images for your showcases.',
    defaultCount: 4,
    maxCount: 10,
  },
  'training': {
    title: 'Generate Training Images',
    description: 'AI will create images for your training programs.',
    defaultCount: 2,
    maxCount: 5,
  },
  'review': {
    title: 'Generate Review Images',
    description: 'AI will create images for customer reviews.',
    defaultCount: 2,
    maxCount: 5,
  },
};

export const useImageGenerator = (type: ImageType, brand: Brand | null, itemContext?: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [error, setError] = useState('');
  const [count, setCount] = useState(imageGeneratorConfig[type].defaultCount);
  const [prompt, setPrompt] = useState('');

  const config = imageGeneratorConfig[type];

  const handleGenerate = async () => {
    if (!brand) {
      setError('Brand information is required');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImages([]);
    
    try {
      const context = {
        brandName: brand.name,
        brandTagline: brand.tagline,
        brandMission: brand.mission,
        ...itemContext,
      };

      // Map ImageType to service content types
      const getContentType = () => {
        if (type.startsWith('product')) return 'product';
        if (type.startsWith('provider')) return 'provider';
        if (type === 'training') return 'training';
        if (type === 'beforeafter') return 'beforeafter';
        if (type === 'review') return 'review';
        return 'product'; // default
      };

      const getImageType = () => {
        if (type === 'product-main' || type === 'provider-profile') return 'main';
        if (type === 'product-gallery' || type === 'provider-portfolio') return 'additional';
        if (type === 'beforeafter') return 'before'; // or could be 'after'
        return 'main';
      };

      const images = await imageGeneratorService.generateImages({
        contentType: getContentType(),
        imageType: getImageType(),
        quantity: count,
        context,
        customPrompt: prompt,
      });
      
      if (images.length === 0) {
        throw new Error('No images were generated. Please try again.');
      }
      
      // Extract URLs from generated images
      const imageUrls = images.map(img => img.url);
      setGeneratedImages(imageUrls);
      // Select all by default
      setSelectedImages(new Set(imageUrls.map((_, index) => index)));
    } catch (error) {
      // Error generating images
      setError(error instanceof Error ? error.message : 'Failed to generate images. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleImageSelection = (index: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedImages(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedImages.size === generatedImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(generatedImages.map((_, index) => index)));
    }
  };

  const getSelectedImages = () => {
    return generatedImages.filter((_, index) => selectedImages.has(index));
  };

  const reset = () => {
    setGeneratedImages([]);
    setSelectedImages(new Set());
    setError('');
    setCount(config.defaultCount);
    setPrompt('');
  };

  return {
    // State
    isGenerating,
    generatedImages,
    selectedImages,
    error,
    count,
    prompt,
    config,
    
    // Actions
    setCount,
    setPrompt,
    handleGenerate,
    toggleImageSelection,
    toggleSelectAll,
    getSelectedImages,
    reset,
  };
};