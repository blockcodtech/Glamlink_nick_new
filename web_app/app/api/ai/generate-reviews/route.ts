import { NextRequest, NextResponse } from "next/server";
import contentGeneratorService from "@/lib/services/ai/contentGeneratorService";
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';
import brandReadService from '@/lib/pages/brand/server/brandReadService';

interface GenerateReviewsRequest {
  brandId: string;
  productId?: string;
  count?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateReviewsRequest = await request.json();
    const { brandId, productId, count = 3 } = body;

    if (!brandId) {
      return NextResponse.json(
        { success: false, error: "Brand ID is required" },
        { status: 400 }
      );
    }

    // Fetch brand data for context
    const brand = await firestoreService.getDocument<Brand>('brands', brandId);
    if (!brand) {
      return NextResponse.json(
        { success: false, error: "Brand not found" },
        { status: 404 }
      );
    }

    // Generate reviews using AI
    const generatedReviews = await contentGeneratorService.generateReviews(
      {
        brandName: brand.name,
        brandTagline: brand.tagline,
        brandMission: brand.mission,
      },
      productId,
      count
    );

    return NextResponse.json({
      success: true,
      data: generatedReviews
    });

  } catch (error: any) {
    // Review generation error
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate reviews" },
      { status: 500 }
    );
  }
}