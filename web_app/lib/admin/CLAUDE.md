# Admin Panel Documentation

This document provides comprehensive guidance for working with the admin panel components and systems in the GlamLink application.

## Overview

The admin module provides a complete brand management system with role-based access control, allowing brand owners to manage all aspects of their digital storefront. It features centralized type definitions, Redux state management, and AI-powered content generation.

## Directory Structure

```
/lib/admin/
   components/              # React components
      brainstorm/         # Brainstorming components
      fields/             # Form field components  
      products/           # Product management
      profile/            # Profile management
      providers/          # Provider management
      questionnaire/      # Brand setup wizard
      reviews/            # Review management
      shared/             # Shared components
         dialogs/       # Dialog components
         modals/        # Modal components
      training/           # Training management
   config.ts               # Admin configuration
   hooks/                  # Custom React hooks
      auth/              # Authentication hooks
      brand/             # Brand data hooks
      ideas/             # Brainstorm hooks
      images/            # Image upload hooks
      ...                # Feature-specific hooks
   store/                  # Redux state management
      adminProfileSlice.ts # Admin profile Redux slice
   types/                  # TypeScript definitions
      brainstorm.ts      # Brainstorm types
      components.ts      # Base component types
      fields.ts          # Form field types
      forms.ts           # Form configuration types
      hooks.ts           # Hook-related types
      modals.ts          # Modal component types
      products.ts        # Product types
      profile.ts         # Profile types
      providers.ts       # Provider types
      questionnaire.ts   # Questionnaire types
      reviews.ts         # Review types
      training.ts        # Training types
      index.ts           # Central type exports
   utils/                  # Utility functions
       requirementsParser.ts # File upload parser
```

## Type System Organization

All TypeScript types are centralized in the `/types/` directory:

### Type File Structure

Each feature has its own type file:

```typescript
// training.ts - Example type file
export interface TrainingProgram {
  id: string;
  title: string;
  duration: string;
  price: number;
  // ... other properties
}

export interface TrainingListProps {
  programs: TrainingProgram[];
  isLoading: boolean;
  hasBrand: boolean;
  onEdit: (program: TrainingProgram) => void;
  onDelete: (programId: string) => Promise<void>;
}

export interface CreateTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (program: Omit<TrainingProgram, 'id'>) => Promise<void>;
  brandId: string;
}
```

### Importing Types

All types can be imported from the central index:

```typescript
import { 
  TrainingProgram, 
  TrainingListProps,
  FieldConfig,
  EditModalProps 
} from '@/lib/admin/types';
```

## Redux State Management

The admin module uses `adminProfileSlice` for centralized state management:

### State Structure

```typescript
interface AdminProfileState {
  // Brand data
  brand: Brand | null;
  
  // UI states
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  error: string | null;
  
  // Form states
  profileFormData: Partial<Brand> | null;
  hasUnsavedChanges: boolean;
  
  // Questionnaire state
  questionnaireData: any | null;
  questionnaireProgress: string | null;
  
  // Brainstorm ideas
  brainstormIdeas: BrainstormIdea[];
  selectedIdeaId: string | null;
  
  // Upload states
  uploadingImages: {
    profile: boolean;
    cover: boolean;
  };
  
  // Tab state
  activeTab: string;
}
```

### Using the Profile Store

Two approaches are available:

#### 1. Low-Level Hook (Direct Access)

```typescript
import { useProfileStore } from '@/lib/admin/hooks/useProfileStore';

function MyComponent() {
  const {
    brand,
    isLoading,
    loadBrandProfile,
    saveBrandProfile,
    updateForm
  } = useProfileStore();
  
  // Use the state and actions directly
}
```

#### 2. High-Level Hooks (Pre-configured)

```typescript
import { useAdminProfile } from '@/lib/admin/hooks/useAdminProfile';

function ProfileForm() {
  const {
    brand,
    formData,
    handleInputChange,
    handleSubmit,
    handleProfileImageUpload
  } = useAdminProfile();
  
  // Pre-configured with common patterns
}
```

## Component Patterns

### 1. Tab Components

Each admin tab follows a consistent pattern:

```typescript
export default function ProductsTab() {
  const { brand, isLoading } = useProfileStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  if (isLoading) return <LoadingSpinner />;
  if (!brand) return <EmptyState message="No brand found" />;
  
  return (
    <div>
      <TabHeader onCreateClick={() => setShowCreateModal(true)} />
      <ProductsList products={brand.products} />
      {showCreateModal && <CreateProductModal />}
    </div>
  );
}
```

### 2. Modal Components

All modals use consistent interfaces:

```typescript
interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  brandId: string;
}
```

### 3. Form Components

Forms use the `FieldConfig` pattern:

