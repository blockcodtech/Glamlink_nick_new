import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Brand, BrainstormIdea } from "@/lib/pages/brand/types";
import firestoreService from "@/lib/services/firebase/firestoreService";
import storageService from "@/lib/services/firebase/storageService";
import contentGeneratorService from "@/lib/services/ai/contentGeneratorService";

// Admin Profile state interface
export interface AdminProfileState {
  // Brand data
  brand: Brand | null;
  
  // UI states
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  error: string | null;
  
  // Form states
  profileFormData: Partial<Brand> | null;
  hasUnsavedChanges: boolean;
  
  // Questionnaire state
  questionnaireData: any | null;
  questionnaireProgress: string | null;
  
  // Brainstorm ideas
  brainstormIdeas: BrainstormIdea[];
  selectedIdeaId: string | null;
  
  // Upload states
  uploadingImages: {
    profile: boolean;
    cover: boolean;
  };
  
  // Tab state
  activeTab: string;
}

// Initial state
const initialState: AdminProfileState = {
  brand: null,
  isLoading: false,
  isSaving: false,
  isGenerating: false,
  error: null,
  profileFormData: null,
  hasUnsavedChanges: false,
  questionnaireData: null,
  questionnaireProgress: null,
  brainstormIdeas: [],
  selectedIdeaId: null,
  uploadingImages: {
    profile: false,
    cover: false,
  },
  activeTab: 'overview',
};

// Async thunks
export const fetchBrandProfile = createAsyncThunk(
  "adminProfile/fetchBrand",
  async (brandId: string) => {
    const brand = await firestoreService.getDocument<Brand>('brands', brandId);
    if (!brand) {
      throw new Error('Brand not found');
    }
    return brand;
  }
);

export const updateBrandProfile = createAsyncThunk(
  "adminProfile/updateBrand",
  async ({ brandId, updates }: { brandId: string; updates: Partial<Brand> }) => {
    await firestoreService.updateDocument('brands', brandId, updates);
    return { brandId, updates };
  }
);

export const createBrandForUser = createAsyncThunk(
  "adminProfile/createBrand",
  async ({ userId, email }: { userId: string; email: string }) => {
    const newBrand: Omit<Brand, 'id'> = {
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      tagline: 'Your journey to beauty excellence starts here',
      mission: 'Empowering beauty professionals with premium products and training',
      description: '',
      summary: '',
      category: 'Beauty',
      profileImage: '',
      coverImage: '',
      themeColor: '#00BFA6',
      website: '',
      location: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        youtube: '',
      },
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: userId,
      followerCount: 0,
      isFollowing: false,
      products: [],
      certifiedProviders: [],
      beforeAfters: [],
      trainingPrograms: [],
      reviews: [],
      brainstormIdeas: [],
    };
    
    // Generate a unique brand ID
    const brandId = `brand_${userId}_${Date.now()}`;
    
    await firestoreService.createDocument('brands', brandId, newBrand);
    await firestoreService.updateDocument('users', userId, { brandId });
    
    return { ...newBrand, id: brandId } as Brand;
  }
);

export const uploadBrandImage = createAsyncThunk(
  "adminProfile/uploadImage",
  async ({ 
    brandId, 
    file, 
    imageType 
  }: { 
    brandId: string; 
    file: File; 
    imageType: 'profile' | 'cover' 
  }) => {
    const folder = `brands/${brandId}/${imageType}-images`;
    const imageUrl = await storageService.uploadImage(file, folder);
    
    const updateField = imageType === 'profile' ? 'profileImage' : 'coverImage';
    await firestoreService.updateDocument('brands', brandId, {
      [updateField]: imageUrl
    });
    
    return { imageType, imageUrl };
  }
);

export const saveQuestionnaireData = createAsyncThunk(
  "adminProfile/saveQuestionnaire",
  async ({ brandId, data }: { brandId: string; data: any }) => {
    await firestoreService.updateDocument('brands', brandId, {
      questionnaire: data,
      updatedAt: new Date().toISOString()
    });
    return data;
  }
);

export const generateBrainstormIdeas = createAsyncThunk(
  "adminProfile/generateIdeas",
  async ({ 
    brand, 
    options 
  }: { 
    brand: Brand; 
    options: { focus?: string; count: number } 
  }) => {
    const ideas = await contentGeneratorService.generateBrainstormIdeas(
      {
        brandName: brand.name,
        brandTagline: brand.tagline,
        brandMission: brand.mission,
      },
      options.focus as any,
      options.count
    );
    
    // Save ideas to brand document
    const existingIdeas = brand.brainstormIdeas || [];
    const updatedIdeas = [...existingIdeas, ...ideas];
    
    await firestoreService.updateDocument('brands', brand.id, {
      brainstormIdeas: updatedIdeas
    });
    
    return ideas;
  }
);

