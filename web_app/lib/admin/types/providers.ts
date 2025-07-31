// Provider types

import { CertifiedProvider } from '@/lib/pages/brand/types';

export interface CreateProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (provider: Omit<CertifiedProvider, 'id'>) => Promise<void>;
  brandId: string;
}

export interface ProviderCardProps {
  provider: CertifiedProvider;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ProvidersListProps {
  providers: CertifiedProvider[];
  isLoading: boolean;
  hasBrand: boolean;
  onEdit: (provider: CertifiedProvider) => void;
  onDelete: (providerId: string) => Promise<void>;
}