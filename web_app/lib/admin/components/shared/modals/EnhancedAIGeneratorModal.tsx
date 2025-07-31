"use client";

import { useState } from "react";
import { Product, CertifiedProvider, TrainingProgram, Review, BeforeAfter } from "@/lib/pages/brand/types";
import Image from "next/image";

export type GenerationType = 'products' | 'providers' | 'training' | 'reviews' | 'beforeafter';

interface EnhancedAIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: GenerationType;
  brandId: string;
  onGenerate: (items: any[]) => void;
}

const typeConfig = {
  products: {
    title: 'Generate Products with AI',
    description: 'AI will create professional product listings based on your description.',
    endpoint: '/api/ai/generate-products',
    defaultCount: 3,
    maxCount: 10,
    placeholder: 'Example: Create a vitamin C serum for sensitive skin that targets dark spots and provides antioxidant protection...',
  },
  providers: {
    title: 'Generate Providers with AI',
    description: 'AI will create certified provider profiles based on your description.',
    endpoint: '/api/ai/generate-providers',
    defaultCount: 4,
    maxCount: 10,
    placeholder: 'Example: Create a skincare specialist with 10 years experience in anti-aging treatments and acne solutions...',
  },
  training: {
    title: 'Generate Training Programs with AI',
    description: 'AI will create professional training programs based on your description.',
    endpoint: '/api/ai/generate-training',
    defaultCount: 2,
    maxCount: 5,
    placeholder: 'Example: Create a beginner-friendly makeup artistry course that covers foundation matching and contouring...',
  },
  reviews: {
    title: 'Generate Reviews with AI',
    description: 'AI will create sample reviews based on your description.',
    endpoint: '/api/ai/generate-reviews',
    defaultCount: 3,
    maxCount: 10,
    placeholder: 'Example: Create positive reviews for a hydrating moisturizer from customers with dry skin...',
  },
  beforeafter: {
    title: 'Generate Before/After Examples',
    description: 'AI will create transformation examples based on your description.',
    endpoint: '/api/ai/generate-beforeafter',
    defaultCount: 2,
    maxCount: 5,
    placeholder: 'Example: Create a transformation showing acne treatment results over 12 weeks using our clear skin protocol...',
  },
};

