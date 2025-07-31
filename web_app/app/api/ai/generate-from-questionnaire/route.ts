import { NextRequest, NextResponse } from "next/server";
import contentGeneratorService from "@/lib/services/ai/contentGeneratorService";
import { Brand } from '@/lib/pages/brand/types';
import firestoreService from '@/lib/services/firebase/firestoreService';
import brandReadService from '@/lib/pages/brand/server/brandReadService';
import { BrandQuestionnaireData } from '@/lib/admin/types';
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { doc, setDoc } from "firebase/firestore";

interface GenerateFromQuestionnaireRequest {
  brandId: string;
  brandName: string;
  userId: string;
  questionnaireData: BrandQuestionnaireData;
}

export async function POST(request: NextRequest) {
  try {
    // [generate-from-questionnaire] Starting request processing...
    
    // Get authenticated app for current user
    const { db, currentUser } = await getAuthenticatedAppForUser();
    
    if (!currentUser || !db) {
      // [generate-from-questionnaire] No authenticated user found
      return NextResponse.json(
        { success: false, error: "Unauthorized - please log in" },
        { status: 401 }
      );
    }

    // [generate-from-questionnaire] Authenticated user

    const body: GenerateFromQuestionnaireRequest = await request.json();
    const { brandId, brandName, userId, questionnaireData } = body;

    // [generate-from-questionnaire] Received request

    // Verify the current user matches the requested user
    if (currentUser.uid !== userId) {
      // [generate-from-questionnaire] User ID mismatch
      return NextResponse.json(
        { success: false, error: "Unauthorized - user mismatch" },
        { status: 403 }
      );
    }

    if (!brandId || !brandName || !userId || !questionnaireData) {
      // [generate-from-questionnaire] Missing required fields
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch brand data for additional context
    const brand = await firestoreService.getDocument<Brand>('brands', brandId);
    
    // Generate all content based on questionnaire
    // [generate-from-questionnaire] Starting content generation...
    const generatedContent = await contentGeneratorService.generateFromQuestionnaire({
      brandName,
      brandTagline: brand?.tagline,
      brandMission: brand?.mission,
      questionnaire: {
        ...questionnaireData,
        id: `quest_${Date.now()}`,
        brandId: brandId,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      } as any,
    });
    // [generate-from-questionnaire] Content generation complete

    // Save questionnaire to user document using the authenticated user's permissions
    // [generate-from-questionnaire] Saving questionnaire for user
    try {
      await setDoc(doc(db, 'users', userId), {
        uid: userId,
        questionnaire: questionnaireData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      // [generate-from-questionnaire] Successfully saved questionnaire
    } catch (saveError: any) {
      // [generate-from-questionnaire] Error saving questionnaire
      // Continue anyway - we can still return the generated content
    }

    return NextResponse.json({
      success: true,
      data: generatedContent
    });

  } catch (error: any) {
    // Questionnaire generation error
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate content from questionnaire" },
      { status: 500 }
    );
  }
}