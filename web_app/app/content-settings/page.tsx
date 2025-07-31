"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import contentSettings from "@/lib/services/contentSettings";
import { PageConfig, defaultPageVisibility } from "@/lib/config/pageVisibility";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import pageContentService from "@/lib/services/pageContentService";
import { defaultPageContent } from "@/lib/config/pageContent";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginWithEmail, loginWithGoogle, clearError } from "@/lib/auth/store/authSlice";
import { TextField, TextAreaField, ButtonArrayField, FeatureArrayField, ServiceArrayField, CollapsibleSection } from "@/lib/components/content-editor/FieldEditors";
import { ImageUploadField } from "@/lib/components/content-editor/ImageUploadField";

const ALLOWED_EMAILS = ["nickkane999@gmail.com", "melanie@glamlink.net", "admin@glamlink.com"];

export default function ContentSettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading: authLoading } = useAuth();
  const { error: authError } = useAppSelector((state) => state.auth);
  const [settings, setSettings] = useState<PageConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"visibility" | "content">("visibility");
  const [selectedPage, setSelectedPage] = useState<"home" | "forClients">("home");
  const [pageContent, setPageContent] = useState<any>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if user is one of the allowed emails
    if (!authLoading) {
      if (user?.email && ALLOWED_EMAILS.includes(user.email)) {
        setIsAuthenticated(true);
        loadSettings();
        loadPageContent();
      } else {
        // User is either not logged in or not authorized
        setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  const loadSettings = async () => {
    try {
      const currentSettings = await contentSettings.getPageVisibility();
      setSettings(currentSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
      // Fall back to defaults
      setSettings(defaultPageVisibility);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageContent = async () => {
    setIsLoadingContent(true);
    try {
      const content = await pageContentService.getPageContent(selectedPage);
      setPageContent(content);
    } catch (error) {
      console.error("Error loading page content:", error);
      setPageContent(defaultPageContent[selectedPage]);
    } finally {
      setIsLoadingContent(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === "content") {
      loadPageContent();
    }
  }, [selectedPage, isAuthenticated, activeTab]);

  const handleToggle = (path: string) => {
    const updatedSettings = settings.map((page) => (page.path === path ? { ...page, isVisible: !page.isVisible } : page));
    setSettings(updatedSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setShowSuccess(false);

    try {
      const success = await contentSettings.savePageVisibility(settings);

      if (success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to save settings. Please check your password and try again.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("An error occurred while saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default (all pages hidden)?")) {
      contentSettings.resetToDefaults();
      loadSettings();
    }
  };

  const handleExport = async () => {
    try {
      const json = await contentSettings.exportSettings();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "glamlink-page-settings.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting settings:", error);
      alert("Failed to export settings");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginWithEmail(loginForm));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      try {
        const success = await contentSettings.importSettings(content);

        if (success) {
          await loadSettings();
          alert("Settings imported successfully!");
        } else {
          alert("Failed to import settings. Please check the file format.");
        }
      } catch (error) {
        console.error("Error importing settings:", error);
        alert("An error occurred while importing settings.");
      }
    };
    reader.readAsText(file);
  };

  const handleSaveContent = async () => {
    setIsSavingContent(true);
    try {
      const success = await pageContentService.savePageContent(selectedPage, pageContent);

      if (success) {
        alert("Content saved successfully!");
      } else {
        alert("Failed to save content.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("An error occurred while saving content.");
    } finally {
      setIsSavingContent(false);
    }
  };

  const updateContentField = (path: string[], value: any) => {
    const newContent = { ...pageContent };
    let current = newContent;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    setPageContent(newContent);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glamlink-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Check if user is logged in but not authorized
    if (user && !ALLOWED_EMAILS.includes(user.email || "")) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="container-custom py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Access Denied</h1>

                <p className="text-center text-gray-600 mb-6">You don't have permission to access this page.</p>

                <p className="text-center text-sm text-gray-500">This page is restricted to authorized administrators only.</p>

                <div className="mt-6 text-center">
                  <Link href="/" className="text-glamlink-teal hover:text-glamlink-teal-dark font-medium">
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Show login form
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Content Settings</h1>
              <p className="text-center text-gray-600 mb-6">Sign in to manage content settings</p>

              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                {authError && (
                  <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{authError}</span>
                    <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => dispatch(clearError())}>
                      <span className="text-red-500">×</span>
                    </button>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={loginForm.email}
                      onChange={handleLoginInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-glamlink-teal focus:border-glamlink-teal sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={loginForm.password}
                      onChange={handleLoginInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-glamlink-teal focus:border-glamlink-teal sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-glamlink-teal hover:bg-glamlink-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-glamlink-teal disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {authLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button onClick={handleGoogleLogin} disabled={authLoading} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="ml-2">Sign in with Google</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="font-medium text-glamlink-teal hover:text-glamlink-teal-dark">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Settings</h1>
            <p className="text-gray-600 mb-6">Manage page visibility and content for your website.</p>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mt-6">
              <button onClick={() => setActiveTab("visibility")} className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === "visibility" ? "border-glamlink-teal text-glamlink-teal" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                Page Visibility
              </button>
              <button onClick={() => setActiveTab("content")} className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === "content" ? "border-glamlink-teal text-glamlink-teal" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                Page Content
              </button>
            </div>
          </div>

          {activeTab === "visibility" ? (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <p className="text-gray-600 mb-6">Control which pages are visible to users. Hidden pages will show the 404 page instead.</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-glamlink-teal text-white font-semibold rounded-lg hover:bg-glamlink-teal-dark transition-colors disabled:opacity-50">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button onClick={handleReset} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    Reset to Default
                  </button>
                  <button onClick={handleExport} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    Export Settings
                  </button>
                  <label className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors cursor-pointer">
                    Import Settings
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>

                {/* Success Message */}
                {showSuccess && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">Settings saved successfully! Changes will take effect immediately.</div>}
              </div>

              {/* Page Settings */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Page Visibility Settings</h2>
                  <div className="space-y-4">
                    {settings.map((page) => (
                      <div key={page.path} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{page.name}</h3>
                          <p className="text-sm text-gray-600">{page.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{page.path}</code>
                            <Link href={page.path} target="_blank" className="text-xs text-blue-600 hover:text-blue-800">
                              Preview →
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-medium ${page.isVisible ? "text-green-600" : "text-red-600"}`}>{page.isVisible ? "Live" : "Hidden"}</span>
                          <button onClick={() => handleToggle(page.path)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${page.isVisible ? "bg-glamlink-teal" : "bg-gray-300"}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${page.isVisible ? "translate-x-6" : "translate-x-1"}`} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Instructions</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Toggle switches to show or hide pages</li>
                  <li>Hidden pages will display the custom 404 page</li>
                  <li>Changes take effect immediately after saving</li>
                  <li>Use Export/Import to backup or share settings</li>
                  <li>Navigation links will still appear but redirect to 404 for hidden pages</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Content Editor Tab */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Edit Page Content</h2>
                    <p className="text-gray-600 mt-1">Select a page to edit its content</p>
                  </div>
                  <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value as "home" | "forClients")} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-glamlink-teal">
                    <option value="home">Home Page</option>
                    <option value="forClients">For Clients Page</option>
                  </select>
                </div>

                {isLoadingContent ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-glamlink-teal mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading content...</p>
                  </div>
                ) : pageContent ? (
                  <div className="space-y-6">
                    {selectedPage === "home" ? (
                      <>
                        {/* Hero Section */}
                        <CollapsibleSection title="Hero Section" defaultOpen={true}>
                          <TextField label="Title" value={pageContent.hero?.title || ""} onChange={(value) => updateContentField(["hero", "title"], value)} />
                          <TextAreaField label="Subtitle" value={pageContent.hero?.subtitle || ""} onChange={(value) => updateContentField(["hero", "subtitle"], value)} rows={3} />
                          <ButtonArrayField buttons={pageContent.hero?.buttons || []} onChange={(buttons) => updateContentField(["hero", "buttons"], buttons)} />
                        </CollapsibleSection>

                        {/* Why Glamlink Section */}
                        <CollapsibleSection title="Why Glamlink Section">
                          <TextField label="Title" value={pageContent.whyGlamLink?.title || ""} onChange={(value) => updateContentField(["whyGlamLink", "title"], value)} />
                          <TextAreaField label="Subtitle" value={pageContent.whyGlamLink?.subtitle || ""} onChange={(value) => updateContentField(["whyGlamLink", "subtitle"], value)} rows={2} />
                          <FeatureArrayField features={pageContent.whyGlamLink?.features || []} onChange={(features) => updateContentField(["whyGlamLink", "features"], features)} />
                        </CollapsibleSection>

                        {/* Book Trusted Pros Section */}
                        <CollapsibleSection title="Book Trusted Pros Section">
                          <ServiceArrayField services={pageContent.bookTrustedPros?.services || []} onChange={(services) => updateContentField(["bookTrustedPros", "services"], services)} />
                        </CollapsibleSection>

                        {/* Founder Badge Section */}
                        <CollapsibleSection title="Founder Badge Section">
                          <TextField label="Title" value={pageContent.founderBadge?.title || ""} onChange={(value) => updateContentField(["founderBadge", "title"], value)} />
                          <TextAreaField label="Description" value={pageContent.founderBadge?.description || ""} onChange={(value) => updateContentField(["founderBadge", "description"], value)} rows={2} />
                          <TextField label="Subtext" value={pageContent.founderBadge?.subtext || ""} onChange={(value) => updateContentField(["founderBadge", "subtext"], value)} />
                          <ImageUploadField label="Badge Image" value={pageContent.founderBadge?.image || ""} onChange={(value) => updateContentField(["founderBadge", "image"], value)} placeholder="/images/gold_badge.png" />
                        </CollapsibleSection>

                        {/* Testimonials Section */}
                        <CollapsibleSection title="Testimonials Section">
                          <TextField label="Section Title" value={pageContent.testimonials?.title || ""} onChange={(value) => updateContentField(["testimonials", "title"], value)} />
                          <div className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-gray-700">Testimonials</label>
                              <button
                                type="button"
                                onClick={() => {
                                  const testimonials = pageContent.testimonials?.items || [];
                                  updateContentField(["testimonials", "items"], [...testimonials, { name: "", role: "", text: "", image: "" }]);
                                }}
                                className="text-sm text-glamlink-teal hover:text-glamlink-teal-dark"
                              >
                                + Add Testimonial
                              </button>
                            </div>
                            {(pageContent.testimonials?.items || []).map((testimonial: any, index: number) => (
                              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Testimonial {index + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const testimonials = [...(pageContent.testimonials?.items || [])];
                                      testimonials.splice(index, 1);
                                      updateContentField(["testimonials", "items"], testimonials);
                                    }}
                                    className="text-sm text-red-600 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <TextField
                                  label="Name"
                                  value={testimonial.name}
                                  onChange={(value) => {
                                    const testimonials = [...(pageContent.testimonials?.items || [])];
                                    testimonials[index] = { ...testimonials[index], name: value };
                                    updateContentField(["testimonials", "items"], testimonials);
                                  }}
                                />
                                <TextField
                                  label="Role"
                                  value={testimonial.role}
                                  onChange={(value) => {
                                    const testimonials = [...(pageContent.testimonials?.items || [])];
                                    testimonials[index] = { ...testimonials[index], role: value };
                                    updateContentField(["testimonials", "items"], testimonials);
                                  }}
                                />
                                <TextAreaField
                                  label="Testimonial Text"
                                  value={testimonial.text}
                                  onChange={(value) => {
                                    const testimonials = [...(pageContent.testimonials?.items || [])];
                                    testimonials[index] = { ...testimonials[index], text: value };
                                    updateContentField(["testimonials", "items"], testimonials);
                                  }}
                                  rows={3}
                                />
                                <ImageUploadField
                                  label="Image"
                                  value={testimonial.image || ""}
                                  onChange={(value) => {
                                    const testimonials = [...(pageContent.testimonials?.items || [])];
                                    testimonials[index] = { ...testimonials[index], image: value };
                                    updateContentField(["testimonials", "items"], testimonials);
                                  }}
                                  placeholder="https://images.unsplash.com/..."
                                />
                              </div>
                            ))}
                          </div>
                        </CollapsibleSection>

                        {/* Final CTA Section */}
                        <CollapsibleSection title="Final CTA Section">
                          <TextField label="Main Title" value={pageContent.finalCTA?.title || ""} onChange={(value) => updateContentField(["finalCTA", "title"], value)} />
                          <TextAreaField label="Subtitle" value={pageContent.finalCTA?.subtitle || ""} onChange={(value) => updateContentField(["finalCTA", "subtitle"], value)} rows={2} />
                          <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900">User Section</h4>
                              <TextField label="Title" value={pageContent.finalCTA?.userSection?.title || ""} onChange={(value) => updateContentField(["finalCTA", "userSection", "title"], value)} />
                              <TextAreaField label="Description" value={pageContent.finalCTA?.userSection?.description || ""} onChange={(value) => updateContentField(["finalCTA", "userSection", "description"], value)} rows={2} />
                              <TextField label="Button Text" value={pageContent.finalCTA?.userSection?.button?.text || ""} onChange={(value) => updateContentField(["finalCTA", "userSection", "button", "text"], value)} />
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900">Pro Section</h4>
                              <TextField label="Title" value={pageContent.finalCTA?.proSection?.title || ""} onChange={(value) => updateContentField(["finalCTA", "proSection", "title"], value)} />
                              <TextAreaField label="Description" value={pageContent.finalCTA?.proSection?.description || ""} onChange={(value) => updateContentField(["finalCTA", "proSection", "description"], value)} rows={2} />
                              <TextField label="Button Text" value={pageContent.finalCTA?.proSection?.button?.text || ""} onChange={(value) => updateContentField(["finalCTA", "proSection", "button", "text"], value)} />
                            </div>
                          </div>
                        </CollapsibleSection>
                      </>
                    ) : selectedPage === "forClients" ? (
                      <>
                        {/* For Clients Page Sections */}
                        <CollapsibleSection title="Hero Section" defaultOpen={true}>
                          <TextField label="Title" value={pageContent.hero?.title || ""} onChange={(value) => updateContentField(["hero", "title"], value)} />
                          <TextAreaField label="Subtitle" value={pageContent.hero?.subtitle || ""} onChange={(value) => updateContentField(["hero", "subtitle"], value)} rows={3} />
                          <ButtonArrayField buttons={pageContent.hero?.buttons || []} onChange={(buttons) => updateContentField(["hero", "buttons"], buttons)} />
                        </CollapsibleSection>

                        <CollapsibleSection title="Features Section">
                          <TextField label="Section Title" value={pageContent.features?.title || ""} onChange={(value) => updateContentField(["features", "title"], value)} />
                          <FeatureArrayField features={pageContent.features?.items || []} onChange={(features) => updateContentField(["features", "items"], features)} />
                        </CollapsibleSection>
                      </>
                    ) : null}

                    {/* Save Button */}
                    <div className="flex justify-end sticky bottom-0 bg-white pt-4">
                      <button onClick={handleSaveContent} disabled={isSavingContent} className="px-6 py-2 bg-glamlink-teal text-white font-semibold rounded-lg hover:bg-glamlink-teal-dark transition-colors disabled:opacity-50">
                        {isSavingContent ? "Saving..." : "Save Content"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">No content loaded</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
