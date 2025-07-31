import React from "react";
import Image from "next/image";
import { BeforeAfter, Product } from "../../../types";
import { TransformationDetailsProps } from "../../../types/gallery";

export default function TransformationDetails({
  transformation,
  products,
  handleNavigateToProduct
}: TransformationDetailsProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {transformation.description && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatment Details</h2>
          <p className="text-gray-700">{transformation.description}</p>
        </div>
      )}

      {/* Products Used */}
      {products.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Products Used</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleNavigateToProduct(product.id)}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.category} - ${product.price}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Treatment Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatment Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-glamlink-teal rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">Initial Consultation</h4>
              <p className="text-gray-600">Skin analysis and treatment plan creation</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-glamlink-teal rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">Treatment Sessions</h4>
              <p className="text-gray-600">Regular treatments over {transformation.duration}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-glamlink-teal rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">Final Results</h4>
              <p className="text-gray-600">Achieved transformation goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}