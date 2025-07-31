import { useState } from 'react';
import { Brand } from '@/lib/pages/brand/types';

interface ResearchResult {
  success: boolean;
  data?: {
    summary: string;
    keyPoints: string[];
    opportunities: string[];
    challenges: string[];
    nextSteps: string[];
    resources: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  };
  error?: string;
}

export const useTopicResearch = (brand: Brand | null) => {
  const [isResearching, setIsResearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const researchTopic = async (topic: string): Promise<ResearchResult | null> => {
    if (!brand || !topic.trim()) {
      setError('No brand or topic provided');
      return null;
    }
    
    setIsResearching(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/research-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          brandName: brand.name,
          brandTagline: brand.tagline,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to research topic');
      }
      
      return data;
    } catch (err) {
      // Error researching topic
      setError(err instanceof Error ? err.message : 'Failed to research topic');
      return null;
    } finally {
      setIsResearching(false);
    }
  };

  return {
    researchTopic,
    isResearching,
    error,
  };
};