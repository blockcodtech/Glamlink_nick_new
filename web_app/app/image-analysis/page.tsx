import ImageAnalysisPage from "@/lib/pages/image-analysis/components/ImageAnalysisPage";
import { getPageMetadata } from "@/lib/data/metadata";

export const metadata = getPageMetadata("image-analysis");

export default function ImageAnalysis() {
  return <ImageAnalysisPage />;
}