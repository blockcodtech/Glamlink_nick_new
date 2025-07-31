"use client";

import React, { useState } from 'react';
import { useUserBrand } from '../../hooks/auth/useUserBrand';
import { useBrandData } from '../../hooks/brand/useBrandData';
import { useBrainstormIdeas } from '../../hooks/ideas/useBrainstormIdeas';
import { useTopicResearch } from '../../hooks/ideas/useTopicResearch';
import BrainstormModal from '../shared/modals/BrainstormModal';
import ResearchSection from './ResearchSection';
import IdeasSection from './IdeasSection';

export default function IdeasResearchTab() {
  const { brandId } = useUserBrand();
  const { brand, isLoading, refetch } = useBrandData(brandId);
  const { generateIdeas, deleteIdea, isGenerating } = useBrainstormIdeas();
  const { researchTopic, isResearching } = useTopicResearch(brand);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const handleGenerateIdeas = async (options: any) => {
    const newIdeas = await generateIdeas(options);
    if (newIdeas.length > 0) {
      await refetch(); // Refresh brand data to show new ideas
      setShowGenerateModal(false);
    }
  };

  const handleDeleteIdea = async (ideaId: string) => {
    const success = await deleteIdea(ideaId);
    if (success) {
      await refetch(); // Refresh brand data
    }
  };

  const handleResearch = async (topic: string): Promise<void> => {
    await researchTopic(topic);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glamlink-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Research Section */}
      <ResearchSection 
        onResearch={handleResearch}
        isResearching={isResearching}
      />

      {/* Ideas Section */}
      <IdeasSection
        ideas={brand?.brainstormIdeas || []}
        onGenerateClick={() => setShowGenerateModal(true)}
        onDeleteIdea={handleDeleteIdea}
      />

      {/* Generate Modal */}
      {showGenerateModal && (
        <BrainstormModal
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerateIdeas}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}