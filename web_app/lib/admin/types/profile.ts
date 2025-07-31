// Profile types

export interface ImageUploadSectionProps {
  profileImage: string;
  coverImage: string;
  onProfileImageUpload: (file: File) => Promise<void>;
  onCoverImageUpload: (file: File) => Promise<void>;
  isUploadingProfile: boolean;
  isUploadingCover: boolean;
}

export interface ProfileFormProps {
  formData: {
    name: string;
    tagline: string;
    mission: string;
    description: string;
    summary: string;
    category: string;
    themeColor: string;
    website: string;
    location: string;
    isPublished: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export interface SocialLinksFormProps {
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    pinterest: string;
  };
  onSocialLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
}