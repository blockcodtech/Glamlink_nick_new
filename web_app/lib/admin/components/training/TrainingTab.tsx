"use client";

import { useState, useEffect } from "react";
import { TrainingProgram } from '@/lib/admin/types';
import firebaseTrainingService from '../../server/firebaseTrainingService';
import { useBrandStore } from '../../hooks/useBrandStore';
import EnhancedAIGeneratorModal from '../shared/modals/EnhancedAIGeneratorModal';
import EditModal from '../shared/modals/EditModal';
import TrainingList from './TrainingList';
import CreateTrainingModal from './CreateTrainingModal';
import { trainingEditFields } from './config';

export default function TrainingTab() {
  // Use Redux store for brand data
  const { brand, brandId, isLoading, refreshBrand } = useBrandStore();
  const [showAIModal, setShowAIModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Get training programs from brand data
  const programs = brand?.trainingPrograms || [];
  
  // Refresh brand data when component mounts
  useEffect(() => {
    if (brandId && !brand) {
      refreshBrand();
    }
  }, [brandId, brand, refreshBrand]);
  
  const handleDelete = async (programId: string) => {
    if (!confirm("Are you sure you want to delete this training program?")) return;
    
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      await firebaseTrainingService.removeTrainingProgram(brandId, programId);
      // Refresh the brand data from Redux
      await refreshBrand();
    } catch (error) {
      // Error deleting training program
      alert("Failed to delete training program");
    }
  };

  const handleAIGenerate = async (generatedPrograms: TrainingProgram[]) => {
    try {
      if (!brandId) {
        alert("No brand associated with your account");
        return;
      }
      
      for (const program of generatedPrograms) {
        await firebaseTrainingService.addTrainingProgram(brandId, program);
      }
      
      // Refresh the brand data from Redux
      await refreshBrand();
      alert(`Successfully added ${generatedPrograms.length} training programs!`);
    } catch (error) {
      // Error saving generated training programs
      alert("Failed to save generated programs");
    }
  };

  const handleEdit = (program: TrainingProgram) => {
    setEditingProgram(program);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!brandId || !editingProgram) return;

    try {
      await firebaseTrainingService.updateTrainingProgram(
        brandId,
        editingProgram.id,
        updatedData
      );
      
      // Refresh the brand data from Redux
      await refreshBrand();
      setEditingProgram(null);
      alert("Training program updated successfully!");
    } catch (error) {
      // Error updating training program
      throw new Error("Failed to update training program");
    }
  };
  
  const handleCreateProgram = async (programData: any) => {
    if (!brandId) return;

    try {
      const newProgram: TrainingProgram = {
        id: `program_${Date.now()}`,
        ...programData,
        image: programData.image || 'https://source.unsplash.com/300x300/?training,education',
        enrollmentCount: 0,
        certificationOffered: programData.certificationOffered || false
      };

      await firebaseTrainingService.addTrainingProgram(brandId, newProgram);
      // Refresh the brand data from Redux
      await refreshBrand();
      alert("Training program created successfully!");
    } catch (error) {
      // Error creating training program
      throw new Error("Failed to create training program");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Training Programs</h2>
        <div className="space-x-3">
          <button 
            onClick={() => setShowAIModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 inline-flex items-center"
            disabled={!brandId}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Generate with AI
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-glamlink-teal text-white px-4 py-2 rounded-lg hover:bg-glamlink-teal-dark"
          >
            Add New Program
          </button>
        </div>
      </div>
      
      <TrainingList
        programs={programs}
        isLoading={isLoading}
        hasBrand={!!brandId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* AI Generator Modal */}
      {brandId && (
        <EnhancedAIGeneratorModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          type="training"
          brandId={brandId}
          onGenerate={handleAIGenerate}
        />
      )}

      {/* Edit Modal */}
      {editingProgram && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingProgram(null);
          }}
          onSave={handleSaveEdit}
          title="Edit Training Program"
          fields={trainingEditFields}
          initialData={editingProgram}
          contentId={editingProgram.id}
        />
      )}

      {/* Create Modal */}
      <CreateTrainingModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateProgram}
      />
    </div>
  );
}