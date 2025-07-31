import HomePage from "@/lib/pages/home/components/HomePage";
import { getPageMetadata } from "@/lib/data/metadata";
import { getServerPageContent } from "@/lib/services/getServerPageContent";

export const metadata = getPageMetadata("home");

// Force dynamic rendering - always fetch fresh content
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch fresh content server-side on every request
  const content = await getServerPageContent("home");
  
  return <HomePage initialContent={content} />;
}
