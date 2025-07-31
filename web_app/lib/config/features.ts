// Feature flags for controlling API usage and costs
export const FEATURE_FLAGS = {
  // OpenAI API - Set to false to use mock data and avoid API costs
  ENABLE_OPENAI_API: false,
  
  // Use mock data when OpenAI is disabled
  USE_MOCK_DATA: true,
  
  // Enable verbose logging for debugging
  DEBUG_MODE: true,
};

// Helper function to check if OpenAI should be used
export const shouldUseOpenAI = () => {
  return FEATURE_FLAGS.ENABLE_OPENAI_API && !!process.env.OPENAI_API_KEY;
};

