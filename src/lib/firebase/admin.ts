import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | null | undefined;
let adminUnavailable = false;

const logMissingAdminEnvVars = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ] as const;

  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length) {
    const message = `Firebase Admin est mal configuré. Variables manquantes: ${missing.join(', ')}`;
    if (process.env.NODE_ENV !== 'production') {
      console.warn(message);
    }
    return message;
  }

  return null;
};

export function getAdminApp(): App | null {
  if (adminUnavailable) {
    return null;
  }

  if (app) {
    return app;
  }

  const warning = logMissingAdminEnvVars();
  if (warning) {
    adminUnavailable = true;
    app = null;
    return null;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n');

  try {
    app = getApps()[0] ??
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey })
      });
  } catch (error) {
    console.warn('Impossible d\'initialiser Firebase Admin:', error);
    adminUnavailable = true;
    app = null;
    return null;
  }

  return app ?? null;
}

export function getAdminFirestore() {
  if (adminUnavailable) {
    return null;
  }

  const adminApp = getAdminApp();
  if (!adminApp) {
    return null;
  }

  try {
    return getFirestore(adminApp);
  } catch (error) {
    console.warn('Firestore Admin indisponible:', error);
    adminUnavailable = true;
    return null;
  }
}
