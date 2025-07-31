import AllBrandsPage from "@/lib/pages/brand/components/core/AllBrandsPage";
import { getPageMetadata } from "@/lib/data/metadata";

export const metadata = getPageMetadata("brand");

export default function Brand() {
  return <AllBrandsPage />;
}