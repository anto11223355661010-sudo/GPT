'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';

export function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-6 pt-6">
      <div
        className="relative mx-auto flex w-full max-w-5xl items-center justify-between overflow-hidden rounded-full border border-white/30 bg-white/15 px-6 py-3 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.6)] backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 supports-[backdrop-filter]:bg-white/25 before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.25),rgba(148,163,184,0.08))] before:opacity-80 before:content-[''] after:pointer-events-none after:absolute after:inset-px after:-z-10 after:rounded-full after:border after:border-white/40 after:opacity-40 after:content-[''] dark:border-slate-700/40 dark:bg-slate-900/15 dark:supports-[backdrop-filter]:bg-slate-900/25 dark:before:bg-[linear-gradient(120deg,rgba(148,163,184,0.08),rgba(15,23,42,0.45))] dark:before:opacity-90 dark:after:border-slate-700/50"
      >
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          UP Mind
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex dark:text-slate-200">
          <a className="transition hover:text-slate-900 dark:hover:text-white" href="#features">
            Fonctionnalités
          </a>
          <a className="transition hover:text-slate-900 dark:hover:text-white" href="#avantages">
            Avantages
          </a>
          <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/tarifs">
            Tarifs
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="h-9 w-28 animate-pulse rounded-full bg-white/60 text-transparent dark:bg-slate-700/60">
              Chargement
            </span>
          ) : user ? (
            <>
              <Link
                href="/app"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
              >
                Mon profil
              </Link>
              <Link
                href="/app/fiches"
                className="rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-15px_rgba(15,23,42,0.9)] transition hover:bg-slate-900 dark:bg-white/90 dark:text-slate-900"
              >
                Mes fiches
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
              >
                S’inscrire
              </Link>
              <Link
                href="/connexion"
                className="rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-15px_rgba(15,23,42,0.9)] transition hover:bg-slate-900 dark:bg-white/90 dark:text-slate-900"
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
