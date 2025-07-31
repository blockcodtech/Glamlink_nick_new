import BrandGalleryPageClient from "@/lib/pages/brand/components/gallery/BrandGalleryPageClient";

interface BrandGalleryPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandGalleryPage({ params }: BrandGalleryPageProps) {
  const { id } = await params;
  return <BrandGalleryPageClient brandId={id} />;
}