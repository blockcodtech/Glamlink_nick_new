import { useState } from 'react';
import { Product, CertifiedProvider, TrainingProgram, BeforeAfter } from '@/lib/pages/brand/types';
import firebaseProfileService from '../../server/firebaseProfileService';
import { GenerationStep } from '../../types';

interface GeneratedContent {
  products: Product[];
  providers: CertifiedProvider[];
  trainingPrograms: TrainingProgram[];
  beforeAfters: BeforeAfter[];
}

interface GenerateContentOptions {
  brandId: string;
  brandName: string;
  userId: string;
  questionnaireData: any;
}

export const useContentGeneration = () => {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('');
  const [showProgressDialog, setShowProgressDialog] = useState(false);

  const updateStepStatus = (stepId: string, status: GenerationStep['status'], error?: string) => {
    setGenerationSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status, error } : step
    ));
  };

  const generateContent = async (options: GenerateContentOptions): Promise<boolean> => {
    // Initialize progress steps
    const steps: GenerationStep[] = [
      { id: 'save-questionnaire', label: 'Saving questionnaire answers', status: 'pending' },
      { id: 'generate-products', label: 'Generating product catalog (12 items)', status: 'pending' },
      { id: 'generate-providers', label: 'Creating certified provider profiles (10 providers)', status: 'pending' },
      { id: 'generate-training', label: 'Designing training programs (4 courses)', status: 'pending' },
      { id: 'generate-transformations', label: 'Creating before/after examples (6 transformations)', status: 'pending' },
      { id: 'generate-reviews', label: 'Generating customer reviews', status: 'pending' },
      { id: 'finalize', label: 'Finalizing your brand content', status: 'pending' }
    ];
    
    setGenerationSteps(steps);
    setShowProgressDialog(true);
    setCurrentStepId('save-questionnaire');
    setIsGenerating(true);
    
    try {
      // Step 1: Save questionnaire
      updateStepStatus('save-questionnaire', 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2-7: Call API
      setCurrentStepId('generate-products');
      updateStepStatus('save-questionnaire', 'completed');
      updateStepStatus('generate-products', 'processing');
      
      const response = await fetch('/api/ai/generate-from-questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });

      const result = await response.json();
      
      if (result.success) {
        // Simulate progress through remaining steps
        const remainingSteps = [
          { id: 'generate-products', delay: 1500 },
          { id: 'generate-providers', delay: 1500 },
          { id: 'generate-training', delay: 1000 },
          { id: 'generate-transformations', delay: 1500 },
          { id: 'generate-reviews', delay: 1000 },
          { id: 'finalize', delay: 500 }
        ];
        
        for (const step of remainingSteps) {
          updateStepStatus(step.id, 'processing');
          setCurrentStepId(step.id);
          await new Promise(resolve => setTimeout(resolve, step.delay));
          updateStepStatus(step.id, 'completed');
        }
        
        setGeneratedContent(result.data);
        return true;
      } else {
        updateStepStatus(currentStepId, 'error', result.error || 'Generation failed');
        return false;
      }
    } catch (error) {
      // Generation error
      updateStepStatus(currentStepId, 'error', 'An unexpected error occurred');
      return false;
    } finally {
      setIsGenerating(false);
      // Keep dialog open for 1 second to show completion
      setTimeout(() => {
        setShowProgressDialog(false);
      }, 1000);
    }
  };

  const regenerateContent = async (
    brandId: string,
    contentType: 'products' | 'providers' | 'training' | 'beforeAfter',
    feedback: string
  ): Promise<boolean> => {
    if (!generatedContent) return false;
    
    setIsRegenerating(true);
    try {
      const currentContent = 
        contentType === 'products' ? generatedContent.products :
        contentType === 'providers' ? generatedContent.providers :
        contentType === 'training' ? generatedContent.trainingPrograms :
        generatedContent.beforeAfters;

      const response = await fetch('/api/ai/update-generated-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId,
          contentType,
          currentContent,
          feedback
        })
      });

      const result = await response.json();
      if (result.success) {
        setGeneratedContent(prev => ({
          ...prev!,
          [contentType === 'products' ? 'products' :
           contentType === 'providers' ? 'providers' :
           contentType === 'training' ? 'trainingPrograms' :
           'beforeAfters']: result.data
        }));
        return true;
      }
      return false;
    } catch (error) {
      // Regeneration error
      return false;
    } finally {
      setIsRegenerating(false);
    }
  };

  const acceptContent = async (brandId: string): Promise<boolean> => {
    if (!generatedContent || !brandId) return false;

    try {
      // Get current brand data
      const brand = await firebaseProfileService.getBrand(brandId);
      if (!brand) return false;

      // Add all generated content to the brand's arrays
      await firebaseProfileService.updateDocument('brands', brandId, {
        products: [...(brand.products || []), ...generatedContent.products],
        certifiedProviders: [...(brand.certifiedProviders || []), ...generatedContent.providers],
        trainingPrograms: [...(brand.trainingPrograms || []), ...generatedContent.trainingPrograms],
        beforeAfters: [...(brand.beforeAfters || []), ...generatedContent.beforeAfters]
      });

      return true;
    } catch (error) {
      // Error saving content
      return false;
    }
  };

  const resetContent = () => {
    setGeneratedContent(null);
    setGenerationSteps([]);
    setCurrentStepId('');
  };

  return {
    generatedContent,
    isGenerating,
    isRegenerating,
    generationSteps,
    currentStepId,
    showProgressDialog,
    generateContent,
    regenerateContent,
    acceptContent,
    resetContent,
    setShowProgressDialog,
  };
};