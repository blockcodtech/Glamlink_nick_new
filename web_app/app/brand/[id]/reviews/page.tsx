import BrandReviewsPageClient from "@/lib/pages/brand/components/reviews/BrandReviewsPageClient";

interface BrandReviewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandReviewsPage({ params }: BrandReviewsPageProps) {
  const { id } = await params;
  return <BrandReviewsPageClient brandId={id} />;
}