```typescript
const fields: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'category', label: 'Category', type: 'select', options: [...] },
  { name: 'image', label: 'Image', type: 'image', contentType: 'product' }
];

<EditModal fields={fields} onSave={handleSave} />
```

## AI Integration

### Content Generation

```typescript
import { useAIGenerator } from '@/lib/admin/hooks/useAIGenerator';

function ProductsTab() {
  const { generateItems, isGenerating } = useAIGenerator('products', brandId);
  
  const handleGenerate = async () => {
    const items = await generateItems({ count: 5 });
    // Items are automatically saved to the brand
  };
}
```

### Image Generation

```typescript
import { useImageGenerator } from '@/lib/admin/hooks/useImageGenerator';

function ImageField() {
  const { generateImages, isGenerating } = useImageGenerator('product-main', brand);
  
  const handleGenerate = async () => {
    const images = await generateImages({ count: 3 });
    // Use the generated images
  };
}
```

## Migration Guide

### From Local State to Redux

See `MIGRATION_GUIDE.md` for detailed instructions on migrating components from local state to Redux store.

Key benefits:
- Single source of truth
- Automatic synchronization
- Built-in caching
- Cleaner component code

## Common Tasks

### Adding a New Admin Tab

1. Create component in `/components/[TabName]Tab.tsx`
2. Add tab type to `AdminTab` in `config.ts`
3. Add to `ALL_ADMIN_TABS` array
4. Update `getAdminTabsForUser()` if needed
5. Add case in admin page renderer

### Creating a New Type File

1. Create file in `/types/[feature].ts`
2. Define all interfaces for that feature
3. Export from `/types/index.ts`
4. Update components to import from centralized location

### Adding AI Generation

1. Add generation config to `useAIGenerator` hook
2. Create generator modal if needed
3. Add "Generate with AI" button to tab
4. Handle generated items in Redux

### Implementing CRUD Operations

1. Use Firestore service methods for data operations
2. Update Redux state after successful operations
3. Show loading states during operations
4. Handle errors gracefully

## Best Practices

### 1. Type Safety
- Always define interfaces in `/types/`
- Never use `any` - create proper types
- Use centralized type imports
- Keep types close to their feature

### 2. State Management
- Use Redux for shared state
- Local state only for UI-specific data
- Let Redux handle loading/error states
- Check thunk results when needed

### 3. Component Organization
- One component per file
- Group by feature, not by type
- Keep components focused
- Extract reusable logic to hooks

### 4. Error Handling
- Always handle loading states
- Show meaningful error messages
- Provide fallback UI
- Log errors for debugging

### 5. Performance
- Use React.memo for expensive components
- Implement pagination for large lists
- Optimize bundle size with lazy loading
- Cache AI-generated content

## Authentication & Authorization

### Role-Based Access

Two user types with different permissions:

1. **Super Admin** (admin@glamlink.com)
   - Only sees Settings tab
   - Can initialize database
   - System-wide management

2. **Brand Owners** (all other users)
   - See all tabs except Settings
   - Manage their own brand
   - Full CRUD operations

### Protected Routes

```typescript
// Check user role in components
const { user } = useAuth();
const isAdmin = user?.email === 'admin@glamlink.com';

if (!user) return <Redirect to="/login" />;
if (isAdmin && tab !== 'settings') return <Redirect to="/admin?tab=settings" />;
```

## Testing Patterns

### Component Testing
```typescript
// Mock the Redux store
const mockStore = configureStore({
  reducer: { adminProfile: adminProfileReducer },
  preloadedState: { adminProfile: mockInitialState }
});

// Wrap component with provider
render(
  <Provider store={mockStore}>
    <ProductsTab />
  </Provider>
);
```

### Hook Testing
```typescript
// Test custom hooks with renderHook
const { result } = renderHook(() => useAdminProfile(), {
  wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
});
```

## Troubleshooting

### Common Issues

1. **Types not found**
   - Ensure importing from `@/lib/admin/types`
   - Check if type is exported from index.ts
   - Verify type file exists

2. **Redux state not updating**
   - Check if action is dispatched
   - Verify reducer handles the action
   - Ensure using correct selector

3. **AI generation fails**
   - Check API keys in environment
   - Verify brand context is provided
   - Check network connectivity

4. **Image upload errors**
   - Verify file size limits
   - Check Firebase storage rules
   - Ensure proper authentication

## Future Enhancements

1. **Advanced Analytics**: Track user behavior and conversions
2. **Bulk Operations**: Select and modify multiple items
3. **Import/Export**: CSV upload for products/providers
4. **Scheduling**: Schedule content publication
5. **A/B Testing**: Test different product descriptions
6. **Multi-language**: Support for multiple languages
7. **Mobile App**: Native admin mobile application