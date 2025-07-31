import BrandProvidersPageClient from "@/lib/pages/brand/components/providers/BrandProvidersPageClient";

interface BrandProvidersPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandProvidersPage({ params }: BrandProvidersPageProps) {
  const { id } = await params;
  return <BrandProvidersPageClient brandId={id} />;
}