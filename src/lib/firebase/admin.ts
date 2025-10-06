import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | undefined;
let firestoreUnavailable = false;

export function getAdminApp() {
  if (app) {
    return app;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    firestoreUnavailable = true;
    throw new Error('Firebase Admin mal configuré');
  }

  app = getApps()[0] ??
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey })
    });

  return app;
}

export function getAdminFirestore() {
  if (firestoreUnavailable) {
    return null;
  }

  try {
    return getFirestore(getAdminApp());
  } catch (error) {
    console.warn('Firestore Admin indisponible:', error);
    firestoreUnavailable = true;
    return null;
  }
}
