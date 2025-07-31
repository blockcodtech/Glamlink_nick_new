import BrandTrainingPageClient from "@/lib/pages/brand/components/training/BrandTrainingPageClient";

interface BrandTrainingPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandTrainingPage({ params }: BrandTrainingPageProps) {
  const { id } = await params;
  return <BrandTrainingPageClient brandId={id} />;
}