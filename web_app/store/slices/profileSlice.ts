import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Brand, BrandQuestionnaire, BrainstormIdea } from "@/lib/pages/brand/types";
import firebaseProfileService from "@/lib/admin/server/firebaseProfileService";
import firestoreService from "@/lib/services/firebase/firestoreService";
import storageService from "@/lib/services/firebase/storageService";
import authService from "@/lib/services/firebase/authService";

// ============================================
// INTERFACES
// ============================================

interface ProfileFormData {
  name: string;
  tagline: string;
  mission: string;
  description: string;
  summary: string;
  category: string;
  themeColor: string;
  website: string;
  location: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  profileImage: string;
  coverImage: string;
  isPublished: boolean;
}

interface ProfileState {
  // Brand data
  brand: Brand | null;
  brandLoading: boolean;
  brandError: string | null;
  
  // Form data
  formData: ProfileFormData;
  formDirty: boolean;
  
  // Questionnaire
  questionnaire: BrandQuestionnaire | null;
  questionnaireLoading: boolean;
  questionnaireError: string | null;
  
  // UI states
  isSaving: boolean;
  isCreatingBrand: boolean;
  uploadingProfile: boolean;
  uploadingCover: boolean;
  
  // Messages
  successMessage: string | null;
  errorMessage: string | null;
}

// ============================================
// INITIAL STATE
// ============================================

const initialFormData: ProfileFormData = {
  name: "",
  tagline: "",
  mission: "",
  description: "",
  summary: "",
  category: "Beauty",
  themeColor: "#DC2626",
  website: "",
  location: "",
  socialLinks: {
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  },
  profileImage: "",
  coverImage: "",
  isPublished: false
};

const initialState: ProfileState = {
  brand: null,
  brandLoading: false,
  brandError: null,
  formData: initialFormData,
  formDirty: false,
  questionnaire: null,
  questionnaireLoading: false,
  questionnaireError: null,
  isSaving: false,
  isCreatingBrand: false,
  uploadingProfile: false,
  uploadingCover: false,
  successMessage: null,
  errorMessage: null,
};

// ============================================
// ASYNC THUNKS
// ============================================

// Fetch brand profile
export const fetchBrandProfile = createAsyncThunk(
  "profile/fetchBrand",
  async (brandId: string) => {
    const brand = await firebaseProfileService.getBrand(brandId);
    return brand;
  }
);

// Create brand for new user
export const createBrandForUser = createAsyncThunk(
  "profile/createBrand",
  async ({ userId, userEmail, userDisplayName }: {
    userId: string;
    userEmail?: string;
    userDisplayName?: string;
  }) => {
    // Create brand
    const brandName = userDisplayName || userEmail?.split('@')[0] || 'My Brand';
    const brandId = `brand_${Date.now()}`;
    
    const newBrand: Brand = {
      id: brandId,
      name: `${brandName}'s Beauty Brand`,
      tagline: "Beauty Redefined",
      mission: "Empowering beauty entrepreneurs to build successful brands",
      description: "Welcome to our beauty brand! We're dedicated to providing high-quality beauty products and services.",
      profileImage: "/images/default-brand.jpg",
      coverImage: "/images/default-cover.jpg",
      isFollowing: false,
      followerCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: userId,
      isPublished: false,
      products: [],
      certifiedProviders: [],
      trainingPrograms: [],
      reviews: [],
      brainstormIdeas: []
    };
    
    // Save brand to Firestore
    await firestoreService.setDocument('brands', brandId, newBrand);
    
    // Update user with brandId
    await firestoreService.updateDocument('users', userId, {
      brandId: brandId,
      updatedAt: new Date().toISOString()
    });
    
    return newBrand;
  }
);

// Update brand profile
export const updateBrandProfile = createAsyncThunk(
  "profile/updateBrand",
  async ({ brandId, updates }: { brandId: string; updates: Partial<Brand> }) => {
    await firebaseProfileService.updateBrand(brandId, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { brandId, updates };
  }
);

// Upload profile image
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async ({ brandId, file }: { brandId: string; file: File }) => {
    const folder = `brands/${brandId}/profile-images`;
    const imageUrl = await storageService.uploadImage(file, folder);
    
    // Update the brand document with the new image URL
    await firebaseProfileService.updateBrand(brandId, { profileImage: imageUrl });
    
    return imageUrl;
  }
);

