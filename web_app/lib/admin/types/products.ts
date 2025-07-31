// Product types

import { Product } from '@/lib/pages/brand/types';

export interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
  brandId: string;
}

export interface ProductItemProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  hasBrand: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => Promise<void>;
}