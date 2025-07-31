import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { validateImageFile, generateUniqueFilename } from '@/lib/utils/imageUpload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate the file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the images directory exists
    const publicPath = join(process.cwd(), 'public', 'images');
    await mkdir(publicPath, { recursive: true });

    // Write file to public/images directory
    const filePath = join(publicPath, filename);
    await writeFile(filePath, buffer);

    // Return the public path (what will be used in img src)
    const publicUrl = `/images/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      path: publicUrl,
      filename: filename 
    });
  } catch (error) {
    // Upload error
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}