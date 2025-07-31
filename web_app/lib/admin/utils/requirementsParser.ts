import { BrandQuestionnaireData } from '../types';

export interface ParseResult {
  success: boolean;
  data?: BrandQuestionnaireData;
  errors?: string[];
}

export function parseRequirementsFile(content: string): ParseResult {
  const errors: string[] = [];
  const data: BrandQuestionnaireData = {
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

  // Parse line by line
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('#')) {
      continue;
    }

    // Parse key-value pairs
    const match = line.match(/^([a-zA-Z._]+)\s*=\s*(.+)$/);
    if (!match) {
      continue;
    }

    const [, key, value] = match;
    const trimmedValue = value.trim();

    try {
      switch (key) {
        // Brand Overview
        case 'brand.vision':
          data.brandOverview.vision = trimmedValue;
          break;
        case 'brand.target_audience':
          data.brandOverview.targetAudience = trimmedValue;
          break;
        case 'brand.unique_selling_points':
          data.brandOverview.uniqueSellingPoints = parseList(trimmedValue);
          break;
        case 'brand.current_products':
          data.brandOverview.currentProducts = trimmedValue;
          break;
        case 'brand.inspiration':
          data.brandOverview.inspiration = trimmedValue;
          break;

        // Products
        case 'products.description':
          data.products.description = trimmedValue;
          break;
        case 'products.categories':
          data.products.categories = parseList(trimmedValue);
          break;
        case 'products.price_range':
          data.products.priceRange = parsePriceRange(trimmedValue);
          break;
        case 'products.ingredients':
          data.products.ingredients = trimmedValue;
          break;
        case 'products.benefits':
          data.products.benefits = trimmedValue;
          break;

        // Training
        case 'training.goals':
          data.training.goals = trimmedValue;
          break;
        case 'training.target_learners':
          data.training.targetLearners = trimmedValue;
          break;
        case 'training.certification_types':
          data.training.certificationTypes = parseList(trimmedValue);
          break;
        case 'training.duration':
          data.training.duration = trimmedValue;
          break;
        case 'training.price_range':
          data.training.priceRange = parsePriceRange(trimmedValue);
          break;

        // Before/After
        case 'beforeafter.transformation_goals':
          data.beforeAfter.transformationGoals = trimmedValue;
          break;
        case 'beforeafter.treatment_types':
          data.beforeAfter.treatmentTypes = parseList(trimmedValue);
          break;
        case 'beforeafter.expected_duration':
          data.beforeAfter.expectedDuration = trimmedValue;
          break;
        case 'beforeafter.target_concerns':
          data.beforeAfter.targetConcerns = parseList(trimmedValue);
          break;

        // Providers
        case 'providers.specialties_needed':
          data.providers.specialtiesNeeded = parseList(trimmedValue);
          break;
        case 'providers.certification_levels':
          data.providers.certificationLevels = parseList(trimmedValue);
          break;
        case 'providers.location_preferences':
          data.providers.locationPreferences = trimmedValue;
          break;
        case 'providers.experience_level':
          data.providers.experienceLevel = trimmedValue;
          break;
      }
    } catch (error) {
      errors.push(`Error parsing ${key}: ${error}`);
    }
  }

  // Validate required fields
  if (!data.brandOverview.vision) {
    errors.push('Brand vision is required');
  }
  if (!data.brandOverview.targetAudience) {
    errors.push('Target audience is required');
  }
  if (data.brandOverview.uniqueSellingPoints.length === 0) {
    errors.push('At least one unique selling point is required');
  }
  if (!data.products.description) {
    errors.push('Product description is required');
  }
  if (data.products.categories.length === 0) {
    errors.push('At least one product category is required');
  }
  if (!data.training.goals) {
    errors.push('Training goals are required');
  }
  if (!data.training.targetLearners) {
    errors.push('Target learners are required');
  }
  if (data.training.certificationTypes.length === 0) {
    errors.push('At least one certification type is required');
  }
  if (!data.beforeAfter.transformationGoals) {
    errors.push('Transformation goals are required');
  }
  if (data.beforeAfter.treatmentTypes.length === 0) {
    errors.push('At least one treatment type is required');
  }
  if (!data.beforeAfter.expectedDuration) {
    errors.push('Expected duration is required');
  }
  if (data.providers.specialtiesNeeded.length === 0) {
    errors.push('At least one provider specialty is required');
  }
  if (data.providers.certificationLevels.length === 0) {
    errors.push('At least one certification level is required');
  }
  if (!data.providers.locationPreferences) {
    errors.push('Location preferences are required');
  }

  return {
    success: errors.length === 0,
    data: errors.length === 0 ? data : undefined,
    errors: errors.length > 0 ? errors : undefined,
  };
}

function parseList(value: string): string[] {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function parsePriceRange(value: string): { min: number; max: number } {
  const match = value.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) {
    throw new Error('Invalid price range format. Use: min-max');
  }
  
  const min = parseInt(match[1], 10);
  const max = parseInt(match[2], 10);
  
  if (min >= max) {
    throw new Error('Minimum price must be less than maximum price');
  }
  
  return { min, max };
}