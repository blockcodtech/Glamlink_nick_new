import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateInterface, User, LoginFormData, ADMIN_EMAILS } from "../config";
import authService from "@/lib/services/firebase/authService";

// Initial state
const initialState: AuthStateInterface = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isAdmin: false,
};

// Async thunks
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }: LoginFormData) => {
    const { user, userProfile } = await authService.signIn(email, password);
    return {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || email,
      photoURL: user.photoURL || undefined,
      brandId: userProfile?.brandId,
      userType: userProfile?.userType,
    };
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    const { user, userProfile } = await authService.signInWithGoogle();
    return {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName!,
      photoURL: user.photoURL || undefined,
      brandId: userProfile?.brandId,
      userType: userProfile?.userType,
    };
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await authService.signOutUser();
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async () => {
    const user = authService.getCurrentUser();
    if (user) {
      const userProfile = await authService.getUserProfile(user.uid);
      return {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || user.email!,
        photoURL: user.photoURL || undefined,
        brandId: userProfile?.brandId,
        userType: userProfile?.userType,
      };
    }
    return null;
  }
);

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAdmin = action.payload ? ADMIN_EMAILS.includes(action.payload.email) : false;
    },
  },
  extraReducers: (builder) => {
    // Login with email
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = ADMIN_EMAILS.includes(action.payload.email);
        state.error = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
    
    // Login with Google
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = ADMIN_EMAILS.includes(action.payload.email);
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Google login failed";
      });
    
    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
      });
    
    // Check auth status
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isAdmin = ADMIN_EMAILS.includes(action.payload.email);
        }
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;