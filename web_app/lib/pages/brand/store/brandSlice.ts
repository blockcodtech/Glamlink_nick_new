import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BrandStateInterface, BrandApiResponse, FilterOptions } from "../types/state";
import { BRAND_API_ENDPOINT, DEFAULT_BRAND_ID } from "../types/constants";
import brandReadService from "../server/brandReadService";
import { mockBrand, mockProducts, mockProviders, mockBeforeAfters, mockTrainingPrograms, mockReviews } from "../mockData";

const initialState: BrandStateInterface = {
  brand: null,
  products: [],
  providers: [],
  beforeAfters: [],
  trainingPrograms: [],
  reviews: [],
  isLoading: false,
  error: null,
  filters: {},
  searchQuery: '',
  isReviewModalOpen: false,
  isSubmittingReview: false
};

export const fetchBrandData = createAsyncThunk(
  "brand/fetchData",
  async (brandId: string = DEFAULT_BRAND_ID) => {
    try {
      // Try Firebase first
      const brandData = await brandReadService.getBrandData(brandId);
      
      if (brandData && brandData.brand) {
        // Successfully loaded brand data from Firebase
        return {
          success: true,
          data: brandData
        } as BrandApiResponse;
      }
      
      // Return empty data if no brand found
      return {
        success: false,
        error: 'Brand not found'
      } as BrandApiResponse;
      
    } catch (error: any) {
      // If Firebase fails, return error
      return {
        success: false,
        error: error.message || 'Failed to fetch brand data'
      } as BrandApiResponse;
    }
  }
);

export const toggleFollowBrand = createAsyncThunk(
  "brand/toggleFollow",
  async ({ brandId, isFollowing }: { brandId: string; isFollowing: boolean }) => {
    try {
      // TODO: Update in Firebase when follow functionality is implemented
      // For now, just return the toggle for UI update
      
      return { isFollowing, followerCountDelta: isFollowing ? 1 : -1 };
    } catch (error) {
      // Failed to update follow status
      // Return the toggle anyway for UI update
      return { isFollowing, followerCountDelta: isFollowing ? 1 : -1 };
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetBrandState: () => initialState,
    openReviewModal: (state) => {
      state.isReviewModalOpen = true;
    },
    closeReviewModal: (state) => {
      state.isReviewModalOpen = false;
    },
    setSubmittingReview: (state, action: PayloadAction<boolean>) => {
      state.isSubmittingReview = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch brand data
      .addCase(fetchBrandData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrandData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.data) {
          state.brand = action.payload.data.brand;
          state.products = action.payload.data.products;
          state.providers = action.payload.data.providers;
          state.beforeAfters = action.payload.data.beforeAfters;
          state.trainingPrograms = action.payload.data.programs;
          state.reviews = action.payload.data.reviews;
        }
      })
      .addCase(fetchBrandData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch brand data";
      })
      // Toggle follow
      .addCase(toggleFollowBrand.fulfilled, (state, action) => {
        if (state.brand) {
          state.brand.isFollowing = action.payload.isFollowing;
          state.brand.followerCount += action.payload.followerCountDelta;
        }
      });
  },
});

export const { 
  setFilters, 
  setSearchQuery, 
  clearError, 
  resetBrandState,
  openReviewModal,
  closeReviewModal,
  setSubmittingReview
} = brandSlice.actions;

export default brandSlice.reducer;