'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/components/auth-provider';
import {
  firebaseAuth,
  getFirebaseConfigErrorMessage,
  googleProvider
} from '@/lib/firebase/client';

export default function ConnexionPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (typeof window !== 'undefined') {
        document.cookie = 'skip_auth=; path=/; max-age=0';
      }

      router.replace('/app');
    }
  }, [user, loading, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebaseAuth) {
      setError(
        getFirebaseConfigErrorMessage() ??
          "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."
      );
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } else {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!firebaseAuth) {
      setError(
        getFirebaseConfigErrorMessage() ??
          "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."
      );
      return;
    }

    setError(null);
    setGoogleSubmitting(true);

    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue.';
      setError(message);
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      document.cookie = 'skip_auth=1; path=/; max-age=3600';
    }

    router.push('/app');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-white to-slate-100 px-6 py-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-sm font-medium text-slate-600 shadow-xl dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
            Chargement de votre espace sécurisé…
          </div>
        </main>
      </>
    );
  }

  if (user) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-white to-slate-100 px-6 py-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-sm font-medium text-slate-600 shadow-xl dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
            Redirection vers votre tableau de bord…
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white via-white to-slate-100 px-6 py-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="w-full max-w-md space-y-10 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Accès membre
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              {mode === 'signup' ? 'Créer votre espace' : 'Se connecter à UP Mind'}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Utilisez l’identifiant que vous ajoutez dans Firebase pour accéder à la plateforme.
            </p>
          </div>

          <div className="flex justify-center gap-2 rounded-full bg-slate-100 p-1 text-sm font-medium dark:bg-slate-800">
            <button
              className={`flex-1 rounded-full px-4 py-2 transition ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setMode('signup')}
              type="button"
            >
              S’inscrire
            </button>
            <button
              className={`flex-1 rounded-full px-4 py-2 transition ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setMode('signin')}
              type="button"
            >
              Se connecter
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">
                Identifiant (email Firebase)
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
                placeholder="prenom.nom@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {!firebaseAuth && (
              <p className="text-sm text-red-500">
                {getFirebaseConfigErrorMessage() ??
                  "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {submitting ? 'Traitement…' : mode === 'signup' ? 'Créer mon compte' : 'Me connecter'}
            </button>
          </form>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                ou
              </span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>

            <button
              onClick={handleGoogleAuth}
              disabled={googleSubmitting || !firebaseAuth}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              type="button"
            >
              {googleSubmitting ? (
                'Connexion…'
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.04 12.2615C23.04 11.4469 22.9708 10.6615 22.8431 9.90527H12V14.368H18.1892C17.9228 15.8065 17.111 17.0146 15.8662 17.8283V20.7137H19.4492C21.6607 18.6765 23.04 15.7207 23.04 12.2615Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23.4998C15.24 23.4998 17.9569 22.4284 19.4492 20.7137L15.8662 17.8284C15.0569 18.3684 13.9569 18.7068 12 18.7068C8.87462 18.7068 6.22939 16.6506 5.28554 13.8003H1.58277V16.7831C3.06462 20.4831 7.19616 23.4998 12 23.4998Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.28549 13.8003C5.04616 13.2603 4.90462 12.6765 4.90462 12.0684C4.90462 11.4603 5.04616 10.8765 5.28549 10.3365V7.35376H1.58272C0.810862 9.03653 0.360001 10.8765 0.360001 12.0684C0.360001 13.2603 0.810862 15.1003 1.58272 16.7831L5.28549 13.8003Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.43107C13.9569 5.43107 15.4147 6.09913 16.4347 7.06079L19.5216 4.05274C17.9569 2.52464 15.24 1.5 12 1.5C7.19616 1.5 3.06462 4.51673 1.58277 8.21676L5.28554 11.1995C6.22939 8.34915 8.87462 5.43107 12 5.43107Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continuer avec Google
                </>
              )}
            </button>
          </div>

          <div className="space-y-3 text-center text-sm text-slate-500 dark:text-slate-300">
            <button
              onClick={handleSkip}
              className="w-full rounded-full border border-slate-300 px-4 py-2 font-medium transition hover:border-slate-400 hover:text-slate-700 dark:border-slate-700 dark:hover:border-slate-500 dark:hover:text-white"
              type="button"
            >
              Passer pour l’instant
            </button>
            <Link
              className="inline-flex items-center justify-center gap-1 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
              href="/tarifs"
            >
              ← Retourner aux tarifs
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
