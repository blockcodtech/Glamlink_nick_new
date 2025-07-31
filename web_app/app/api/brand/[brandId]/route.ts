import { NextRequest, NextResponse } from "next/server";
import { BrandApiResponse } from "@/lib/pages/brand/types";
import { mockBrand, mockProducts, mockProviders, mockBeforeAfters, mockTrainingPrograms, mockReviews } from "@/lib/pages/brand/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brandId: string }> }
) {
  try {
    const { brandId } = await params;
    
    // In production, this would fetch from Firebase/MongoDB
    // Fetching brand data for brandId
    
    // Return mock data
    return NextResponse.json({
      success: true,
      data: {
        brand: mockBrand,
        products: mockProducts,
        providers: mockProviders,
        beforeAfters: mockBeforeAfters,
        programs: mockTrainingPrograms,
        reviews: mockReviews
      }
    } as BrandApiResponse);
    
  } catch (error: any) {
    // Brand fetch error
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch brand data" } as BrandApiResponse,
      { status: 500 }
    );
  }
}