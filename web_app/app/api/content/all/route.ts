import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { doc, getDoc } from "firebase/firestore";
import { defaultPageContent } from "@/lib/config/pageContent";
import { db as clientDb } from "@/lib/config/firebase";

// Password for non-admin access
const SETTINGS_PASSWORD = "glamlink2025";

// GET - Fetch all page content (for admin panel)
export async function GET(request: NextRequest) {
  try {
    // [content/all GET] Fetching all page content
    
    // Check if password is provided in headers
    const authHeader = request.headers.get("authorization");
    const providedPassword = authHeader?.replace("Bearer ", "");
    
    // Check authentication
    const { currentUser } = await getAuthenticatedAppForUser();
    
    // Allow access if:
    // 1. User is admin@glamlink.com, OR
    // 2. Correct password is provided
    const isAdmin = currentUser?.email === "admin@glamlink.com";
    const hasValidPassword = providedPassword === SETTINGS_PASSWORD;
    
    if (!isAdmin && !hasValidPassword) {
      // [content/all GET] Unauthorized access attempt
      return NextResponse.json({
        success: false,
        error: "Unauthorized - invalid password or not admin"
      }, { status: 401 });
    }
    
    // Use client DB for reading
    if (!clientDb) {
      // [content/all GET] No database connection, returning defaults
      return NextResponse.json({
        success: false,
        content: defaultPageContent,
        isDefault: true
      });
    }

    const contentDoc = await getDoc(doc(clientDb, "settings", "pageContent"));
    
    if (!contentDoc.exists()) {
      // [content/all GET] No content document found, returning defaults
      return NextResponse.json({
        success: true,
        content: defaultPageContent,
        isDefault: true
      });
    }

    const data = contentDoc.data();
    
    // Merge with defaults to ensure all pages have content
    const mergedContent = Object.keys(defaultPageContent).reduce((acc, pageId) => {
      acc[pageId] = data.pages?.[pageId] || defaultPageContent[pageId as keyof typeof defaultPageContent];
      return acc;
    }, {} as any);
    
    // [content/all GET] Found content document

    return NextResponse.json({
      success: true,
      content: mergedContent,
      lastUpdatedBy: data.lastUpdatedBy,
      lastUpdatedAt: data.lastUpdatedAt,
      version: data.version || 1,
      isDefault: false
    });
  } catch (error) {
    // Error fetching all page content
    return NextResponse.json({
      success: false,
      error: "Failed to fetch content",
      content: defaultPageContent,
      isDefault: true
    });
  }
}