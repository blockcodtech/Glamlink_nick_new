import { NextRequest, NextResponse } from "next/server";
import contentGeneratorService from "@/lib/services/ai/contentGeneratorService";
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';
import brandReadService from '@/lib/pages/brand/server/brandReadService';

interface GenerateProductsRequest {
  brandId: string;
  count?: number;
  category?: string;
  priceRange?: { min: number; max: number };
  includeIngredients?: boolean;
  customPrompt?: string;
  generateImages?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateProductsRequest = await request.json();
    const { brandId, count = 3, category, priceRange, includeIngredients = true, customPrompt, generateImages = false } = body;

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

    // Generate products using AI
    const generatedProducts = await contentGeneratorService.generateProducts(
      {
        brandName: brand.name,
        brandTagline: brand.tagline,
        brandMission: brand.mission,
        existingProducts: brand.products || [],
        customPrompt,
        generateImages,
        preferences: {
          categories: category ? [category] : undefined,
          priceRange,
        }
      },
      {
        count,
        category,
        priceRange,
        includeIngredients
      }
    );

    return NextResponse.json({
      success: true,
      data: generatedProducts
    });

  } catch (error: any) {
    // Product generation error
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate products" },
      { status: 500 }
    );
  }
}