// Upload cover image
export const uploadCoverImage = createAsyncThunk(
  "profile/uploadCoverImage",
  async ({ brandId, file }: { brandId: string; file: File }) => {
    const folder = `brands/${brandId}/cover-images`;
    const imageUrl = await storageService.uploadImage(file, folder);
    
    // Update the brand document with the new image URL
    await firebaseProfileService.updateBrand(brandId, { coverImage: imageUrl });
    
    return imageUrl;
  }
);

// Fetch questionnaire
export const fetchQuestionnaire = createAsyncThunk(
  "profile/fetchQuestionnaire",
  async (userId: string) => {
    const userDoc = await firestoreService.getDocument('users', userId) as any;
    return userDoc?.questionnaire || null;
  }
);

// Save questionnaire
export const saveQuestionnaire = createAsyncThunk(
  "profile/saveQuestionnaire",
  async ({ userId, data }: { userId: string; data: any }) => {
    await firestoreService.updateDocument('users', userId, {
      questionnaire: data
    });
    
    const questionnaire: BrandQuestionnaire = {
      ...data,
      id: `quest_${Date.now()}`,
      brandId: '',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    return questionnaire;
  }
);

// Generate brainstorm ideas
export const generateBrainstormIdeas = createAsyncThunk(
  "profile/generateIdeas",
  async ({ brand, options }: { 
    brand: Brand; 
    options: { count: number; category: string } 
  }) => {
    const response = await fetch('/api/ai/generate-brainstorm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brandName: brand.name,
        brandTagline: brand.tagline,
        brandMission: brand.mission,
        ...options
      }),
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to generate ideas');
    }
    
    if (data.ideas && data.ideas.length > 0) {
      // Update brand with new ideas
      const updatedIdeas = [...(brand.brainstormIdeas || []), ...data.ideas];
      await firestoreService.updateDocument('brands', brand.id, {
        brainstormIdeas: updatedIdeas
      });
      return data.ideas;
    }
    
    return [];
  }
);

// Delete brainstorm idea
export const deleteBrainstormIdea = createAsyncThunk(
  "profile/deleteIdea",
  async ({ brand, ideaId }: { brand: Brand; ideaId: string }) => {
    const updatedIdeas = brand.brainstormIdeas?.filter(idea => idea.id !== ideaId) || [];
    await firebaseProfileService.updateDocument('brands', brand.id, {
      brainstormIdeas: updatedIdeas
    });
    return ideaId;
  }
);

