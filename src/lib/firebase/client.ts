import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

const fallbackConfig = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyD67yJvXbXsVOoz5gEkEC8tkxCE4vHQ7I0',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'up-mind.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'up-mind',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'up-mind.firebasestorage.app',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '303268104791',
  NEXT_PUBLIC_FIREBASE_APP_ID: '1:303268104791:web:55d4cb51b7f42bc5b73112',
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'G-KCKFY5PWBJ'
} as const;

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
] as const;

type RequiredEnvVar = (typeof requiredEnvVars)[number];

const resolveEnvVar = (key: RequiredEnvVar) => process.env[key] ?? fallbackConfig[key];

const missingEnvVars = requiredEnvVars.filter((key) => !resolveEnvVar(key));
const usingFallbackValues = requiredEnvVars.some((key) => !process.env[key] && fallbackConfig[key]);

if (missingEnvVars.length && process.env.NODE_ENV !== 'production') {
  console.warn(
    `Firebase is not configured. Missing environment variables: ${missingEnvVars.join(', ')}`
  );
} else if (usingFallbackValues && process.env.NODE_ENV !== 'production') {
  console.info(
    'Using bundled Firebase configuration values. Set environment variables to override these defaults.'
  );
}

const firebaseConfig: FirebaseOptions & {
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId?: string;
} = {
  apiKey: resolveEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: resolveEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: resolveEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: resolveEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: resolveEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: resolveEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID'),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ??
    fallbackConfig.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let firebaseApp: FirebaseApp | undefined;

if (!missingEnvVars.length) {
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
