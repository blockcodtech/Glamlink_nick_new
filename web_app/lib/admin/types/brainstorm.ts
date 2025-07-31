// Brainstorm types

import { BrainstormIdea } from '@/lib/pages/brand/types';

export interface IdeaCardProps {
  idea: BrainstormIdea;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export interface IdeaDetailModalProps {
  idea: BrainstormIdea;
  onClose: () => void;
}

export interface IdeasSectionProps {
  ideas: BrainstormIdea[];
  isLoading: boolean;
  onViewIdea: (idea: BrainstormIdea) => void;
  onDeleteIdea: (ideaId: string) => void;
  onGenerateIdeas: () => void;
}

export interface ResearchSectionProps {
  onResearch: (topic: string) => void;
  isResearching: boolean;
  researchResults: ResearchResults | null;
}

export interface ResearchResults {
  topic: string;
  summary: string;
  keyPoints: string[];
  opportunities: string[];
  challenges: string[];
  nextSteps: string[];
  resources: { title: string; url: string; }[];
}