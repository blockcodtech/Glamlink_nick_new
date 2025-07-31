"use client";

import { CertifiedProvider } from '@/lib/pages/brand/types';

interface ProviderCardProps {
  provider: CertifiedProvider;
  onVerify: (providerId: string) => Promise<void>;
  onEdit: (provider: CertifiedProvider) => void;
  onDelete: (providerId: string) => Promise<void>;
}

export default function ProviderCard({ provider, onVerify, onEdit, onDelete }: ProviderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col min-h-[320px]">
      <div className="flex items-center mb-4">
        <img
          src={provider.profileImage}
          alt={provider.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900">{provider.name}</h3>
          <p className="text-sm text-gray-500">{provider.specialty}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm flex-grow">
        <div className="flex justify-between">
          <span className="text-gray-500">Location:</span>
          <span className="text-gray-900">{provider.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Rating:</span>
          <span className="text-gray-900 flex items-center">
            <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {provider.rating} ({provider.reviewCount})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level:</span>
          <span className={`capitalize ${
            provider.certificationLevel === 'platinum' ? 'text-purple-600' :
            provider.certificationLevel === 'gold' ? 'text-yellow-600' :
            provider.certificationLevel === 'silver' ? 'text-gray-600' :
            'text-orange-600'
          }`}>
            {provider.certificationLevel}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={provider.isVerified ? 'text-green-600' : 'text-yellow-600'}>
            {provider.isVerified ? '✓ Verified' : 'Pending'}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        {!provider.isVerified ? (
          <button
            onClick={() => onVerify(provider.id)}
            className="flex-1 bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700"
          >
            Verify
          </button>
        ) : (
          <button 
            className="flex-1 bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700"
          >
            View Profile
          </button>
        )}
        <button 
          onClick={() => onEdit(provider)}
          className="flex-1 bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-300"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(provider.id)}
          className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}