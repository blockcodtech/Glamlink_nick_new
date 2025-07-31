"use client";

import ImageUpload from "@/lib/components/ImageUpload";
import { ImageUploadSectionProps } from '@/lib/admin/types';

export default function ImageUploadSection({
  profileImage,
  coverImage,
  onProfileImageUpload,
  onCoverImageUpload,
  isUploadingProfile,
  isUploadingCover
}: ImageUploadSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Images</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div className="relative">
            <ImageUpload
              currentImage={profileImage}
              onImageChange={onProfileImageUpload}
              label="Profile Image"
              helperText="Recommended: Square image, at least 400x400px"
              aspectRatio="square"
              isLoading={isUploadingProfile}
            />
            {isUploadingProfile && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-glamlink-teal"></div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="relative">
            <ImageUpload
              currentImage={coverImage}
              onImageChange={onCoverImageUpload}
              label="Cover Image"
              helperText="Recommended: 1200x400px or similar aspect ratio"
              aspectRatio="landscape"
              isLoading={isUploadingCover}
            />
            {isUploadingCover && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-glamlink-teal"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}