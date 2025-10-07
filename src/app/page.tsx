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
    <>
      <Navbar />
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-white to-slate-100 px-6 pt-28 pb-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.18),transparent_45%)]" />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
          <div className="space-y-7 text-left">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
              Votre copilote d’apprentissage
            </span>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Transformez vos révisions en un parcours motivant et personnalisé.
              </h1>
              <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
                UP Mind combine IA et coaching pédagogique pour construire des routines efficaces, mesurer vos progrès et vous maintenir inspiré jusqu’à la réussite.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#connexion"
                className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Commencer maintenant
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Inscription en un clic avec Google ou Apple.
              </p>
            </div>
          </div>
          <ul className="grid w-full max-w-sm gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
            <li className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-800/80 dark:text-slate-200">
              📚 Plans de révision dynamiques qui s’adaptent à votre progression.
            </li>
            <li className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-800/80 dark:text-slate-200">
              🧠 Suggestions d’exercices ciblées générées par l’IA.
            </li>
            <li className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-800/80 dark:text-slate-200">
              ⏰ Rappels intelligents pour garder le rythme sans stress.
            </li>
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-16 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),rgba(15,23,42,0.6))] opacity-70" />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <span className="rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80">
            La suite vous attend
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Prêt·e pour une immersion totale ? Découvrez nos fonctionnalités phares.
          </h2>
          <p className="max-w-2xl text-base text-white/80">
            Faites défiler pour explorer l’écosystème UP Mind et laissez-vous guider par une expérience pensée pour vous faire gagner du temps à chaque session de travail.
          </p>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-medium transition hover:border-white hover:bg-white/10"
          >
            Explorer les fonctionnalités
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <section id="features" className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Fonctionnalités clés</h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Des outils puissants et intuitifs pour suivre vos cours, mémoriser plus vite et travailler avec confiance.
            </p>
          </div>
          <div className="grid gap-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Agenda intelligent</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Générez des sessions personnalisées en fonction de vos disponibilités et du niveau de priorité de chaque matière.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Cartes mémo propulsées par l’IA</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Transformez vos notes en flashcards automatiquement et révisez grâce à la répétition espacée sans perdre de temps.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Suivi de progression en temps réel</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Visualisez vos performances, identifiez vos forces et vos axes d’amélioration avec des analyses claires et motivantes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="avantages" className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Les avantages UP Mind</h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Optimisez chaque minute de travail grâce à un environnement conçu pour éliminer les frictions et renforcer votre régularité.
              </p>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 text-lg">✅</span>
                  Support multi-plateforme pour réviser où que vous soyez.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-lg">✅</span>
                  Notifications intelligentes pour ne jamais perdre le fil.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-lg">✅</span>
                  Méthodologie validée par des coachs pédagogiques et des étudiant·es.
                </li>
              </ul>
            </div>
            <div className="grid gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Routine personnalisée</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Ajustez la charge de travail, les priorités et l’intensité des rappels en fonction de vos objectifs.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Communauté motivante</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Rejoignez un groupe d’étudiant·es qui partagent leurs stratégies et se soutiennent au quotidien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">À propos de nous</h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              UP Mind est né de la rencontre entre des coachs pédagogiques et des ingénieur·es passionné·es par les sciences cognitives. Notre mission : rendre la réussite accessible à chacun·e en modernisant les méthodes d’apprentissage.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Nous construisons une plateforme qui met l’humain au centre, en combinant le meilleur de l’IA, du design et de la psychologie positive.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notre équipe</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              • Clara, coach pédagogique, accompagne les étudiant·es dans leur organisation.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              • Malik, ingénieur IA, conçoit les algorithmes qui adaptent les révisions à votre rythme.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              • Sofia, product designer, imagine des parcours fluides pour que chaque session reste agréable.
            </p>
          </div>
        </div>
      </section>

      <section id="avis" className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-3xl font-semibold text-slate-900 dark:text-white">
              4,8/5
              <div className="flex items-center text-amber-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Basé sur plus de 250 avis vérifiés.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <blockquote className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                “UP Mind a transformé mes révisions. Le suivi est clair et les rappels m’aident à rester régulière.”
              </p>
              <cite className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">Emma · Étudiante en droit</cite>
            </blockquote>
            <blockquote className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                “Les cartes mémo générées automatiquement sont un gain de temps incroyable. Je révise beaucoup plus efficacement.”
              </p>
              <cite className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">Lucas · Prépa scientifique</cite>
            </blockquote>
            <blockquote className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                “Enfin une app qui comprend notre charge mentale. L’agenda intelligent m’évite de procrastiner.”
              </p>
              <cite className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">Mina · Licence de psychologie</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <main id="connexion" className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-24">
        <div className="mt-16 w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-surface p-10 shadow-sm">
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
    </>
  );
}
