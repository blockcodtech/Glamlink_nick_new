import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TrainingProgram, Brand } from "../../types";
import brandReadService from "../../server/brandReadService";

export function useTrainingProgramDetailPage(brandId: string, programId: string) {
  const router = useRouter();
  const [program, setProgram] = useState<TrainingProgram | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProgramData = useCallback(async () => {
    try {
      setIsLoading(true);
      const brandData = await brandReadService.getBrand(brandId);
      
      if (!brandData) {
        router.push('/brand');
        return;
      }

      setBrand(brandData);

      // Find the specific training program
      const foundProgram = brandData.trainingPrograms?.find(p => p.id === programId);
      if (!foundProgram) {
        router.push(`/brand/${brandId}/training`);
        return;
      }

      setProgram(foundProgram);

    } catch (error) {
      // Error fetching program data
      router.push(`/brand/${brandId}`);
    } finally {
      setIsLoading(false);
    }
  }, [brandId, programId, router]);

  useEffect(() => {
    fetchProgramData();
  }, [fetchProgramData]);

  // Get all program images
  const getAllImages = useCallback(() => {
    if (!program) return [];
    const images = [];
    
    // Add primary image
    if (program.image) {
      images.push(program.image);
    } else if (program.thumbnailImage) {
      images.push(program.thumbnailImage);
    }
    
    // Add additional images
    if (program.images && program.images.length > 0) {
      images.push(...program.images);
    }
    
    return images.filter(img => img); // Remove empty strings
  }, [program]);

  const programImages = useMemo(() => getAllImages(), [getAllImages]);

  // Handlers
  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % programImages.length);
  }, [programImages.length]);

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => 
      prev === 0 ? programImages.length - 1 : prev - 1
    );
  }, [programImages.length]);

  const handleEnroll = useCallback(() => {
    // TODO: Implement enrollment functionality
  }, [program]);

  const handleContactInstructor = useCallback(() => {
    // TODO: Implement contact functionality
  }, [program]);

  return {
    // State
    program,
    brand,
    isLoading,
    activeImageIndex,
    programImages,
    
    // Handlers
    setActiveImageIndex,
    handleNextImage,
    handlePrevImage,
    handleEnroll,
    handleContactInstructor
  };
}