export default function EnhancedAIGeneratorModal({ isOpen, onClose, type, brandId, onGenerate }: EnhancedAIGeneratorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [options, setOptions] = useState({
    count: typeConfig[type].defaultCount,
    customPrompt: '',
    generateImages: false,
    category: '',
    priceRange: { min: 20, max: 200 },
  });
  const [showPreview, setShowPreview] = useState(false);

  const config = typeConfig[type];

  const handleGenerate = async () => {
    if (!options.customPrompt.trim()) {
      alert('Please describe what you want to generate');
      return;
    }

    setIsGenerating(true);
    setGeneratedItems([]);
    setSelectedItems(new Set());
    setShowPreview(false);

    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId,
          ...options,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setGeneratedItems(data.data);
        setSelectedItems(new Set(data.data.map((_: any, index: number) => index)));
        setShowPreview(true);
      } else {
        alert(data.error || 'Failed to generate content');
      }
    } catch (error) {
      // Generation error occurred
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const itemsToSave = generatedItems.filter((_, index) => selectedItems.has(index));
    onGenerate(itemsToSave);
    onClose();
  };

  const toggleItemSelection = (index: number) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedItems(newSelection);
  };

  const renderPreviewItem = (item: any, index: number) => {
    const isSelected = selectedItems.has(index);
    
    switch (type) {
      case 'products':
        return (
          <div key={index} className={`border rounded-lg p-4 ${isSelected ? 'border-glamlink-teal bg-glamlink-teal/5' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItemSelection(index)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {item.image && (
                      <div className="relative h-48 w-full mb-3 bg-gray-100 rounded">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.name}
                          fill
                          className="object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                          }}
                        />
                      </div>
                    )}
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-lg font-bold text-glamlink-teal">${item.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                    {item.ingredients && (
                      <p className="text-xs text-gray-500">
                        <strong>Ingredients:</strong> {item.ingredients.join(', ')}
                      </p>
                    )}
                    {item.benefits && (
                      <p className="text-xs text-gray-500 mt-1">
                        <strong>Benefits:</strong> {item.benefits.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'providers':
        return (
          <div key={index} className={`border rounded-lg p-4 ${isSelected ? 'border-glamlink-teal bg-glamlink-teal/5' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItemSelection(index)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  {item.profileImage && (
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.profileImage}
                        alt={item.imageAlt || item.name}
                        fill
                        className="object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Provider';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.specialty}</p>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                      item.certificationLevel === 'platinum' ? 'bg-purple-100 text-purple-800' :
                      item.certificationLevel === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                      item.certificationLevel === 'silver' ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {item.certificationLevel} certified
                    </span>
                    {item.bio && <p className="text-sm text-gray-700 mt-2">{item.bio}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'training':
        return (
          <div key={index} className={`border rounded-lg p-4 ${isSelected ? 'border-glamlink-teal bg-glamlink-teal/5' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItemSelection(index)}
                className="mt-1"
              />
              <div className="flex-1">
                {item.image && (
                  <div className="relative h-48 w-full mb-3 bg-gray-100 rounded">
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.name}
                      fill
                      className="object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Training+Program';
                      }}
                    />
                  </div>
                )}
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-700 my-2">{item.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span><strong>Duration:</strong> {item.duration}</span>
                  <span><strong>Level:</strong> {item.level}</span>
                  <span><strong>Price:</strong> ${item.price}</span>
                  {item.certificationOffered && <span className="text-green-600">✓ Certificate</span>}
                </div>
              </div>
            </div>
          </div>
        );

      case 'beforeafter':
        return (
          <div key={index} className={`border rounded-lg p-4 ${isSelected ? 'border-glamlink-teal bg-glamlink-teal/5' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItemSelection(index)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Before</p>
                    <div className="relative h-48 w-full bg-gray-100 rounded">
                      <Image
                        src={item.beforeImage}
                        alt={item.beforeImageAlt || 'Before treatment'}
                        fill
                        className="object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Before';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">After</p>
                    <div className="relative h-48 w-full bg-gray-100 rounded">
                      <Image
                        src={item.afterImage}
                        alt={item.afterImageAlt || 'After treatment'}
                        fill
                        className="object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x400?text=After';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold">{item.treatmentType}</h4>
                <p className="text-sm text-gray-600">Duration: {item.duration}</p>
                {item.description && <p className="text-sm text-gray-700 mt-1">{item.description}</p>}
                {item.testimonial && (
                  <p className="text-sm italic text-gray-600 mt-2">"{item.testimonial}"</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{config.description}</p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {!showPreview ? (
            <div className="space-y-6">
              {/* Custom Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe what you want to generate <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={options.customPrompt}
                  onChange={(e) => setOptions({ ...options, customPrompt: e.target.value })}
                  placeholder={config.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                  rows={4}
                />
              </div>

              {/* Generation Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number to Generate
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={config.maxCount}
                    value={options.count}
                    onChange={(e) => setOptions({ ...options, count: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                  />
                </div>

                {type === 'products' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category (optional)
                    </label>
                    <select
                      value={options.category}
                      onChange={(e) => setOptions({ ...options, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                    >
                      <option value="">All Categories</option>
                      <option value="skincare">Skincare</option>
                      <option value="makeup">Makeup</option>
                      <option value="haircare">Haircare</option>
                      <option value="fragrance">Fragrance</option>
                      <option value="tools">Tools & Accessories</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Generate Images Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="generateImages"
                  checked={options.generateImages}
                  onChange={(e) => setOptions({ ...options, generateImages: e.target.checked })}
                  className="h-4 w-4 text-glamlink-teal focus:ring-glamlink-teal border-gray-300 rounded"
                />
                <label htmlFor="generateImages" className="text-sm font-medium text-gray-700">
                  Generate realistic images (uses AI image generation)
                </label>
              </div>

              {type === 'products' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={options.priceRange.min}
                        onChange={(e) => setOptions({
                          ...options,
                          priceRange: { ...options.priceRange, min: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        value={options.priceRange.max}
                        onChange={(e) => setOptions({
                          ...options,
                          priceRange: { ...options.priceRange, max: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-glamlink-teal"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Preview Generated Items</h4>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to options
                </button>
              </div>
              
              <div className="space-y-4">
                {generatedItems.map((item, index) => renderPreviewItem(item, index))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isGenerating}
          >
            Cancel
          </button>
          <div className="space-x-3">
            {showPreview ? (
              <>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-glamlink-teal text-white rounded-md hover:bg-glamlink-teal-dark disabled:opacity-50"
                  disabled={selectedItems.size === 0}
                >
                  Save Selected ({selectedItems.size})
                </button>
              </>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-glamlink-teal text-white rounded-md hover:bg-glamlink-teal-dark disabled:opacity-50"
                disabled={isGenerating || !options.customPrompt.trim()}
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : 'Generate'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}