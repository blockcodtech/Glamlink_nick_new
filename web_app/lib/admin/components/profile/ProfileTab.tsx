"use client";

import { useProfile } from '../../hooks/useProfile';
import ProfileForm from './ProfileForm';
import ImageUploadSection from './ImageUploadSection';
import SocialLinksForm from './SocialLinksForm';

export default function ProfileTab() {
  const {
    user,
    brand,
    formData,
    isLoading,
    isSaving,
    isUploadingProfile,
    isUploadingCover,
    message,
    handleSubmit,
    handleInputChange,
    handleSocialLinkChange,
    handleProfileImageUpload,
    handleCoverImageUpload,
  } = useProfile();

  if (isLoading) {
    return <div className="text-center py-8">Loading brand profile...</div>;
  }

  // Super admin doesn't have a brand profile
  if (user?.email === 'admin@glamlink.com') {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Super Admin Account</h2>
        <p className="text-gray-600">
          As a super administrator, you don't have a brand profile. 
          Use the Settings tab to manage the system.
        </p>
      </div>
    );
  }

  // User not loaded
  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Unable to load user profile. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Brand Profile</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage your brand information and appearance
        </p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`rounded-md p-4 ${
          message.includes('Error') || message.includes('error') 
            ? 'bg-red-50 text-red-800' 
            : 'bg-green-50 text-green-800'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
      )}

      {/* Image Upload Section */}
      <ImageUploadSection
        profileImage={formData.profileImage}
        coverImage={formData.coverImage}
        onProfileImageUpload={handleProfileImageUpload}
        onCoverImageUpload={handleCoverImageUpload}
        isUploadingProfile={isUploadingProfile}
        isUploadingCover={isUploadingCover}
      />

      {/* Profile Form */}
      <ProfileForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />

      {/* Social Links */}
      <SocialLinksForm
        socialLinks={formData.socialLinks}
        onSocialLinkChange={handleSocialLinkChange}
      />
    </div>
  );
}