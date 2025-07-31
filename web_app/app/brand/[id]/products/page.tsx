import BrandProductsPageClient from "@/lib/pages/brand/components/products/BrandProductsPageClient";

interface BrandProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandProductsPage({ params }: BrandProductsPageProps) {
  const { id } = await params;
  return <BrandProductsPageClient brandId={id} />;
}