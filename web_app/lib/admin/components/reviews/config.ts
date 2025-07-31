import { Product } from '@/lib/pages/brand/types';

export const getReviewEditFields = (products: Product[]) => [
  { name: 'userName', label: 'User Name', type: 'text' as const, required: true },
  { name: 'userImage', label: 'User Image', type: 'image' as const, contentType: 'review' as const },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' as const, required: true },
  { name: 'title', label: 'Review Title', type: 'text' as const },
  { name: 'comment', label: 'Review Comment', type: 'textarea' as const, required: true },
  { 
    name: 'productId', 
    label: 'Related Product', 
    type: 'select' as const, 
    options: products.map(p => ({ value: p.id, label: p.name })) 
  },
  { name: 'images', label: 'Review Images', type: 'image-array' as const, contentType: 'review' as const, maxImages: 5 },
  { name: 'verifiedPurchase', label: 'Verified Purchase', type: 'checkbox' as const },
  { name: 'helpfulCount', label: 'Helpful Count', type: 'number' as const }
];