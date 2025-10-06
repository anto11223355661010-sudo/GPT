import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
] as const;

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length && process.env.NODE_ENV !== 'production') {
  console.warn(
    `Firebase is not configured. Missing environment variables: ${missingEnvVars.join(', ')}`
  );
}

let firebaseApp: FirebaseApp | undefined;

if (!missingEnvVars.length) {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
  };

  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const firebaseAuth: Auth | undefined = firebaseApp ? getAuth(firebaseApp) : undefined;
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const firestore: Firestore | undefined = firebaseApp
  ? getFirestore(firebaseApp)
  : undefined;
export const storage: FirebaseStorage | undefined = firebaseApp
  ? getStorage(firebaseApp)
  : undefined;

export const isFirebaseConfigured = !!firebaseApp;

export const getFirebaseConfigErrorMessage = () =>
  missingEnvVars.length
    ? `Firebase is not configured. Missing environment variables: ${missingEnvVars.join(', ')}`
    : undefined;

export const ensureFirebaseConfigured = () => {
  if (!firebaseApp) {
    throw new Error(
      getFirebaseConfigErrorMessage() ?? 'Firebase is not configured. Environment variables missing.'
    );
  }

  return firebaseApp;
};
