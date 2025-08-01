# Brand Pages Documentation

This document provides comprehensive guidance for working with the brand showcase pages in the GlamLink application.

## Overview

The brand pages module handles the public-facing brand showcase functionality, allowing visitors to browse brands, view their products, providers, transformations, and more. It follows a modular architecture with centralized type definitions and service-based data access.

## Directory Structure

```
/lib/pages/brand/
   components/            # React components
      AllBrandsPage.tsx # Brand listing page
      BrandPage.tsx     # Individual brand showcase
      cards/            # Reusable card components
      detail/           # Detail page components
      filters/          # Filter components
      grids/            # Grid layout components
      navigation/       # Navigation components
      sections/         # Page sections
   config/               # Configuration files
      index.ts         # Brand page configuration
   hooks/                # Custom React hooks
      useBrand.ts      # Brand data hook
   server/               # Server-side utilities
      firestoreServiceBrand.ts # Firestore operations
   store/                # Redux state management
      brandSlice.ts    # Brand Redux slice
   types/                # TypeScript definitions
       index.ts         # Centralized type exports
```

## Type System

All TypeScript interfaces and types are centralized in `/types/index.ts`:

### Core Types

```typescript
// Brand entity
export interface Brand {
  id: string;
  name: string;
  tagline: string;
  mission: string;
  description: string;
  // ... other properties
  products: Product[];
  certifiedProviders: CertifiedProvider[];
  beforeAfters: BeforeAfter[];
  trainingPrograms: TrainingProgram[];
  reviews: Review[];
}

// Product entity
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  // ... other properties
}

// Provider entity  
export interface CertifiedProvider {
  id: string;
  name: string;
  certificationLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  rating: number;
  // ... other properties
}
```

### Component Props Types

All component props interfaces follow a consistent naming pattern:

```typescript
export interface BrandPageProps {
  brand: Brand;
  isLoading?: boolean;
  error?: string | null;
}

export interface ProductCardProps {
  product: Product;
  brandSlug: string;
  onClick?: () => void;
}
```

## Component Patterns

### 1. Page Components

Page components handle data fetching and state management:

```typescript
// BrandPage.tsx
export default function BrandPage({ params }: { params: { id: string } }) {
  const { brand, isLoading, error } = useBrand(params.id);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!brand) return <NotFound />;
  
  return <BrandPageContent brand={brand} />;
}
```

### 2. Card Components

All card components follow a consistent pattern:

```typescript
// ProductCard.tsx
export default function ProductCard({ product, brandSlug }: ProductCardProps) {
  return (
    <Link href={`/brand/${brandSlug}/products/${product.id}`}>
      <div className="card-container">
        {/* Card content */}
      </div>
    </Link>
  );
}
```

### 3. Grid Components

Grid components handle responsive layouts:

```typescript
// ProductGrid.tsx
export default function ProductGrid({ products, brandSlug }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} brandSlug={brandSlug} />
      ))}
    </div>
  );
}
```

## State Management

The brand module uses Redux for state management with the `brandSlice`:

### Slice Structure

```typescript
interface BrandState {
  // All brands
  brands: Brand[];
  brandsLoading: boolean;
  brandsError: string | null;
  
  // Current brand
  currentBrand: Brand | null;
  currentBrandLoading: boolean;
  currentBrandError: string | null;
  
  // Filters
  selectedCategory: string;
  searchQuery: string;
}
```

### Usage in Components

```typescript
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBrand, setSelectedCategory } from '@/lib/pages/brand/store/brandSlice';

function BrandComponent() {
  const dispatch = useAppDispatch();
  const { currentBrand, currentBrandLoading } = useAppSelector(state => state.brand);
  
  useEffect(() => {
    dispatch(fetchBrand(brandId));
  }, [brandId, dispatch]);
}
```

## Server-Side Data Access

The `firestoreServiceBrand.ts` provides all Firestore operations:

### Available Methods

```typescript
// Fetch all brands
const brands = await firestoreServiceBrand.getAllBrands();

// Fetch single brand
const brand = await firestoreServiceBrand.getBrandById(brandId);

// Update brand arrays
await firestoreServiceBrand.addProduct(brandId, product);
await firestoreServiceBrand.updateProduct(brandId, productId, updates);
await firestoreServiceBrand.removeProduct(brandId, productId);
```

### Error Handling

All server methods include error handling with fallbacks:

```typescript
try {
  const brand = await firestoreServiceBrand.getBrandById(brandId);
  return brand;
} catch (error) {
  console.error('Error fetching brand:', error);
  return null; // or fallback data
}
```

## Routing Structure

```
/brand                          � All brands listing
/brand/[id]                     � Individual brand showcase
/brand/[id]/products/[productId] � Product detail page
/brand/[id]/providers/[providerId] � Provider profile page  
/brand/[id]/gallery/[transformationId] � Before/after detail
/brand/[id]/training/[programId] � Training program detail
```

## Common Tasks

### Adding a New Section to Brand Page

1. Create the section component in `/components/sections/`
2. Add the section type to the Brand interface if needed
3. Import and add to BrandPage component
4. Style with consistent spacing and responsive design

### Creating a New Detail Page

1. Create page in `/app/brand/[id]/[feature]/[itemId]/page.tsx`
2. Create detail component in `/components/detail/`
3. Add routing logic to the grid component
4. Include breadcrumb navigation and sharing

### Adding a New Filter

1. Add filter state to brandSlice
2. Create filter component in `/components/filters/`
3. Add filter logic to the data selector
4. Update the grid to respond to filter changes

## Best Practices

### 1. Type Safety
- Always use TypeScript interfaces from `/types/index.ts`
- Never use `any` type - define proper interfaces
- Use generic types for reusable components

### 2. Component Organization
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance

### 3. Performance
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize images with Next.js Image component
- Lazy load non-critical sections

### 4. Accessibility
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy

### 5. Error Handling
- Always handle loading and error states
- Provide meaningful error messages
- Include fallback UI for missing data
- Log errors for debugging

## Testing Considerations

### Component Testing
- Test all props variations
- Test loading and error states
- Test user interactions
- Mock Redux store for connected components

### Integration Testing
- Test page navigation
- Test data fetching
- Test filter interactions
- Test responsive behavior

## Future Enhancements

1. **Advanced Filtering**: Multi-select filters, price ranges
2. **Search Functionality**: Full-text search across brands
3. **Sorting Options**: Sort by popularity, rating, date
4. **Pagination**: For large brand collections
5. **Analytics Integration**: Track user interactions
6. **Social Features**: Share buttons, follow brands
7. **Comparison Tool**: Compare multiple brands/products