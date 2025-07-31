import { NextRequest, NextResponse } from "next/server";
import contentGeneratorService from "@/lib/services/ai/contentGeneratorService";
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';
import brandReadService from '@/lib/pages/brand/server/brandReadService';

interface GenerateProvidersRequest {
  brandId: string;
  count?: number;
  customPrompt?: string;
  generateImages?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateProvidersRequest = await request.json();
    const { brandId, count = 4, customPrompt, generateImages = false } = body;

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

    // Generate providers using AI
    const generatedProviders = await contentGeneratorService.generateProviders(
      {
        brandName: brand.name,
        brandTagline: brand.tagline,
        brandMission: brand.mission,
        customPrompt,
        generateImages,
      },
      count
    );

    return NextResponse.json({
      success: true,
      data: generatedProviders
    });

  } catch (error: any) {
    // Provider generation error
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate providers" },
      { status: 500 }
    );
  }
}