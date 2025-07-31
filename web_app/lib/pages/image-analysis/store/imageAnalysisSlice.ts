import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  ImageAnalysisStateInterface, 
  AnalysisType, 
  AnalysisResult,
  AnalysisApiRequest,
  AnalysisApiResponse,
  IMAGE_ANALYSIS_API_ENDPOINT,
  SAVE_ANALYSIS_API_ENDPOINT 
} from "../config";
import { mockAnalysisResult, mockAnalysisHistory } from "../mockData";
import authService from "@/lib/services/firebase/authService";
import storageService from "@/lib/services/firebase/storageService";
import firestoreService from "@/lib/services/firebase/firestoreService";

const initialState: ImageAnalysisStateInterface = {
  imageUri: null,
  imageFile: null,
  prompt: '',
  analysisType: 'comprehensive',
  isLoading: false,
  error: null,
  result: null,
  analysisHistory: []
};

// Convert File to base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
}

export const analyzeImage = createAsyncThunk(
  "imageAnalysis/analyze",
  async ({ file, analysisType, customPrompt }: { 
    file: File; 
    analysisType: AnalysisType; 
    customPrompt?: string 
  }) => {
    try {
      // Convert image to base64
      const imageBase64 = await fileToBase64(file);
      
      // Try API first
      const response = await fetch(IMAGE_ANALYSIS_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          analysisType,
          customPrompt
        } as AnalysisApiRequest)
      });
      
      if (response.ok) {
        const data: AnalysisApiResponse = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      }
      
      // Fallback to mock data
      return mockAnalysisResult;
      
    } catch (error) {
      // Return mock data on error
      return mockAnalysisResult;
    }
  }
);

export const saveAnalysisResult = createAsyncThunk(
  "imageAnalysis/save",
  async ({ imageFile, result, analysisType }: {
    imageFile: File;
    result: AnalysisResult;
    analysisType: AnalysisType;
  }) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Upload image to Firebase Storage
      const analysisId = `analysis_${Date.now()}`;
      const imageUrl = await storageService.uploadAnalysisImage(
        user.uid,
        analysisId,
        imageFile
      );
      
      // Save analysis to Firestore
      await firestoreService.saveAnalysis(
        user.uid,
        imageUrl,
        [analysisType],
        result
      );
      
      return {
        id: analysisId,
        imageUrl,
        analysisType,
        overallScore: result.overall.score,
        createdAt: new Date().toISOString()
      };
      
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAnalysisHistory = createAsyncThunk(
  "imageAnalysis/fetchHistory",
  async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        return mockAnalysisHistory;
      }
      
      const analyses = await firestoreService.getUserAnalyses(user.uid, 10);
      
      if (analyses.length > 0) {
        return analyses.map(analysis => ({
          id: analysis.id,
          imageUrl: analysis.imageUrl,
          analysisType: analysis.analysisType[0] as AnalysisType || 'comprehensive',
          overallScore: analysis.results?.overall?.score || 0,
          createdAt: analysis.createdAt
        }));
      }
      
      return mockAnalysisHistory;
    } catch (error) {
      return mockAnalysisHistory;
    }
  }
);

const imageAnalysisSlice = createSlice({
  name: "imageAnalysis",
  initialState,
  reducers: {
    setImageFile: (state, action: PayloadAction<{ file: File; uri: string }>) => {
      state.imageFile = action.payload.file;
      state.imageUri = action.payload.uri;
      state.result = null;
      state.error = null;
    },
    setAnalysisType: (state, action: PayloadAction<AnalysisType>) => {
      state.analysisType = action.payload;
    },
    setPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
    resetAnalysis: (state) => {
      state.imageUri = null;
      state.imageFile = null;
      state.prompt = '';
      state.result = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Analyze image
      .addCase(analyzeImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(analyzeImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
      })
      .addCase(analyzeImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Analysis failed";
      })
      // Save analysis
      .addCase(saveAnalysisResult.fulfilled, (state, action) => {
        state.analysisHistory.unshift(action.payload);
      })
      // Fetch history
      .addCase(fetchAnalysisHistory.fulfilled, (state, action) => {
        state.analysisHistory = action.payload;
      });
  },
});

export const { 
  setImageFile, 
  setAnalysisType, 
  setPrompt, 
  resetAnalysis, 
  clearError 
} = imageAnalysisSlice.actions;

export default imageAnalysisSlice.reducer;