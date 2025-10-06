import Link from 'next/link';
import { ActionCard } from '@/components/action-card';
import { StatCard } from '@/components/stat-card';
import { getCurrentUser } from '@/lib/server-auth';

const actions = [
  {
    title: 'Importer un cours',
    description: 'Collez un texte ou importez un PDF pour commencer à réviser.',
    href: '/app/courses'
  },
  {
    title: 'Générer un résumé',
    description: 'Créez une fiche synthèse en trois niveaux de détail.',
    href: '/app/summaries'
  },
  {
    title: 'Créer un QCM',
    description: 'Transformez votre cours en quiz d’entraînement instantané.',
    href: '/app/quizzes'
  }
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-accent">Bonjour {user?.displayName ?? 'Étudiant'} 👋</p>
        <h1 className="text-3xl font-semibold text-text">Prêt à réviser sans distraction ?</h1>
        <p className="text-sm text-slate-600">
          Centralisez vos cours, générez des fiches intelligentes et mesurez votre progression.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Cours" value="--" hint="Vos contenus importés" />
        <StatCard label="Fiches" value="--" hint="Résumés générés" />
        <StatCard label="Quiz" value="--" hint="Sessions d’entraînement" />
        <StatCard label="Score" value="--" hint="Points hebdomadaires" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => (
          <ActionCard key={action.href} {...action} />
        ))}
      </section>

      <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-text">Partager avec vos amis</h2>
        <p className="mt-2 text-sm text-slate-600">
          Invitez votre cercle et progressez ensemble. Les classements sont mis à jour chaque semaine.
        </p>
        <Link className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white" href="/app/friends">
          Gérer mes amis
        </Link>
      </section>
    </div>
  );
}
