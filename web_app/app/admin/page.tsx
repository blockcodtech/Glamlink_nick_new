"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/lib/auth/store/authSlice";

export default function AdminPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAuth();

  // Check if user is admin by email
  console.log("User:", user);
  const isAdmin = user?.email === "admin@glamlink.net";
  const hasUser = !!user?.email;

  useEffect(() => {
    // Redirect non-admin users to profile page
    if (!isLoading && hasUser && !isAdmin) {
      router.push("/profile");
    }
  }, [isLoading, hasUser, isAdmin, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glamlink-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Lock Icon */}
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-8">This page is restricted to system administrators only.</p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button onClick={() => router.push("/login")} className="w-full bg-glamlink-teal text-white py-3 px-6 rounded-lg font-medium hover:bg-glamlink-teal-dark transition-colors">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-glamlink-teal">Glamlink Admin</h1>
              <span className="ml-4 text-sm text-gray-500">System Administrator</span>
            </div>
            <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
