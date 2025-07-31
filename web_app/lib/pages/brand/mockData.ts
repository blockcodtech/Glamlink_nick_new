import { Brand, Product, CertifiedProvider, BeforeAfter, TrainingProgram, Review } from "./types";

export const mockBrand: Brand = {
  id: 'glamour_beauty_co',
  name: 'Glamour Beauty Co.',
  tagline: 'Elevate Your Natural Beauty',
  mission: 'Empowering beauty professionals and enthusiasts with premium products and expert training.',
  description: 'Leading beauty brand specializing in professional-grade skincare, innovative makeup solutions, and comprehensive beauty education programs.',
  profileImage: 'https://picsum.photos/150/150',
  coverImage: 'https://source.unsplash.com/400x200/?beauty,cosmetics',
  website: 'https://glamourbeauty.com',
  socialLinks: {
    instagram: '@glamourbeautyco',
    facebook: 'GlamourBeautyCo',
    youtube: 'GlamourBeautyOfficial',
    tiktok: '@glamourbeauty'
  },
  location: 'Los Angeles, CA',
  isFollowing: false,
  followerCount: 125000,
  ownerId: 'melanie_user_id',
  products: [],
  certifiedProviders: [],
  beforeAfters: [],
  trainingPrograms: [],
  reviews: [],
  createdAt: '2020-01-15T00:00:00.000Z',
  updatedAt: new Date().toISOString()
};

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Vitamin C Brightening Serum',
    price: 78,
    image: 'https://source.unsplash.com/300x300/?serum,skincare',
    category: 'skincare',
    skinType: ['all'],
    description: 'Advanced brightening serum with 20% Vitamin C complex for radiant, even-toned skin.',
    ingredients: ['Vitamin C (20%)', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    benefits: ['Brightens skin tone', 'Reduces dark spots', 'Boosts collagen production', 'Antioxidant protection'],
    usage: 'Apply 2-3 drops to clean face and neck in the morning. Follow with moisturizer and SPF.',
    isSpotlight: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 1250,
    createdAt: '2023-06-01'
  },
  {
    id: 'prod_2',
    name: 'Hydra-Luxe Moisturizer',
    price: 52,
    image: 'https://source.unsplash.com/300x300/?moisturizer,cream',
    category: 'skincare',
    skinType: ['dry', 'normal', 'combination'],
    description: 'Rich, hydrating moisturizer with ceramides and peptides for plump, youthful skin.',
    isSpotlight: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 890,
    createdAt: '2023-05-15'
  },
  {
    id: 'prod_3',
    name: 'Perfect Coverage Foundation',
    price: 42,
    image: 'https://source.unsplash.com/300x300/?foundation,makeup',
    category: 'makeup',
    description: 'Buildable, long-wearing foundation with a natural finish. Available in 30 shades.',
    isSpotlight: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 2100,
    createdAt: '2023-04-01'
  },
  {
    id: 'prod_4',
    name: 'Repair & Restore Hair Mask',
    price: 38,
    image: 'https://source.unsplash.com/300x300/?hair,mask',
    category: 'haircare',
    description: 'Intensive treatment mask for damaged hair with keratin and argan oil.',
    isSpotlight: false,
    inStock: false,
    rating: 4.5,
    reviewCount: 650,
    createdAt: '2023-07-20'
  },
  {
    id: 'prod_5',
    name: 'Professional Brush Set',
    price: 78,
    image: 'https://source.unsplash.com/300x300/?makeup,brushes',
    category: 'tools',
    description: '12-piece professional makeup brush set with ergonomic handles and premium synthetic fibers.',
    isSpotlight: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 450,
    createdAt: '2023-03-10'
  },
  {
    id: 'prod_6',
    name: 'Beauty Boost Collagen',
    price: 45,
    image: 'https://source.unsplash.com/300x300/?supplements,pills',
    category: 'supplements',
    description: 'Marine collagen supplement for skin, hair, and nail health. 30-day supply.',
    isSpotlight: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 380,
    createdAt: '2023-08-05'
  }
];

export const mockProviders: CertifiedProvider[] = [
  {
    id: 'prov_1',
    name: 'Sarah Mitchell',
    profileImage: 'https://picsum.photos/200/200?random=1',
    specialty: 'Advanced Skincare & Anti-Aging',
    location: 'Beverly Hills, CA',
    rating: 4.9,
    reviewCount: 156,
    certificationDate: '2022-03-15',
    certificationLevel: 'platinum',
    isVerified: true
  },
  {
    id: 'prov_2',
    name: 'Jessica Chen',
    profileImage: 'https://picsum.photos/200/200?random=2',
    specialty: 'Bridal Makeup & Hair',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 203,
    certificationDate: '2021-11-20',
    certificationLevel: 'gold',
    isVerified: true
  },
  {
    id: 'prov_3',
    name: 'Maria Rodriguez',
    profileImage: 'https://picsum.photos/200/200?random=3',
    specialty: 'Corrective Skincare',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 89,
    certificationDate: '2023-01-10',
    certificationLevel: 'silver',
    isVerified: false
  },
  {
    id: 'prov_4',
    name: 'Emma Thompson',
    profileImage: 'https://picsum.photos/200/200?random=4',
    specialty: 'Natural Beauty Enhancement',
    location: 'New York, NY',
    rating: 4.6,
    reviewCount: 67,
    certificationDate: '2023-06-05',
    certificationLevel: 'bronze',
    isVerified: true
  }
];

