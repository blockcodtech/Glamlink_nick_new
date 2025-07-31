"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import Link from "next/link";
import firestoreService from "@/lib/services/firebase/firestoreService";
import firebaseProfileService from "@/lib/admin/server/firebaseProfileService";
import { Brand } from "@/lib/pages/brand/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import BrainstormQuestionnaireTab from "@/lib/admin/components/brainstorm/BrainstormQuestionnaireTab";
import { User } from "@/lib/auth/config";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [isCheckingQuestionnaire, setIsCheckingQuestionnaire] = useState(true);

  useEffect(() => {
    if (user?.brandId) {
      fetchBrand();
    } else {
      setIsLoading(false);
    }

    // Check if user has completed questionnaire
    if (user?.uid) {
      checkQuestionnaireStatus();
    }
  }, [user]);

  const checkQuestionnaireStatus = async () => {
    try {
      setIsCheckingQuestionnaire(true);
      const userData = await firestoreService.getDocument<User>("users", user!.uid);
      setHasCompletedQuestionnaire(!!userData?.questionnaire);
    } catch (error) {
      console.error("Error checking questionnaire status:", error);
    } finally {
      setIsCheckingQuestionnaire(false);
    }
  };

  const fetchBrand = async () => {
    try {
      const brandData = await firestoreService.getDocument<Brand>("brands", user!.brandId!);
      setBrand(brandData);
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!user?.brandId) {
      setCopyMessage("No brand found");
      return;
    }

    try {
      const brandUrl = `${window.location.origin}/brand/${user.brandId}`;
      await navigator.clipboard.writeText(brandUrl);
      setCopyMessage("Link copied!");
      setTimeout(() => setCopyMessage(""), 3000);
    } catch (error) {
      setCopyMessage("Failed to copy");
      setTimeout(() => setCopyMessage(""), 3000);
    }
  };

  const handlePublish = async () => {
    if (!user?.brandId) return;

    const confirmed = window.confirm("Ready to make your brand visible to everyone?");
    if (!confirmed) return;

    try {
      await firestoreService.updateDocument("brands", user.brandId, {
        isPublished: true,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Refresh brand data
      await fetchBrand();
    } catch (error) {
      console.error("Error publishing brand:", error);
      alert("Failed to publish brand. Please try again.");
    }
  };

  const handleUnpublish = async () => {
    if (!user?.brandId) return;

    const confirmed = window.confirm("Are you sure you want to unpublish your brand? It will no longer be visible to the public.");
    if (!confirmed) return;

    try {
      await firestoreService.updateDocument("brands", user.brandId, {
        isPublished: false,
        updatedAt: new Date().toISOString(),
      });

      // Refresh brand data
      await fetchBrand();
    } catch (error) {
      console.error("Error unpublishing brand:", error);
      alert("Failed to unpublish brand. Please try again.");
    }
  };

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Glamlink, {user?.displayName || user?.email?.split("@")[0]}!</h1>
        <p className="text-gray-600">Here's your dashboard to manage your beauty business and grow your brand.</p>
      </div>

      {/* Progress Card */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">{brand?.isPublished ? "4/4" : "3/4"}</div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{brand?.isPublished ? "Your brand is live!" : "Your brand is almost ready!"}</h3>
              <p className="text-gray-600">{brand?.isPublished ? "Share across your social media, network and with friends and family to start building an audience." : "Customize your brand and publish it when you're ready to go live."}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {brand?.isPublished ? (
            <>
              <button onClick={handleCopyLink} disabled={!brand?.isPublished} className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copyMessage || "Copy link"}
              </button>
              <button onClick={handleUnpublish} className="inline-flex items-center px-4 py-2 text-red-700 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Unpublish
              </button>
            </>
          ) : (
            <button onClick={handlePublish} className="inline-flex items-center px-4 py-2 bg-glamlink-teal text-white rounded-lg text-sm font-medium hover:bg-glamlink-teal-dark transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Publish Brand
            </button>
          )}
          <Link href="/profile/brand" className="inline-flex items-center px-4 py-2 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Customize your brand
          </Link>
        </div>
      </div>

      {/* Get more out of Glamlink */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Get more out of Glamlink</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start">
            <div className="w-16 h-16 bg-glamlink-teal rounded-full flex items-center justify-center mr-6 flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Glamlink Brand</h3>
              <p className="text-gray-600 mb-4">
                Create and manage your own beauty brand with Glamlink. Set up your products, manage certified providers, showcase transformations, and grow your business with AI-powered tools. Join thousands of beauty entrepreneurs who are building their digital presence with Glamlink.
              </p>
              <Link href="/profile/brand" className="inline-flex items-center text-glamlink-teal font-medium hover:text-glamlink-teal-dark">
                Manage your brand
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Setup Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Set up your brand</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Brand Setup Wizard
                {hasCompletedQuestionnaire && <span className="ml-2 text-sm font-normal text-green-600">✓ Questionnaire completed</span>}
              </h3>
              <p className="text-gray-600 mb-4">
                Fill out a comprehensive questionnaire about your brand vision, products, and services. Our AI will automatically generate professional content for your entire brand - including products, certified providers, and training programs. This saves hours of manual setup and gives you a
                strong foundation to build upon.
              </p>
              <button onClick={() => setShowQuestionnaireModal(true)} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {hasCompletedQuestionnaire ? "Regenerate Brand Content" : "Start Brand Setup"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/profile/brand/products" className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Products</h3>
              <p className="text-sm text-gray-600">Manage your catalog</p>
            </div>
          </Link>

          <Link href="/profile/brand/providers" className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Providers</h3>
              <p className="text-sm text-gray-600">Manage professionals</p>
            </div>
          </Link>

          <Link href="/profile/brand/brainstorm" className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Brainstorm</h3>
              <p className="text-sm text-gray-600">AI-powered ideas</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Questionnaire Modal */}
      <Dialog open={showQuestionnaireModal} onClose={() => setShowQuestionnaireModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-4xl w-full bg-white rounded-xl shadow-xl">
            <div className="relative">
              <button onClick={() => setShowQuestionnaireModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <BrainstormQuestionnaireTab />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
