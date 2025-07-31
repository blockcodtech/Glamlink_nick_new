"use client";

import { TrainingProgramCardProps } from '@/lib/admin/types';
import { formatDate } from "@/lib/components/ui/DateDisplay";

export default function TrainingProgramCard({ program, onEdit, onDelete }: TrainingProgramCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {program.image && (
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
          <span className={`px-2 py-1 text-xs rounded ${
            program.level === 'beginner' ? 'bg-green-100 text-green-800' :
            program.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {program.level}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{program.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Duration:</span>
            <span className="ml-2 text-gray-900">{program.duration}</span>
          </div>
          <div>
            <span className="text-gray-500">Price:</span>
            <span className="ml-2 text-gray-900">${program.price}</span>
          </div>
          <div>
            <span className="text-gray-500">Enrolled:</span>
            <span className="ml-2 text-gray-900">{program.enrollmentCount}</span>
          </div>
          <div>
            <span className="text-gray-500">Certificate:</span>
            <span className="ml-2 text-gray-900">{program.certificationOffered ? 'Yes' : 'No'}</span>
          </div>
        </div>
        
        {program.nextSessionDate && (
          <div className="mt-4 text-sm">
            <span className="text-gray-500">Next Session:</span>
            <span className="ml-2 text-gray-900">{formatDate(program.nextSessionDate)}</span>
          </div>
        )}
        
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => onEdit(program)}
            className="text-glamlink-teal hover:text-glamlink-teal-dark text-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(program.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}