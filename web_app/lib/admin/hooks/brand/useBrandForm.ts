import { useState } from 'react';

interface ProfileFormData {
  name: string;
  tagline: string;
  mission: string;
  description: string;
  summary: string;
  category: string;
  themeColor: string;
  website: string;
  location: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  profileImage: string;
  coverImage: string;
  isPublished: boolean;
}

interface UseBrandFormProps {
  initialData?: Partial<ProfileFormData>;
}

export const useBrandForm = ({ initialData }: UseBrandFormProps = {}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData?.name || "",
    tagline: initialData?.tagline || "",
    mission: initialData?.mission || "",
    description: initialData?.description || "",
    summary: initialData?.summary || "",
    category: initialData?.category || "Beauty",
    themeColor: initialData?.themeColor || "#DC2626",
    website: initialData?.website || "",
    location: initialData?.location || "",
    socialLinks: initialData?.socialLinks || {
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
      tiktok: "",
    },
    profileImage: initialData?.profileImage || "",
    coverImage: initialData?.coverImage || "",
    isPublished: initialData?.isPublished ?? false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const updateFormData = (updates: Partial<ProfileFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = (newData?: Partial<ProfileFormData>) => {
    setFormData({
      name: newData?.name || "",
      tagline: newData?.tagline || "",
      mission: newData?.mission || "",
      description: newData?.description || "",
      summary: newData?.summary || "",
      category: newData?.category || "Beauty",
      themeColor: newData?.themeColor || "#DC2626",
      website: newData?.website || "",
      location: newData?.location || "",
      socialLinks: newData?.socialLinks || {
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: "",
        tiktok: "",
      },
      profileImage: newData?.profileImage || "",
      coverImage: newData?.coverImage || "",
      isPublished: newData?.isPublished ?? false
    });
  };

  return {
    formData,
    handleInputChange,
    handleSocialLinkChange,
    updateFormData,
    resetForm,
  };
};