// ============================================
// SLICE
// ============================================

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Form actions
    updateFormField: (state, action: PayloadAction<{ field: keyof ProfileFormData; value: any }>) => {
      const { field, value } = action.payload;
      (state.formData as any)[field] = value;
      state.formDirty = true;
    },
    updateSocialLink: (state, action: PayloadAction<{ platform: string; value: string }>) => {
      const { platform, value } = action.payload;
      state.formData.socialLinks[platform as keyof typeof state.formData.socialLinks] = value;
      state.formDirty = true;
    },
    resetForm: (state, action: PayloadAction<Partial<ProfileFormData>>) => {
      state.formData = { ...initialFormData, ...action.payload };
      state.formDirty = false;
    },
    
    // Message actions
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.errorMessage = null;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.successMessage = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
    
    // Brand actions
    updateBrandLocally: (state, action: PayloadAction<Partial<Brand>>) => {
      if (state.brand) {
        state.brand = { ...state.brand, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch brand profile
    builder
      .addCase(fetchBrandProfile.pending, (state) => {
        state.brandLoading = true;
        state.brandError = null;
      })
      .addCase(fetchBrandProfile.fulfilled, (state, action) => {
        state.brandLoading = false;
        state.brand = action.payload;
        // Initialize form with brand data
        if (action.payload) {
          state.formData = {
            name: action.payload.name || "",
            tagline: action.payload.tagline || "",
            mission: action.payload.mission || "",
            description: action.payload.description || "",
            summary: action.payload.summary || "",
            category: action.payload.category || "Beauty",
            themeColor: action.payload.themeColor || "#DC2626",
            website: action.payload.website || "",
            location: action.payload.location || "",
            socialLinks: {
              instagram: action.payload.socialLinks?.instagram || "",
              facebook: action.payload.socialLinks?.facebook || "",
              twitter: action.payload.socialLinks?.twitter || "",
              youtube: action.payload.socialLinks?.youtube || "",
              tiktok: action.payload.socialLinks?.tiktok || "",
            },
            profileImage: action.payload.profileImage || "",
            coverImage: action.payload.coverImage || "",
            isPublished: action.payload.isPublished || false
          };
          state.formDirty = false;
        }
      })
      .addCase(fetchBrandProfile.rejected, (state, action) => {
        state.brandLoading = false;
        state.brandError = action.error.message || "Failed to fetch brand profile";
      });
    
    // Create brand
    builder
      .addCase(createBrandForUser.pending, (state) => {
        state.isCreatingBrand = true;
        state.errorMessage = null;
      })
      .addCase(createBrandForUser.fulfilled, (state, action) => {
        state.isCreatingBrand = false;
        state.brand = action.payload;
        state.successMessage = "Brand created successfully!";
      })
      .addCase(createBrandForUser.rejected, (state, action) => {
        state.isCreatingBrand = false;
        state.errorMessage = action.error.message || "Failed to create brand";
      });
    
    // Update brand profile
    builder
      .addCase(updateBrandProfile.pending, (state) => {
        state.isSaving = true;
        state.errorMessage = null;
      })
      .addCase(updateBrandProfile.fulfilled, (state, action) => {
        state.isSaving = false;
        if (state.brand) {
          state.brand = { ...state.brand, ...action.payload.updates };
        }
        state.formDirty = false;
        state.successMessage = "Brand profile updated successfully!";
      })
      .addCase(updateBrandProfile.rejected, (state, action) => {
        state.isSaving = false;
        state.errorMessage = action.error.message || "Failed to update brand profile";
      });
    
    // Upload profile image
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadingProfile = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.uploadingProfile = false;
        state.formData.profileImage = action.payload;
        if (state.brand) {
          state.brand.profileImage = action.payload;
        }
        state.formDirty = true;
        state.successMessage = "Profile image uploaded successfully!";
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadingProfile = false;
        state.errorMessage = action.error.message || "Failed to upload profile image";
      });
    
    // Upload cover image
    builder
      .addCase(uploadCoverImage.pending, (state) => {
        state.uploadingCover = true;
      })
      .addCase(uploadCoverImage.fulfilled, (state, action) => {
        state.uploadingCover = false;
        state.formData.coverImage = action.payload;
        if (state.brand) {
          state.brand.coverImage = action.payload;
        }
        state.formDirty = true;
        state.successMessage = "Cover image uploaded successfully!";
      })
      .addCase(uploadCoverImage.rejected, (state, action) => {
        state.uploadingCover = false;
        state.errorMessage = action.error.message || "Failed to upload cover image";
      });
    
    // Fetch questionnaire
    builder
      .addCase(fetchQuestionnaire.pending, (state) => {
        state.questionnaireLoading = true;
        state.questionnaireError = null;
      })
      .addCase(fetchQuestionnaire.fulfilled, (state, action) => {
        state.questionnaireLoading = false;
        state.questionnaire = action.payload;
      })
      .addCase(fetchQuestionnaire.rejected, (state, action) => {
        state.questionnaireLoading = false;
        state.questionnaireError = action.error.message || "Failed to fetch questionnaire";
      });
    
    // Save questionnaire
    builder
      .addCase(saveQuestionnaire.fulfilled, (state, action) => {
        state.questionnaire = action.payload;
        state.successMessage = "Questionnaire saved successfully!";
      })
      .addCase(saveQuestionnaire.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Failed to save questionnaire";
      });
    
    // Generate brainstorm ideas
    builder
      .addCase(generateBrainstormIdeas.fulfilled, (state, action) => {
        if (state.brand) {
          state.brand.brainstormIdeas = [
            ...(state.brand.brainstormIdeas || []),
            ...action.payload
          ];
        }
        state.successMessage = `Generated ${action.payload.length} new ideas!`;
      })
      .addCase(generateBrainstormIdeas.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Failed to generate ideas";
      });
    
    // Delete brainstorm idea
    builder
      .addCase(deleteBrainstormIdea.fulfilled, (state, action) => {
        if (state.brand && state.brand.brainstormIdeas) {
          state.brand.brainstormIdeas = state.brand.brainstormIdeas.filter(
            idea => idea.id !== action.payload
          );
        }
        state.successMessage = "Idea deleted successfully!";
      })
      .addCase(deleteBrainstormIdea.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Failed to delete idea";
      });
  },
});

// Export actions
export const {
  updateFormField,
  updateSocialLink,
  resetForm,
  setSuccessMessage,
  setErrorMessage,
  clearMessages,
  updateBrandLocally,
} = profileSlice.actions;

// Export reducer
export default profileSlice.reducer;