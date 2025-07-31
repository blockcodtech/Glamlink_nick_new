export const productEditFields = [
  { name: 'name', label: 'Product Name', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { name: 'price', label: 'Current Price ($)', type: 'number' as const, required: true },
  { name: 'originalPrice', label: 'Original Price ($)', type: 'number' as const, placeholder: 'Leave empty if not on sale' },
  { 
    name: 'category', 
    label: 'Category', 
    type: 'select' as const, 
    required: true,
    options: [
      { value: 'skincare', label: 'Skincare' },
      { value: 'makeup', label: 'Makeup' },
      { value: 'haircare', label: 'Haircare' },
      { value: 'fragrance', label: 'Fragrance' },
      { value: 'tools', label: 'Tools & Accessories' }
    ]
  },
  { name: 'image', label: 'Main Image', type: 'image' as const, contentType: 'product' as const },
  { name: 'images', label: 'Additional Images', type: 'image-array' as const, contentType: 'product' as const, maxImages: 5 },
  { name: 'ingredients', label: 'Key Ingredients', type: 'array' as const },
  { name: 'benefits', label: 'Benefits', type: 'array' as const },
  { name: 'usage', label: 'How to Use', type: 'textarea' as const },
  { name: 'inStock', label: 'In Stock', type: 'checkbox' as const },
  { name: 'isSpotlight', label: 'Spotlight Product', type: 'checkbox' as const },
  { name: 'beforeImagePrimary', label: 'Before Image Primary', type: 'image' as const, contentType: 'product' as const },
  { name: 'beforeImages', label: 'Before Images', type: 'image-array' as const, contentType: 'product' as const, maxImages: 5 },
  { name: 'afterImagePrimary', label: 'After Image Primary', type: 'image' as const, contentType: 'product' as const },
  { name: 'afterImages', label: 'After Images', type: 'image-array' as const, contentType: 'product' as const, maxImages: 5 }
];