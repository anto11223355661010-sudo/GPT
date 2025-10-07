import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from './firebase/admin';

export async function getCurrentUser() {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const app = getAdminApp();

    if (!app) {
      console.warn('Firebase Admin est indisponible. Impossible de vérifier le cookie de session.');
      return null;
    }

    const decodedToken = await getAuth(app).verifySessionCookie(sessionCookie, true);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email ?? '',
      displayName: decodedToken.name ?? 'Étudiant'
    };
  } catch (error) {
    console.error('Erreur de vérification du cookie de session', error);
    return null;
  }
}
