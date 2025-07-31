import { NextRequest, NextResponse } from 'next/server';
import contentGeneratorService from '@/lib/services/ai/contentGeneratorService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, brandName, brandTagline } = body;

    if (!topic || !topic.trim()) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    const context = {
      brandName,
      brandTagline
    };

    const research = await contentGeneratorService.researchTopic(topic, context);

    return NextResponse.json({
      success: true,
      research
    });
  } catch (error) {
    // Error researching topic
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to research topic' },
      { status: 500 }
    );
  }
}