export const mockBeforeAfters: BeforeAfter[] = [
  {
    id: 'ba_1',
    beforeImage: 'https://source.unsplash.com/400x400/?face,before',
    afterImage: 'https://source.unsplash.com/400x400/?face,after',
    treatmentType: 'Vitamin C Brightening Treatment',
    duration: '8 weeks',
    description: 'Dramatic improvement in skin tone and texture using our Vitamin C serum protocol.',
    providerId: 'prov_1',
    productIds: ['prod_1'],
    createdAt: '2023-09-01'
  },
  {
    id: 'ba_2',
    beforeImage: 'https://source.unsplash.com/400x400/?skin,problem',
    afterImage: 'https://source.unsplash.com/400x400/?skin,clear',
    treatmentType: 'Acne Clear Protocol',
    duration: '12 weeks',
    description: 'Complete acne clearing using our professional treatment system.',
    providerId: 'prov_3',
    createdAt: '2023-08-15'
  },
  {
    id: 'ba_3',
    beforeImage: 'https://source.unsplash.com/400x400/?aging,skin',
    afterImage: 'https://source.unsplash.com/400x400/?young,skin',
    treatmentType: 'Anti-Aging Transformation',
    duration: '16 weeks',
    description: 'Visible reduction in fine lines and improved skin elasticity.',
    providerId: 'prov_1',
    productIds: ['prod_1', 'prod_2'],
    createdAt: '2023-07-20'
  },
  {
    id: 'ba_4',
    beforeImage: 'https://source.unsplash.com/400x400/?dull,skin',
    afterImage: 'https://source.unsplash.com/400x400/?glowing,skin',
    treatmentType: 'Glow Boost Treatment',
    duration: '6 weeks',
    description: 'Achieved radiant, glowing skin with our hydration protocol.',
    providerId: 'prov_2',
    productIds: ['prod_2'],
    createdAt: '2023-09-10'
  }
];

export const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: 'train_1',
    name: 'Professional Skincare Certification',
    description: 'Comprehensive training on advanced skincare techniques, product knowledge, and client consultation.',
    duration: '6 weeks',
    level: 'intermediate',
    certificationOffered: true,
    price: 1200,
    enrollmentCount: 45,
    nextSessionDate: '2024-02-01',
    image: 'https://source.unsplash.com/400x300/?training,skincare'
  },
  {
    id: 'train_2',
    name: 'Makeup Artistry Masterclass',
    description: 'Learn professional makeup techniques from industry experts. Perfect for aspiring makeup artists.',
    duration: '4 weeks',
    level: 'beginner',
    certificationOffered: true,
    price: 800,
    enrollmentCount: 62,
    nextSessionDate: '2024-01-15',
    image: 'https://source.unsplash.com/400x300/?makeup,class'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev_1',
    userId: 'user_1',
    userName: 'Amanda K.',
    userImage: 'https://picsum.photos/50/50?random=5',
    rating: 5,
    title: 'Life-changing skincare!',
    comment: 'The Vitamin C serum completely transformed my skin. Dark spots are gone and my complexion is so bright!',
    images: ['https://source.unsplash.com/200x200/?skincare,results'],
    helpfulCount: 124,
    verifiedPurchase: true,
    productId: 'prod_1',
    createdAt: '2023-09-05'
  },
  {
    id: 'rev_2',
    userId: 'user_2',
    userName: 'Rachel M.',
    userImage: 'https://picsum.photos/50/50?random=6',
    rating: 4,
    comment: 'Great training program! Learned so much about professional skincare. The certification really boosted my career.',
    helpfulCount: 89,
    verifiedPurchase: true,
    createdAt: '2023-08-20'
  },
  {
    id: 'rev_3',
    userId: 'user_3',
    userName: 'Lisa T.',
    userImage: 'https://picsum.photos/50/50?random=7',
    rating: 5,
    title: 'Best foundation ever!',
    comment: 'Perfect coverage without feeling heavy. Lasts all day and the shade match is perfect.',
    helpfulCount: 67,
    verifiedPurchase: true,
    productId: 'prod_3',
    createdAt: '2023-09-12'
  }
];