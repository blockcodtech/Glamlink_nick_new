"use client";

import { useState } from 'react';

interface ResearchSectionProps {
  onResearch: (topic: string) => Promise<void>;
  isResearching: boolean;
}

interface ResearchResults {
  summary: string;
  keyPoints: string[];
  opportunities: string[];
  nextSteps: string[];
  resources: Array<{
    title: string;
    description: string;
    url?: string;
  }>;
}

export default function ResearchSection({ onResearch, isResearching }: ResearchSectionProps) {
  const [researchTopic, setResearchTopic] = useState('');
  const [researchResults, setResearchResults] = useState<ResearchResults | null>(null);

  const handleResearch = async () => {
    if (!researchTopic.trim()) return;
    
    const response = await fetch('/api/ai/research-topic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: researchTopic }),
    });

    const data = await response.json();
    if (data.success && data.research) {
      setResearchResults(data.research);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Research a Topic</h3>
      <div className="flex space-x-4">
        <input
          type="text"
          value={researchTopic}
          onChange={(e) => setResearchTopic(e.target.value)}
          placeholder="Enter a topic to research (e.g., 'sustainable packaging', 'social media marketing')"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamlink-teal focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
        />
        <button
          onClick={handleResearch}
          disabled={isResearching || !researchTopic.trim()}
          className="px-6 py-2 bg-glamlink-teal text-white rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors disabled:bg-gray-300"
        >
          {isResearching ? 'Researching...' : 'Research'}
        </button>
      </div>

      {researchResults && (
        <div className="mt-6 space-y-4 border-t pt-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
            <p className="text-gray-700">{researchResults.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Points</h4>
              <ul className="list-disc list-inside space-y-1">
                {researchResults.keyPoints?.map((point: string, index: number) => (
                  <li key={index} className="text-gray-700 text-sm">{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Opportunities</h4>
              <ul className="list-disc list-inside space-y-1">
                {researchResults.opportunities?.map((opp: string, index: number) => (
                  <li key={index} className="text-gray-700 text-sm">{opp}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
            <ol className="list-decimal list-inside space-y-1">
              {researchResults.nextSteps?.map((step: string, index: number) => (
                <li key={index} className="text-gray-700 text-sm">{step}</li>
              ))}
            </ol>
          </div>

          {researchResults.resources && researchResults.resources.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Resources</h4>
              <div className="space-y-2">
                {researchResults.resources.map((resource: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <h5 className="font-medium text-gray-900">{resource.title}</h5>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    {resource.url && (
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-glamlink-teal hover:underline">
                        Learn more →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}