import React from "react";
import SafeImage from "@/lib/components/SafeImage";
import { TrainingProgram } from "../../types";
import { getLevelBadgeClass, getTrainingCardColorClass } from "../core/ui";

interface TrainingProgramCardProps {
  program: TrainingProgram;
  onProgramClick?: (programId: string) => void;
  onEnroll?: (programId: string) => void;
}

export default function TrainingProgramCard({ 
  program, 
  onProgramClick, 
  onEnroll 
}: TrainingProgramCardProps) {
  return (
    <div
      key={program.id}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Split Layout Container */}
      <div className="flex h-48">
        {/* Left Section - Colored Background with Title */}
        <div className={`flex-1 ${getTrainingCardColorClass(program.level)} p-6`}>
          <h3 className="text-xl font-bold text-white">{program.name}</h3>
        </div>
        
        {/* Right Section - Instructor/Program Image */}
        <div className="w-1/2 bg-gray-50">
          {/* Check for instructor image first, then fall back to program images */}
          {program.instructorImage || program.image || program.thumbnailImage ? (
            <div className="relative w-full h-full">
              <SafeImage
                src={program.instructorImage || program.image || program.thumbnailImage || ''}
                alt={program.instructorName || program.name}
                fill
                className="object-cover"
                fallbackType="provider"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Section - Program Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={getLevelBadgeClass(program.level)}>
            {program.level}
          </span>
          {program.certificationOffered && (
            <div className="flex items-center text-sm text-green-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Certificate offered
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4">{program.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-900">{program.duration}</span>
          </div>
          
          {program.price && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Price</span>
              <span className="font-medium text-gray-900">${program.price}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Enrolled</span>
            <span className="font-medium text-gray-900">{program.enrollmentCount} students</span>
          </div>
          
          {program.nextSessionDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Next Session</span>
              <span className="font-medium text-gray-900">
                {new Date(program.nextSessionDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => onProgramClick?.(program.id)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Learn More
          </button>
          <button
            onClick={() => onEnroll?.(program.id)}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}