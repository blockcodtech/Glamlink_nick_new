import BrandPage from "@/lib/pages/brand/components/core/BrandPage";

export default async function BrandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BrandPage brandId={id} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // In a real app, you'd fetch the brand name from the database
  return {
    title: `Brand - Glamlink`,
    description: "Discover premium beauty products and certified providers",
  };
}
