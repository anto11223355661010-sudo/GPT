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
import { ScrollScene } from '@/components/scroll-scene';
import { Navbar } from '@/components/navbar';

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
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex min-h-[120vh] grow items-center justify-center px-6 pb-24 pt-32 lg:pb-32">
        <div className="flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-stretch">
          <section
            id="connexion"
            className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-surface p-10 shadow-sm"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold text-text">UP Mind</h1>
              <p className="text-slate-600">
                Réviser, apprendre et progresser grâce à l’IA, sans distraction.
              </p>
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
          </section>
          <div id="experience" className="relative flex w-full max-w-xl items-center justify-center">
            <ScrollScene />
          </div>
        </div>
      </main>
    </div>
  );
}
