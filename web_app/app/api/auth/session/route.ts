import { NextRequest, NextResponse } from 'next/server';
import { setCookie, deleteCookie } from '@/lib/utils/cookies';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return NextResponse.json(
        { success: false, error: 'No ID token provided' },
        { status: 400 }
      );
    }
    
    // Set the session cookie
    await setCookie('__session', idToken);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Error setting session cookie
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Clear the session cookie
    await deleteCookie('__session');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Error clearing session cookie
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}