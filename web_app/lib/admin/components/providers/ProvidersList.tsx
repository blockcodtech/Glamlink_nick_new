"use client";

import { CertifiedProvider } from '@/lib/pages/brand/types';
import ProviderCard from './ProviderCard';

interface ProvidersListProps {
  providers: CertifiedProvider[];
  isLoading: boolean;
  hasBrand: boolean;
  onVerify: (providerId: string) => Promise<void>;
  onEdit: (provider: CertifiedProvider) => void;
  onDelete: (providerId: string) => Promise<void>;
}

export default function ProvidersList({ 
  providers, 
  isLoading, 
  hasBrand,
  onVerify, 
  onEdit, 
  onDelete 
}: ProvidersListProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading providers...</div>;
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">
          {hasBrand 
            ? "No providers found. Add your first certified provider or generate some with AI to get started."
            : "No brand associated with your account. Please contact support."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          onVerify={onVerify}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}