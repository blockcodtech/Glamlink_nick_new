import firestoreService from '@/lib/services/firebase/firestoreService';
import { Brand } from '../types';

// ============================================
// BRAND READ SERVICE - READ-ONLY OPERATIONS
// ============================================

class BrandReadService {
  // Get complete brand data including all nested arrays
  async getBrandData(brandId: string) {
    try {
      // Fetch only the brand document - it now contains all nested data
      const brand = await firestoreService.getDocument<Brand>('brands', brandId);
      
      if (!brand) {
        return null;
      }

      // Initialize arrays if they don't exist
      brand.products = brand.products || [];
      brand.certifiedProviders = brand.certifiedProviders || [];
      brand.beforeAfters = brand.beforeAfters || [];
      brand.trainingPrograms = brand.trainingPrograms || [];
      brand.reviews = brand.reviews || [];

      // Return in the expected format for backward compatibility
      return {
        brand,
        products: brand.products,
        providers: brand.certifiedProviders,
        beforeAfters: brand.beforeAfters,
        programs: brand.trainingPrograms,
        reviews: brand.reviews
      };
    } catch (error: any) {
      // Error fetching brand data
      return null;
    }
  }

  // Get all brands (for brand listing page)
  async getAllBrands(): Promise<Brand[]> {
    try {
      return await firestoreService.getDocuments<Brand>('brands');
    } catch (error: any) {
      // Error fetching all brands
      return [];
    }
  }

  // Get a single brand document
  async getBrand(brandId: string): Promise<Brand | null> {
    return await firestoreService.getDocument<Brand>('brands', brandId);
  }

  // Alias for getDocuments for backward compatibility
  async getDocuments<T>(collection: string): Promise<T[]> {
    return await firestoreService.getDocuments<T>(collection);
  }
}

// Export singleton instance
const brandReadService = new BrandReadService();
export default brandReadService;