"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuthStatus, setUser } from "../store/authSlice";
import authService from "@/lib/services/firebase/authService";

export function useAuth(requireAdmin = false) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);
  
  // Debug logging removed
  
  useEffect(() => {
    // Check initial auth status
    dispatch(checkAuthStatus());
    
    // Set up auth state listener
    const unsubscribe = authService.onAuthStateChange((user, userProfile) => {
      // Auth state changed
      
      if (user && userProfile) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || user.email!,
          photoURL: user.photoURL || undefined,
          brandId: userProfile.brandId,
          userType: userProfile.userType,
        }));
      } else {
        dispatch(setUser(null));
      }
    });
    
    return () => unsubscribe();
  }, [dispatch]);
  
  // TEMPORARILY COMMENTED OUT TO STOP REDIRECT LOOP
  // useEffect(() => {
  //   // Redirect logic - only redirect if explicitly requiring authentication
  //   if (!authState.isLoading && requireAdmin && !authState.isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [authState.isLoading, authState.isAuthenticated, requireAdmin, router]);
  
  return authState;
}