export const deleteBrainstormIdea = createAsyncThunk(
  "adminProfile/deleteIdea",
  async ({ brandId, ideaId }: { brandId: string; ideaId: string }) => {
    const brand = await firestoreService.getDocument<Brand>('brands', brandId);
    if (!brand) throw new Error('Brand not found');
    
    const updatedIdeas = brand.brainstormIdeas?.filter(idea => idea.id !== ideaId) || [];
    
    await firestoreService.updateDocument('brands', brandId, {
      brainstormIdeas: updatedIdeas
    });
    
    return ideaId;
  }
);

// Create slice
const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState,
  reducers: {
    // UI state management
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    
    // Form state management
    updateFormData: (state, action: PayloadAction<Partial<Brand>>) => {
      state.profileFormData = {
        ...state.profileFormData,
        ...action.payload
      };
      state.hasUnsavedChanges = true;
    },
    
    resetFormData: (state) => {
      state.profileFormData = null;
      state.hasUnsavedChanges = false;
    },
    
    // Questionnaire state
    setQuestionnaireData: (state, action: PayloadAction<any>) => {
      state.questionnaireData = action.payload;
    },
    
    setQuestionnaireProgress: (state, action: PayloadAction<string | null>) => {
      state.questionnaireProgress = action.payload;
    },
    
    // Brainstorm state
    setSelectedIdea: (state, action: PayloadAction<string | null>) => {
      state.selectedIdeaId = action.payload;
    },
    
    // Error management
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch brand profile
    builder
      .addCase(fetchBrandProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrandProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brand = action.payload;
        state.profileFormData = action.payload;
        state.brainstormIdeas = action.payload.brainstormIdeas || [];
      })
      .addCase(fetchBrandProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch brand profile';
      });
    
    // Update brand profile
    builder
      .addCase(updateBrandProfile.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateBrandProfile.fulfilled, (state, action) => {
        state.isSaving = false;
        state.hasUnsavedChanges = false;
        if (state.brand) {
          state.brand = {
            ...state.brand,
            ...action.payload.updates
          };
        }
      })
      .addCase(updateBrandProfile.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || 'Failed to update brand profile';
      });
    
    // Create brand
    builder
      .addCase(createBrandForUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBrandForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brand = action.payload;
        state.profileFormData = action.payload;
      })
      .addCase(createBrandForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create brand';
      });
    
    // Upload image
    builder
      .addCase(uploadBrandImage.pending, (state, action) => {
        const imageType = action.meta.arg.imageType;
        state.uploadingImages[imageType] = true;
        state.error = null;
      })
      .addCase(uploadBrandImage.fulfilled, (state, action) => {
        const { imageType, imageUrl } = action.payload;
        state.uploadingImages[imageType] = false;
        
        if (state.brand) {
          if (imageType === 'profile') {
            state.brand.profileImage = imageUrl;
          } else {
            state.brand.coverImage = imageUrl;
          }
        }
        
        if (state.profileFormData) {
          if (imageType === 'profile') {
            state.profileFormData.profileImage = imageUrl;
          } else {
            state.profileFormData.coverImage = imageUrl;
          }
        }
      })
      .addCase(uploadBrandImage.rejected, (state, action) => {
        const imageType = action.meta.arg.imageType;
        state.uploadingImages[imageType] = false;
        state.error = action.error.message || 'Failed to upload image';
      });
    
    // Save questionnaire
    builder
      .addCase(saveQuestionnaireData.fulfilled, (state, action) => {
        state.questionnaireData = action.payload;
      });
    
    // Generate brainstorm ideas
    builder
      .addCase(generateBrainstormIdeas.pending, (state) => {
        state.isGenerating = true;
        state.error = null;
      })
      .addCase(generateBrainstormIdeas.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.brainstormIdeas = [...state.brainstormIdeas, ...action.payload];
        if (state.brand) {
          state.brand.brainstormIdeas = [...state.brainstormIdeas];
        }
      })
      .addCase(generateBrainstormIdeas.rejected, (state, action) => {
        state.isGenerating = false;
        state.error = action.error.message || 'Failed to generate ideas';
      });
    
    // Delete brainstorm idea
    builder
      .addCase(deleteBrainstormIdea.fulfilled, (state, action) => {
        state.brainstormIdeas = state.brainstormIdeas.filter(
          idea => idea.id !== action.payload
        );
        if (state.brand) {
          state.brand.brainstormIdeas = state.brainstormIdeas;
        }
      });
  },
});

export const {
  setActiveTab,
  updateFormData,
  resetFormData,
  setQuestionnaireData,
  setQuestionnaireProgress,
  setSelectedIdea,
  clearError,
} = adminProfileSlice.actions;

export default adminProfileSlice.reducer;