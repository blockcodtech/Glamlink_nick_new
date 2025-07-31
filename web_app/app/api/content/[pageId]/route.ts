import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { PageContentId, PageContentMap, defaultPageContent } from "@/lib/config/pageContent";
import { db as clientDb } from "@/lib/config/firebase";

// Allowed emails for content management
const ALLOWED_EMAILS = [
  "nickkane999@gmail.com",
  "melanie@glamlink.net",
  "admin@glamlink.com"
];

// GET - Fetch content for a specific page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId: rawPageId } = await params;
    const pageId = rawPageId as PageContentId;
    
    // Validate page ID
    if (!defaultPageContent[pageId]) {
      return NextResponse.json({
        success: false,
        error: "Invalid page ID"
      }, { status: 404 });
    }
    
    // [content GET] Fetching content for page
    
    // Use client DB for reading (no auth required)
    if (!clientDb) {
      // [content GET] No database connection, returning defaults
      return NextResponse.json({
        success: false,
        content: defaultPageContent[pageId],
        isDefault: true
      });
    }

    const contentDoc = await getDoc(doc(clientDb, "settings", "pageContent"));
    
    if (!contentDoc.exists()) {
      // [content GET] No content document found, returning defaults
      return NextResponse.json({
        success: true,
        content: defaultPageContent[pageId],
        isDefault: true
      });
    }

    const data = contentDoc.data();
    const pageContent = data.pages?.[pageId];
    
    if (!pageContent) {
      // [content GET] No content for page, returning defaults
      return NextResponse.json({
        success: true,
        content: defaultPageContent[pageId],
        isDefault: true
      });
    }
    
    // [content GET] Found content for page

    return NextResponse.json({
      success: true,
      content: pageContent,
      lastUpdatedBy: data.lastUpdatedBy,
      lastUpdatedAt: data.lastUpdatedAt,
      version: data.version || 1,
      isDefault: false
    });
  } catch (error) {
    // Error fetching page content
    const { pageId: rawPageId } = await params;
    const pageId = rawPageId as PageContentId;
    return NextResponse.json({
      success: false,
      error: "Failed to fetch content",
      content: defaultPageContent[pageId] || {},
      isDefault: true
    });
  }
}

// POST - Update content for a specific page
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId: rawPageId } = await params;
    const pageId = rawPageId as PageContentId;
    const body = await request.json();
    const { content } = body;
    
    // [content POST] Update request for page
    
    // Validate page ID
    if (!defaultPageContent[pageId]) {
      return NextResponse.json({
        success: false,
        error: "Invalid page ID"
      }, { status: 404 });
    }

    if (!content) {
      return NextResponse.json({
        success: false,
        error: "Invalid content format"
      }, { status: 400 });
    }

    // Check authentication
    const { db, currentUser } = await getAuthenticatedAppForUser();
    
    // Check if user is in allowed list
    if (!currentUser || !currentUser.email || !ALLOWED_EMAILS.includes(currentUser.email)) {
      // [content POST] Unauthorized access attempt
      return NextResponse.json({
        success: false,
        error: "Unauthorized - you don't have permission to update content"
      }, { status: 401 });
    }
    
    // [content POST] Auth check
    
    // Use authenticated db from the logged-in user
    if (!db) {
      return NextResponse.json({
        success: false,
        error: "Database connection failed"
      }, { status: 500 });
    }

    // Get current document
    const currentDoc = await getDoc(doc(db, "settings", "pageContent"));
    let currentData = currentDoc.exists() ? currentDoc.data() : { pages: {}, version: 0 };
    
    // Update the specific page content
    const updatedPages = {
      ...currentData.pages,
      [pageId]: content
    };
    
    // Save to database
    const contentData = {
      pages: updatedPages,
      lastUpdatedBy: currentUser.email,
      lastUpdatedAt: new Date().toISOString(),
      version: (currentData.version || 0) + 1
    };
    
    // [content POST] Saving content for page

    await setDoc(doc(db, "settings", "pageContent"), contentData);
    
    // [content POST] Content saved successfully for page

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      lastUpdatedBy: currentUser.email,
      lastUpdatedAt: contentData.lastUpdatedAt,
      version: contentData.version
    });
  } catch (error) {
    // Error updating page content
    return NextResponse.json({
      success: false,
      error: "Failed to update content"
    }, { status: 500 });
  }
}