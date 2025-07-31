import TrainingProgramDetailPage from "@/lib/pages/brand/components/training/TrainingProgramDetailPage";

export default async function BrandTrainingProgramDetail({ params }: { params: Promise<{ id: string; programId: string }> }) {
  const { id, programId } = await params;
  return <TrainingProgramDetailPage brandId={id} programId={programId} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ id: string; programId: string }> }) {
  const { id, programId } = await params;
  // In a real app, you'd fetch the program name from the database
  return {
    title: `Training Program - Glamlink`,
    description: "Professional beauty training and certification programs",
  };
}
