'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/components/auth-provider';
import { firebaseAuth, getFirebaseConfigErrorMessage } from '@/lib/firebase/client';

export default function ConnexionPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
