import ProductDetailPage from "@/lib/pages/brand/components/products/ProductDetailPage";

export default async function BrandProductDetail({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id, productId } = await params;
  return <ProductDetailPage brandId={id} productId={productId} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id, productId } = await params;
  // In a real app, you'd fetch the product name from the database
  return {
    title: `Product - Glamlink`,
    description: "Discover premium beauty products",
  };
}
