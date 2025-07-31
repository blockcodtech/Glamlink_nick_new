"use client";

import { useState } from 'react';
import { BrainstormIdea } from '@/lib/pages/brand/types';
import IdeaCard from './IdeaCard';
import IdeaDetailModal from './IdeaDetailModal';

interface IdeasSectionProps {
  ideas: BrainstormIdea[];
  onGenerateClick: () => void;
  onDeleteIdea: (ideaId: string) => Promise<void>;
}

const categories = ['product', 'certification', 'marketing', 'expansion', 'innovation'] as const;

export default function IdeasSection({ ideas, onGenerateClick, onDeleteIdea }: IdeasSectionProps) {
  const [filter, setFilter] = useState<'all' | BrainstormIdea['category']>('all');
  const [selectedIdea, setSelectedIdea] = useState<BrainstormIdea | null>(null);

  const filteredIdeas = ideas.filter(idea => 
    filter === 'all' || idea.category === filter
  );

  const handleDeleteIdea = async (e: React.MouseEvent, ideaId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this idea?')) {
      await onDeleteIdea(ideaId);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Brainstorm Ideas</h3>
            <button
              onClick={onGenerateClick}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Ideas with AI</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({ideas.length})
            </button>
            {categories.map(category => {
              const count = ideas.filter(idea => idea.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filter === category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Ideas List */}
        <div className="p-6">
          {filteredIdeas.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No ideas yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate AI-powered ideas to grow your brand
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onClick={() => setSelectedIdea(idea)}
                  onDelete={(e) => handleDeleteIdea(e, idea.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Idea Detail Modal */}
      {selectedIdea && (
        <IdeaDetailModal
          idea={selectedIdea}
          onClose={() => setSelectedIdea(null)}
        />
      )}
    </>
  );
}