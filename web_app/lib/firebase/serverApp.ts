import { initializeServerApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { cookies } from 'next/headers';
import { firebaseConfig } from '@/lib/config/firebase';

export async function getAuthenticatedAppForUser() {
  try {
    // Get the session cookie
    const authIdToken = (await cookies()).get("__session")?.value;

    if (!authIdToken) {
      console.log('[serverApp] No session cookie found');
      return { 
        firebaseServerApp: null, 
        currentUser: null,
        db: null 
      };
    }

    console.log('[serverApp] Initializing server app with ID token');

    // Initialize server app with the ID token
    const firebaseServerApp = initializeServerApp(
      firebaseConfig,
      {
        authIdToken,
      }
    );

    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();

    const currentUser = auth.currentUser;
    console.log('[serverApp] Current user:', currentUser?.email);

    return { 
      firebaseServerApp, 
      currentUser,
      db: currentUser ? getFirestore(firebaseServerApp) : null
    };
  } catch (error) {
    console.error('[serverApp] Error initializing server app:', error);
    return { 
      firebaseServerApp: null, 
      currentUser: null,
      db: null 
    };
  }
}