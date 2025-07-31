import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadMetadata
} from 'firebase/storage';
import { storage } from '@/lib/config/firebase';

// Type guard for storage
const storageTyped = storage as any;

class StorageService {
  private checkStorage() {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Check your environment variables.');
    }
  }

  async uploadImage(
    file: File | Blob,
    path: string,
    metadata?: UploadMetadata
  ): Promise<string> {
    try {
      this.checkStorage();
      const storageRef = ref(storageTyped, path);
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error: any) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async uploadUserProfileImage(userId: string, file: File | Blob): Promise<string> {
    const path = `users/${userId}/profile.jpg`;
    return await this.uploadImage(file, path, {
      contentType: 'image/jpeg',
      customMetadata: {
        uploadedBy: userId,
        type: 'profile'
      }
    });
  }

  async uploadBrandProfileImage(
    brandId: string,
    file: File | Blob
  ): Promise<string> {
    const path = `brands/${brandId}/profile.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        imageType: 'profile',
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadBrandCoverImage(
    brandId: string,
    file: File | Blob
  ): Promise<string> {
    const path = `brands/${brandId}/cover.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        imageType: 'cover',
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadBrandProductImage(
    brandId: string,
    productId: string,
    file: File | Blob,
    imageType: 'main' | 'additional' = 'main'
  ): Promise<string> {
    const timestamp = Date.now();
    const path = `brands/${brandId}/products/${productId}/${imageType}_${timestamp}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        productId,
        imageType,
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadBrandProviderImage(
    brandId: string,
    providerId: string,
    file: File | Blob,
    imageType: 'profile' | 'portfolio' = 'profile'
  ): Promise<string> {
    const timestamp = Date.now();
    const path = `brands/${brandId}/providers/${providerId}/${imageType}_${timestamp}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        providerId,
        imageType,
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadBrandBeforeAfterImage(
    brandId: string,
    transformationId: string,
    file: File | Blob,
    imageType: 'before' | 'after'
  ): Promise<string> {
    const path = `brands/${brandId}/transformations/${transformationId}/${imageType}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        transformationId,
        imageType,
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadBrandTrainingImage(
    brandId: string,
    trainingId: string,
    file: File | Blob
  ): Promise<string> {
    const timestamp = Date.now();
    const path = `brands/${brandId}/training/${trainingId}/cert_${timestamp}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        trainingId,
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadBrandReviewImage(
    brandId: string,
    reviewId: string,
    file: File | Blob,
    index: number
  ): Promise<string> {
    const path = `brands/${brandId}/reviews/${reviewId}/image_${index}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        brandId,
        reviewId,
        imageIndex: index.toString(),
        uploadedAt: new Date().toISOString()
      }
    });
  }

  async uploadAnalysisImage(
    userId: string,
    analysisId: string,
    file: File | Blob
  ): Promise<string> {
    const path = `users/${userId}/analyses/${analysisId}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: 'image/jpeg',
      customMetadata: {
        uploadedBy: userId,
        type: 'analysis'
      }
    });
  }

  async uploadPortfolioImage(
    professionalId: string,
    file: File | Blob,
    imageId: string
  ): Promise<string> {
    const path = `professionals/${professionalId}/portfolio/${imageId}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: 'image/jpeg',
      customMetadata: {
        uploadedBy: professionalId,
        type: 'portfolio'
      }
    });
  }

  async uploadReviewImage(
    reviewId: string,
    imageIndex: number,
    file: File | Blob
  ): Promise<string> {
    const path = `reviews/${reviewId}/image_${imageIndex}.jpg`;
    return await this.uploadImage(file, path, {
      contentType: 'image/jpeg',
      customMetadata: {
        type: 'review'
      }
    });
  }

  async deleteImage(path: string): Promise<void> {
    try {
      const storageRef = ref(storageTyped, path);
      await deleteObject(storageRef);
    } catch (error: any) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  async deleteUserImages(userId: string): Promise<void> {
    try {
      const userRef = ref(storageTyped, `users/${userId}`);
      const listResult = await listAll(userRef);
      
      const deletePromises = listResult.items.map(item => deleteObject(item));
      await Promise.all(deletePromises);
    } catch (error: any) {
      throw new Error(`Failed to delete user images: ${error.message}`);
    }
  }

  async deleteProfessionalPortfolio(professionalId: string): Promise<void> {
    try {
      const portfolioRef = ref(storageTyped, `professionals/${professionalId}/portfolio`);
      const listResult = await listAll(portfolioRef);
      
      const deletePromises = listResult.items.map(item => deleteObject(item));
      await Promise.all(deletePromises);
    } catch (error: any) {
      throw new Error(`Failed to delete portfolio: ${error.message}`);
    }
  }

  getImageUrl(path: string): Promise<string> {
    const storageRef = ref(storageTyped, path);
    return getDownloadURL(storageRef);
  }

  async compressImage(
    file: File | Blob,
    maxWidth: number = 1200,
    maxHeight: number = 1200,
    quality: number = 0.8
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            quality
          );
        };
      };
    });
  }
}

export default new StorageService();