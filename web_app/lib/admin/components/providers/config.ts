export const providerEditFields = [
  { name: 'name', label: 'Provider Name', type: 'text' as const, required: true },
  { name: 'specialty', label: 'Specialty', type: 'text' as const, required: true },
  { name: 'location', label: 'Location', type: 'text' as const, required: true },
  { 
    name: 'certificationLevel', 
    label: 'Certification Level', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'bronze', label: 'Bronze' },
      { value: 'silver', label: 'Silver' },
      { value: 'gold', label: 'Gold' },
      { value: 'platinum', label: 'Platinum' }
    ]
  },
  { name: 'profileImage', label: 'Profile Image', type: 'image' as const, contentType: 'provider' as const },
  { name: 'images', label: 'Portfolio Images', type: 'image-array' as const, contentType: 'provider' as const, maxImages: 8 },
  { name: 'bio', label: 'Bio', type: 'textarea' as const },
  { name: 'yearsExperience', label: 'Years of Experience', type: 'number' as const },
  { name: 'phone', label: 'Phone Number', type: 'text' as const },
  { name: 'email', label: 'Email', type: 'text' as const },
  { name: 'services', label: 'Services Offered', type: 'array' as const },
  { name: 'isVerified', label: 'Verified', type: 'checkbox' as const }
];