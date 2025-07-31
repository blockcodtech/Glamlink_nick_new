"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BrandQuestionnaireData as QuestionnaireData, BrandQuestionnaireWizardProps as QuestionnaireWizardProps } from '@/lib/admin/types';
import BrandOverviewStep from './steps/BrandOverviewStep';
import ProductsQuestionnaireStep from './steps/ProductsQuestionnaireStep';
import TrainingQuestionnaireStep from './steps/TrainingQuestionnaireStep';
import BeforeAfterQuestionnaireStep from './steps/BeforeAfterQuestionnaireStep';
import ProvidersQuestionnaireStep from './steps/ProvidersQuestionnaireStep';
import ReviewAndGenerateStep from './steps/ReviewAndGenerateStep';

const STEPS = [
  { id: 'brand-overview', title: 'Brand Overview', description: 'Tell us about your brand vision' },
  { id: 'products', title: 'Products', description: 'Describe your product line' },
  { id: 'training', title: 'Training Programs', description: 'Define your educational offerings' },
  { id: 'before-after', title: 'Transformations', description: 'Showcase expected results' },
  { id: 'providers', title: 'Providers', description: 'Specify provider requirements' },
  { id: 'review', title: 'Review & Generate', description: 'Review and generate content' },
];

export default function QuestionnaireWizard({ brandId, brandName, onComplete, onSaveProgress, initialData }: QuestionnaireWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  const [data, setData] = useState<QuestionnaireData>(() => {
    // Use initialData if provided, otherwise use default values
    if (initialData) {
      return {
        brandOverview: {
          vision: initialData.brandOverview?.vision || '',
          targetAudience: initialData.brandOverview?.targetAudience || '',
          uniqueSellingPoints: initialData.brandOverview?.uniqueSellingPoints || [],
          currentProducts: initialData.brandOverview?.currentProducts || '',
          inspiration: initialData.brandOverview?.inspiration || '',
        },
        products: {
          description: initialData.products?.description || '',
          images: initialData.products?.images || [],
          categories: initialData.products?.categories || [],
          priceRange: initialData.products?.priceRange || { min: 20, max: 200 },
          ingredients: initialData.products?.ingredients || '',
          benefits: initialData.products?.benefits || '',
        },
        training: {
          goals: initialData.training?.goals || '',
          targetLearners: initialData.training?.targetLearners || '',
          certificationTypes: initialData.training?.certificationTypes || [],
          duration: initialData.training?.duration || '',
          priceRange: initialData.training?.priceRange || { min: 100, max: 2000 },
        },
        beforeAfter: {
          transformationGoals: initialData.beforeAfter?.transformationGoals || '',
          treatmentTypes: initialData.beforeAfter?.treatmentTypes || [],
          expectedDuration: initialData.beforeAfter?.expectedDuration || '',
          targetConcerns: initialData.beforeAfter?.targetConcerns || [],
        },
        providers: {
          specialtiesNeeded: initialData.providers?.specialtiesNeeded || [],
          certificationLevels: initialData.providers?.certificationLevels || [],
          locationPreferences: initialData.providers?.locationPreferences || '',
          experienceLevel: initialData.providers?.experienceLevel || '',
        },
      };
    }
    
    // Default values if no initialData
    return {
      brandOverview: {
        vision: '',
        targetAudience: '',
        uniqueSellingPoints: [],
        currentProducts: '',
        inspiration: '',
      },
      products: {
        description: '',
        images: [],
        categories: [],
        priceRange: { min: 20, max: 200 },
        ingredients: '',
        benefits: '',
      },
      training: {
        goals: '',
        targetLearners: '',
        certificationTypes: [],
        duration: '',
        priceRange: { min: 100, max: 2000 },
      },
      beforeAfter: {
        transformationGoals: '',
        treatmentTypes: [],
        expectedDuration: '',
        targetConcerns: [],
      },
      providers: {
        specialtiesNeeded: [],
        certificationLevels: [],
        locationPreferences: '',
        experienceLevel: '',
      },
    };
  });

  // Update data when initialData changes
  useEffect(() => {
    if (initialData) {
      setData({
        brandOverview: {
          vision: initialData.brandOverview?.vision || '',
          targetAudience: initialData.brandOverview?.targetAudience || '',
          uniqueSellingPoints: initialData.brandOverview?.uniqueSellingPoints || [],
          currentProducts: initialData.brandOverview?.currentProducts || '',
          inspiration: initialData.brandOverview?.inspiration || '',
        },
        products: {
          description: initialData.products?.description || '',
          images: initialData.products?.images || [],
          categories: initialData.products?.categories || [],
          priceRange: initialData.products?.priceRange || { min: 20, max: 200 },
          ingredients: initialData.products?.ingredients || '',
          benefits: initialData.products?.benefits || '',
        },
        training: {
          goals: initialData.training?.goals || '',
          targetLearners: initialData.training?.targetLearners || '',
          certificationTypes: initialData.training?.certificationTypes || [],
          duration: initialData.training?.duration || '',
          priceRange: initialData.training?.priceRange || { min: 100, max: 2000 },
        },
        beforeAfter: {
          transformationGoals: initialData.beforeAfter?.transformationGoals || '',
          treatmentTypes: initialData.beforeAfter?.treatmentTypes || [],
          expectedDuration: initialData.beforeAfter?.expectedDuration || '',
          targetConcerns: initialData.beforeAfter?.targetConcerns || [],
        },
        providers: {
          specialtiesNeeded: initialData.providers?.specialtiesNeeded || [],
          certificationLevels: initialData.providers?.certificationLevels || [],
          locationPreferences: initialData.providers?.locationPreferences || '',
          experienceLevel: initialData.providers?.experienceLevel || '',
        },
      });
    }
  }, [initialData]);

  const updateData = (section: keyof QuestionnaireData, updates: any) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = () => {
    // Pass the questionnaire data to the parent component
    onComplete(data);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BrandOverviewStep
            data={data.brandOverview}
            onChange={(updates) => updateData('brandOverview', updates)}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ProductsQuestionnaireStep
            data={data.products}
            onChange={(updates) => updateData('products', updates)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <TrainingQuestionnaireStep
            data={data.training}
            onChange={(updates) => updateData('training', updates)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <BeforeAfterQuestionnaireStep
            data={data.beforeAfter}
            onChange={(updates) => updateData('beforeAfter', updates)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <ProvidersQuestionnaireStep
            data={data.providers}
            onChange={(updates) => updateData('providers', updates)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <ReviewAndGenerateStep
            data={data}
            onGenerate={handleGenerate}
            onPrevious={handlePrevious}
            isGenerating={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 ${index < STEPS.length - 1 ? 'pr-4' : ''}`}
            >
              <div className="relative">
                <div
                  className={`h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-glamlink-teal' : 'bg-gray-200'
                  }`}
                />
                <div
                  className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStep
                      ? 'bg-glamlink-teal text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{STEPS[currentStep].title}</h2>
            <p className="text-gray-600 mt-1">{STEPS[currentStep].description}</p>
          </div>
          {onSaveProgress && (
            <button
              onClick={() => onSaveProgress(data)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>Save Progress</span>
            </button>
          )}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {renderStep()}
      </div>
    </div>
  );
}