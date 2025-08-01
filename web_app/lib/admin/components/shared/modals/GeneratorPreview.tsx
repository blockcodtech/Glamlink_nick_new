"use client";

import { GenerationType, GeneratorPreviewProps } from '@/lib/admin/types';

export default function GeneratorPreview({ 
  type, 
  items, 
  selectedItems, 
  onToggleSelection, 
  onToggleSelectAll 
}: GeneratorPreviewProps) {
  const renderItemPreview = (item: any, index: number) => {
    const isSelected = selectedItems.has(index);
    
    switch (type) {
      case 'products':
        return (
          <div className="flex items-start space-x-3">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">${item.price} - {item.category}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
            </div>
          </div>
        );
        
      case 'providers':
        return (
          <div className="flex items-start space-x-3">
            <img 
              src={item.profileImage} 
              alt={item.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.specialty} - {item.location}</p>
              <p className="text-sm text-gray-600 mt-1">
                {item.certificationLevel} • {item.yearsExperience} years experience
              </p>
            </div>
          </div>
        );
        
      case 'training':
        return (
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">
                ${item.price} - {item.duration} - {item.level}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
            </div>
          </div>
        );
        
      case 'reviews':
        return (
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.userName}</h4>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.comment}</p>
            </div>
          </div>
        );
        
      case 'beforeafter':
        return (
          <div className="flex items-start space-x-3">
            <div className="flex space-x-1">
              <img 
                src={item.beforeImage} 
                alt="Before" 
                className="w-16 h-16 rounded object-cover"
              />
              <img 
                src={item.afterImage} 
                alt="After" 
                className="w-16 h-16 rounded object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.treatmentType}</h4>
              <p className="text-sm text-gray-500">{item.duration}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-900">Generated Items</h4>
        <button
          type="button"
          onClick={onToggleSelectAll}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          {selectedItems.size === items.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item, index) => {
          const isSelected = selectedItems.has(index);
          return (
            <div
              key={index}
              onClick={() => onToggleSelection(index)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                isSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-transparent bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelection(index)}
                  className="mt-1 mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  {renderItemPreview(item, index)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="mt-4 text-sm text-gray-600 text-center">
        {selectedItems.size} of {items.length} items selected
      </p>
    </div>
  );
}