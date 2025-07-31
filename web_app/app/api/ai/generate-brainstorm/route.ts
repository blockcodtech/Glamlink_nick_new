import { NextRequest, NextResponse } from 'next/server';
import contentGeneratorService from '@/lib/services/ai/contentGeneratorService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, brandTagline, brandMission, focus, count = 5 } = body;

    const context = {
      brandName,
      brandTagline,
      brandMission
    };

    const ideas = await contentGeneratorService.generateBrainstormIdeas(
      context,
      focus,
      count
    );

    return NextResponse.json({
      success: true,
      ideas
    });
  } catch (error) {
    // Error generating brainstorm ideas
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}