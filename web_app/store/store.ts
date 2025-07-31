import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@/lib/pages/projects/store/projectsSlice";
import homeReducer from "@/lib/pages/home/store/homeSlice";
import brandReducer from "@/lib/pages/brand/store/brandSlice";
import imageAnalysisReducer from "@/lib/pages/image-analysis/store/imageAnalysisSlice";
import authReducer from "@/lib/auth/store/authSlice";
import profileReducer from "./slices/profileSlice";
import adminProfileReducer from "@/lib/admin/store/adminProfileSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    home: homeReducer,
    brand: brandReducer,
    imageAnalysis: imageAnalysisReducer,
    auth: authReducer,
    profile: profileReducer,
    adminProfile: adminProfileReducer,
  },
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
