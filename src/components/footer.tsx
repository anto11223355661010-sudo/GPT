import Link from 'next/link';
import { Logo } from './logo';

const footerLinks = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Avantages', href: '#avantages' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Générateur de fiches IA', href: '/app/summaries' }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
            La plateforme de révision qui combine intelligence artificielle et coaching pédagogique pour transformer vos cours en
            fiches mémorables.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">Explorer</span>
          <nav className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-slate-900 dark:hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">Support</span>
          <p>
            Besoin d’aide pour connecter l’API ChatGPT ? Consultez notre générateur de fiches IA et suivez les étapes indiquées
            pour configurer vos clés.
          </p>
          <Link
            href="mailto:support@upmind.app"
            className="inline-flex items-center gap-2 font-medium text-slate-900 transition hover:underline dark:text-white"
          >
            Contacter le support
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-2 px-6 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {year} UP Mind. Tous droits réservés.</p>
        <p>Fait avec passion pour booster vos révisions et vos résultats.</p>
      </div>
    </footer>
  );
}
