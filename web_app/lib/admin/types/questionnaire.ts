// Questionnaire types

// Brand Setup Wizard Questionnaire
export interface QuestionnaireData {
  brandName: string;
  brandDescription: string;
  brandMission: string;
  targetMarket: string;
  productTypes: string[];
  priceRange: string;
  brandStyle: string[];
  uniqueSellingPoints: string[];
  customerReviews: string[];
  businessGoals: string[];
  existingProducts?: string[];
  productCount?: number;
  certificationTypes?: string[];
  providerSpecialties?: string[];
  providerCount?: number;
  contentToGenerate?: string[];
}

export interface QuestionnaireWizardProps {
  brandId: string;
  onComplete: () => void;
}

export interface GeneratedContentPreviewProps {
  content: ContentState;
  loading: boolean;
  onEdit: (section: keyof ContentState, index: number) => void;
  onRemove: (section: keyof ContentState, index: number) => void;
  onGenerate: () => void;
}

export interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: keyof ContentState;
  item: any;
  index: number;
  onSave: (updatedItem: any) => void;
}

export type ContentState = {
  products: any[];
  providers: any[];
  beforeAfters: any[];
  trainingPrograms: any[];
  reviews: any[];
};

// Brand Creation Questionnaire (different system)
export interface BrandQuestionnaireData {
  brandOverview: {
    vision: string;
    targetAudience: string;
    uniqueSellingPoints: string[];
    currentProducts?: string;
    inspiration?: string;
  };
  products: {
    description: string;
    images: string[];
    categories: string[];
    priceRange: { min: number; max: number };
    ingredients?: string;
    benefits?: string;
  };
  training: {
    goals: string;
    targetLearners: string;
    certificationTypes: string[];
    duration?: string;
    priceRange?: { min: number; max: number };
  };
  beforeAfter: {
    transformationGoals: string;
    treatmentTypes: string[];
    expectedDuration: string;
    targetConcerns?: string[];
  };
  providers: {
    specialtiesNeeded: string[];
    certificationLevels: string[];
    locationPreferences: string;
    experienceLevel?: string;
  };
}

export interface BrandQuestionnaireWizardProps {
  brandId: string;
  brandName: string;
  onComplete: (data: BrandQuestionnaireData) => void;
  onSaveProgress?: (data: BrandQuestionnaireData) => void;
  initialData?: any;
}

// Questionnaire Step Props
export interface BrandOverviewStepProps {
  data: BrandQuestionnaireData['brandOverview'];
  onChange: (data: BrandQuestionnaireData['brandOverview']) => void;
  onNext: () => void;
  onBack?: () => void;
}

export interface ProductsQuestionnaireStepProps {
  brandId: string;
  data: BrandQuestionnaireData['products'];
  onChange: (data: BrandQuestionnaireData['products']) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface TrainingQuestionnaireStepProps {
  data: BrandQuestionnaireData['training'];
  onChange: (data: BrandQuestionnaireData['training']) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface BeforeAfterQuestionnaireStepProps {
  data: BrandQuestionnaireData['beforeAfter'];
  onChange: (data: BrandQuestionnaireData['beforeAfter']) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface ProvidersQuestionnaireStepProps {
  data: BrandQuestionnaireData['providers'];
  onChange: (data: BrandQuestionnaireData['providers']) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface ReviewAndGenerateStepProps {
  data: BrandQuestionnaireData;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating?: boolean;
}

// Step component props
export interface WelcomeStepProps {
  onNext: () => void;
}

export interface BrandBasicsStepProps {
  formData: QuestionnaireData;
  setFormData: (data: QuestionnaireData) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface ProductDetailsStepProps {
  formData: QuestionnaireData;
  setFormData: (data: QuestionnaireData) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface TeamCertificationsStepProps {
  formData: QuestionnaireData;
  setFormData: (data: QuestionnaireData) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface ReviewGoalsStepProps {
  formData: QuestionnaireData;
  setFormData: (data: QuestionnaireData) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface ContentSelectionStepProps {
  formData: QuestionnaireData;
  setFormData: (data: QuestionnaireData) => void;
  onNext: () => void;
  onBack: () => void;
}