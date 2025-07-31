import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ImageGenerationOptions, GeneratedImage } from "@/lib/services/ai/imageGeneratorService";

// Initialize OpenAI client with server-side environment variable
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ImageGenerationOptions;
    
    // Validate required fields
    if (!body.contentType || !body.imageType || !body.quantity) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate quantity limits
    const maxQuantity = body.imageType === 'main' ? 1 : 5;
    if (body.quantity < 1 || body.quantity > maxQuantity) {
      return NextResponse.json(
        { success: false, error: `Quantity must be between 1 and ${maxQuantity}` },
        { status: 400 }
      );
    }
    
    // Import the service dynamically to avoid client-side issues
    const { default: imageGeneratorService } = await import("@/lib/services/ai/imageGeneratorService");
    
    // Generate images
    const images = await imageGeneratorService.generateImages(body);
    
    return NextResponse.json({
      success: true,
      images
    });
  } catch (error: any) {
    // Error generating images
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate images" },
      { status: 500 }
    );
  }
}