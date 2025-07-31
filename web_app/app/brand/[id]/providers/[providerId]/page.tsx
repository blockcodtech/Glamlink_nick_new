import ProviderProfilePage from "@/lib/pages/brand/components/providers/ProviderProfilePage";

export default async function BrandProviderProfile({ params }: { params: Promise<{ id: string; providerId: string }> }) {
  const { id, providerId } = await params;
  return <ProviderProfilePage brandId={id} providerId={providerId} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ id: string; providerId: string }> }) {
  const { id, providerId } = await params;
  // In a real app, you'd fetch the provider name from the database
  return {
    title: `Provider Profile - Glamlink`,
    description: "Certified beauty professional profile",
  };
}
