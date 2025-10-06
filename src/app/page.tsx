'use client';

import { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  appleProvider,
  firebaseAuth,
  getFirebaseConfigErrorMessage,
  googleProvider
} from '@/lib/firebase/client';
import { useAuth } from '@/components/auth-provider';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/app');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    if (!firebaseAuth) {
      console.error(getFirebaseConfigErrorMessage() ?? 'Firebase Auth is not configured.');
      return;
    }

    await signInWithPopup(firebaseAuth, googleProvider);
  };

  const handleAppleSignIn = async () => {
    if (!firebaseAuth) {
      console.error(getFirebaseConfigErrorMessage() ?? 'Firebase Auth is not configured.');
      return;
    }

    await signInWithPopup(firebaseAuth, appleProvider);
  };

  if (user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="max-w-md w-full space-y-8 p-10 rounded-3xl bg-surface shadow-sm border border-slate-200">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-text">UP Mind</h1>
          <p className="text-slate-600">Réviser, apprendre et progresser grâce à l’IA, sans distraction.</p>
        </div>
        <div className="space-y-4">
          <button
            className="w-full rounded-xl bg-accent py-3 text-white font-medium transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!firebaseAuth}
            onClick={handleGoogleSignIn}
          >
            Se connecter avec Google
          </button>
          <button
            className="w-full rounded-xl border border-slate-300 py-3 font-medium text-text transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!firebaseAuth}
            onClick={handleAppleSignIn}
          >
            Se connecter avec Apple
          </button>
          {!firebaseAuth && (
            <p className="text-sm text-red-500">
              {getFirebaseConfigErrorMessage() ??
                "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
