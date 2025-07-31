import { NextRequest, NextResponse } from "next/server";
import { projectsData } from "@/lib/data/projectsInfo";
import { Project, ApiResponse } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    // Filter and sort projects that are ready for public viewing
    const publicProjects = projectsData.filter(project => 
      ['published', 'live', 'complete', 'finished', 'in-development'].includes(project.status)
    ).sort((a, b) => (a.order || 999) - (b.order || 999));
    
    // Projects API: Found public projects
    
    return NextResponse.json({
      success: true,
      data: publicProjects,
      source: 'local'
    });

  } catch (error) {
    // Error fetching projects
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch projects",
        data: [],
        source: 'local'
      },
      { status: 500 }
    );
  }
} 