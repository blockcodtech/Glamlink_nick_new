# Redux-Powered Admin Hooks

This directory contains React hooks for managing admin functionality. We've recently migrated to Redux for centralized state management.

## Key Benefits of Redux Migration

1. **Single Source of Truth**: All profile/brand data is stored in one place
2. **Automatic Synchronization**: Updates in one component reflect everywhere
3. **Built-in Caching**: Data persists during navigation (no re-fetching)
4. **Better Performance**: Fewer API calls and re-renders
5. **Cleaner Code**: Components focus on UI, not data fetching

## New Redux-Powered Hooks

### useProfile()
Main hook for profile management. Connects to Redux store for all profile operations.

```typescript
const {
  user,              // Current user from auth state
  brand,             // User's brand data
  formData,          // Profile form data
  isLoading,         // Loading states
  isSaving,          // Saving state
  message,           // Success/error messages
  handleSubmit,      // Submit form changes
  handleInputChange, // Handle form inputs
  // ... other handlers
} = useProfile();
```

### useBrandProfile(brandId)
Manages brand data with Redux. Replaces the old `useBrandData` hook.

```typescript
const {
  brand,              // Brand data from Redux
  isLoading,         // Loading state
  error,             // Error state
  refetch,           // Force refresh
  updateBrand,       // Update brand in DB
  updateBrandImmediately, // Optimistic UI update
} = useBrandProfile(brandId);
```

### useContentManagement(contentType)
Manages brand content arrays (products, providers, etc.) with Redux.

```typescript
const {
  content,           // Array of items (products, providers, etc.)
  addItem,           // Add single item
  updateItem,        // Update item
  deleteItem,        // Delete item
  addMultipleItems,  // Add multiple items (AI generation)
  isLoading,         // Loading state
} = useContentManagement('products');
```

### useBrainstormIdeas()
Manages brainstorm ideas with Redux integration.

```typescript
const {
  generateIdeas,     // Generate AI ideas
  deleteIdea,        // Delete an idea
  isGenerating,      // Generation loading state
  error,             // Error state
} = useBrainstormIdeas();
```

### useQuestionnaireData(userId)
Manages questionnaire data with Redux.

```typescript
const {
  savedQuestionnaire, // Saved questionnaire data
  isLoading,          // Loading state
  error,              // Error state
  saveProgress,       // Save questionnaire progress
} = useQuestionnaireData(userId);
```

## Migration Examples

### Old Pattern (Local State)
```typescript
// Before - using local state
const [brand, setBrand] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchBrand().then(data => {
    setBrand(data);
    setLoading(false);
  });
}, []);
```

### New Pattern (Redux)
```typescript
// After - using Redux
const { brand, isLoading } = useBrandProfile(brandId);
// Data is automatically fetched and cached
```

### Component Example
```typescript
import { useContentManagement } from '@/lib/admin/hooks';

function ProductsTab() {
  const {
    content: products,
    addItem,
    updateItem,
    deleteItem,
    isLoading
  } = useContentManagement('products');

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={(updates) => updateItem(product.id, updates)}
          onDelete={() => deleteItem(product.id)}
        />
      ))}
      <button onClick={() => addItem(newProduct)}>
        Add Product
      </button>
    </div>
  );
}
```

## Legacy Hooks (Still Available)

Some hooks haven't been migrated yet and still use local state:
- `useBrandForm` - Form state management (could be migrated)
- `useBrandCreation` - Brand creation logic (now in profileSlice)
- `useImageUpload` - Image upload utilities
- Utility hooks (`useDebounce`, `useToggle`, etc.)

## Best Practices

1. **Use Redux hooks for data**: Prefer Redux-powered hooks for any data that needs to be shared
2. **Local state for UI**: Use local state only for component-specific UI state
3. **Dispatch actions**: Use dispatch for all data mutations
4. **Leverage caching**: Trust Redux caching instead of re-fetching
5. **Error handling**: Check Redux error states instead of try-catch

## Architecture

The Redux profile slice (`/store/slices/profileSlice.ts`) manages:
- Brand profile data
- Form state
- Questionnaire data
- Brainstorm ideas
- Loading/error states
- Success/error messages

All hooks connect to this central store, ensuring data consistency across the application.