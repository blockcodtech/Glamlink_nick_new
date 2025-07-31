"use client";

interface SocialLinksFormProps {
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  onSocialLinkChange: (platform: string, value: string) => void;
}

export default function SocialLinksForm({ socialLinks, onSocialLinkChange }: SocialLinksFormProps) {
  const platforms = [
    { name: 'instagram', label: 'Instagram', placeholder: 'username' },
    { name: 'facebook', label: 'Facebook', placeholder: 'username or page' },
    { name: 'twitter', label: 'Twitter', placeholder: 'username' },
    { name: 'youtube', label: 'YouTube', placeholder: 'channel URL' },
    { name: 'tiktok', label: 'TikTok', placeholder: '@username' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {platforms.map((platform) => (
          <div key={platform.name}>
            <label className="block text-sm font-medium text-gray-700">
              {platform.label}
            </label>
            <input
              type="text"
              value={socialLinks[platform.name as keyof typeof socialLinks]}
              onChange={(e) => onSocialLinkChange(platform.name, e.target.value)}
              placeholder={platform.placeholder}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-glamlink-teal focus:ring-glamlink-teal sm:text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}