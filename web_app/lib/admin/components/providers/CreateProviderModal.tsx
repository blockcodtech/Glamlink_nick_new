"use client";

import EditModal from '../shared/modals/EditModal';
import { providerEditFields } from './config';

interface CreateProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export default function CreateProviderModal({ isOpen, onClose, onSave }: CreateProviderModalProps) {
  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      title="Create New Provider"
      fields={providerEditFields}
      initialData={{
        certificationLevel: 'bronze',
        isVerified: false
      }}
    />
  );
}