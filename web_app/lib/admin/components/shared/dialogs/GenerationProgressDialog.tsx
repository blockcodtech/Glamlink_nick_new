"use client";

import React from 'react';
import { GenerationStep, GenerationProgressDialogProps } from '@/lib/admin/types';

export default function GenerationProgressDialog({
  isOpen,
  steps,
  currentStep,
  onClose,
  allowClose = false
}: GenerationProgressDialogProps) {
  if (!isOpen) return null;

  const completedCount = steps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedCount / steps.length) * 100;

  const getStepIcon = (status: GenerationStep['status']) => {
    switch (status) {
      case 'pending':
        return (
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100" />
        );
      case 'processing':
        return (
          <div className="w-6 h-6 rounded-full border-2 border-glamlink-teal bg-glamlink-teal/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-glamlink-teal animate-pulse" />
          </div>
        );
      case 'completed':
        return (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
    }
  };

  const getStepTextColor = (status: GenerationStep['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500';
      case 'processing':
        return 'text-glamlink-teal font-medium';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Generating Your Brand Content</h2>
            {allowClose && onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-glamlink-teal h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedCount} of {steps.length} steps completed
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${getStepTextColor(step.status)}`}>
                    {step.label}
                  </p>
                  {step.status === 'processing' && currentStep === step.id && (
                    <div className="mt-1 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-glamlink-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-glamlink-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-glamlink-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-gray-500">Processing...</span>
                    </div>
                  )}
                  {step.error && (
                    <p className="mt-1 text-xs text-red-600">{step.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          {completedCount === steps.length ? (
            <div className="text-center">
              <div className="flex items-center justify-center text-green-600 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">All content generated successfully!</p>
              <p className="text-xs text-gray-500 mt-1">Preparing your preview...</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Please wait while we create your brand content. This may take a few minutes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}