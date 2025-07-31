import { NextRequest, NextResponse } from "next/server";
import contentGeneratorService from "@/lib/services/ai/contentGeneratorService";
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';
import brandReadService from '@/lib/pages/brand/server/brandReadService';

interface UpdateGeneratedContentRequest {
  brandId: string;
  contentType: 'products' | 'providers' | 'training' | 'beforeAfter';
  currentContent: any;
  feedback: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: UpdateGeneratedContentRequest = await request.json();
    const { brandId, contentType, currentContent, feedback } = body;

    if (!brandId || !contentType || !currentContent || !feedback) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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

    // Update specific content based on feedback
    const updatedContent = await contentGeneratorService.updateGeneratedSection({
      brandName: brand.name,
      brandTagline: brand.tagline,
      brandMission: brand.mission,
      contentType,
      currentContent,
      feedback,
      questionnaire: brand.questionnaire,
    });

    return NextResponse.json({
      success: true,
      data: updatedContent
    });

  } catch (error: any) {
    // Content update error
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update generated content" },
      { status: 500 }
    );
  }
}