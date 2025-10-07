import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

const HERO_HIGHLIGHTS = [
  'Plans de révision dynamiques qui s’adaptent à votre progression.',
  'Suggestions d’exercices ciblées générées par l’IA.',
  'Rappels intelligents pour garder le rythme sans stress.'
];

const FEATURE_CARDS = [
  {
    title: 'Agenda intelligent',
    description:
      'Générez des sessions personnalisées selon vos disponibilités et la priorité de chaque matière.'
  },
  {
    title: 'Cartes mémo propulsées par l’IA',
    description:
      'Transformez vos notes en flashcards automatiquement et révisez grâce à la répétition espacée.'
  },
  {
    title: 'Suivi de progression en temps réel',
    description:
      'Visualisez vos performances, repérez vos forces et ajustez vos objectifs sans perdre de temps.'
  }
];

const ADVANTAGE_ITEMS = [
  'Support multi-plateforme pour réviser où que vous soyez.',
  'Notifications intelligentes pour ne jamais perdre le fil.',
  'Méthodologie validée par des coachs pédagogiques et des étudiant·es.'
];

const ADVANTAGE_CARDS = [
  {
    title: 'Routine personnalisée',
    description:
      'Ajustez la charge de travail, les priorités et l’intensité des rappels selon vos objectifs.'
  },
  {
    title: 'Communauté motivante',
    description:
      'Rejoignez un groupe d’étudiant·es qui partagent leurs stratégies et se soutiennent au quotidien.'
  }
];

const TESTIMONIALS = [
  {
    quote:
      '“UP Mind a transformé mes révisions. Le suivi est clair et les rappels m’aident à rester régulière.”',
    author: 'Emma · Étudiante en droit'
  },
  {
    quote:
      '“Les cartes mémo générées automatiquement sont un gain de temps incroyable. Je révise beaucoup plus efficacement.”',
    author: 'Lucas · Prépa scientifique'
  },
  {
    quote:
      '“Enfin une app qui comprend notre charge mentale. L’agenda intelligent m’évite de procrastiner.”',
    author: 'Mina · Licence de psychologie'
  }
];

export default async function HomePage() {
  const skipAuth = cookies().get('skip_auth')?.value === '1';

  if (!skipAuth) {
    const user = await getCurrentUser();

    if (user) {
      redirect('/app');
    }
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
