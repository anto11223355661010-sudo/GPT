import { notFound } from 'next/navigation';
import { FicheGenerator } from '@/components/fiche-generator';

const sectionConfig: Record<
  string,
  {
    title: string;
    description: string;
    placeholder?: string;
  }
> = {
  courses: {
    title: 'Mes cours',
    description: 'Ajoutez ou retrouvez vos supports d’apprentissage pour préparer vos fiches.',
    placeholder:
      'La gestion des cours arrive très bientôt. Vous pourrez centraliser vos supports et les transformer en fiches intelligentes en un clic.'
  },
  friends: {
    title: 'Mes amis',
    description: 'Suivez vos camarades et partagez vos fiches les plus utiles.',
    placeholder:
      'Invitez vos amis et collaborez sur vos révisions dès que cette section sera disponible.'
  },
  groups: {
    title: 'Mes groupes',
    description: 'Organisez vos révisions en équipe restreinte pour rester motivé.',
    placeholder:
      'La création et la gestion de groupes d’étude seront bientôt ouvertes aux premiers membres.'
  },
  summaries: {
    title: 'Fiches IA',
    description: 'Consultez vos fiches générées automatiquement grâce à notre IA.',
    placeholder:
      'Vous pourrez bientôt parcourir toutes vos fiches IA ici, les filtrer et les partager avec votre promotion.'
  },
  quizzes: {
    title: 'Mes exercices',
    description: 'Entraînez-vous avec des quiz générés à partir de vos cours.',
    placeholder:
      'La génération d’exercices personnalisés est en phase de test et sera activée dans une prochaine mise à jour.'
  },
  leaderboard: {
    title: 'Classement',
    description: 'Comparez votre progression avec vos amis et vos groupes.',
    placeholder:
      'Le classement gamifié arrivera prochainement pour dynamiser vos sessions de révision.'
  },
  fiches: {
    title: 'Mes fiches',
    description: 'Retrouvez toutes vos synthèses générées et lancez-en de nouvelles à la demande.'
  }
};

export default function DashboardSectionPage({ params }: { params: { section: string } }) {
  const section = params.section;
  const config = sectionConfig[section];

  if (!config) {
    notFound();
  }

  if (section === 'fiches') {
    return (
      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-text">{config.title}</h1>
          <p className="text-sm text-slate-600">{config.description}</p>
        </header>
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
          <FicheGenerator
            title="Générer une nouvelle fiche"
            description="Collez un cours ou importez vos notes pour obtenir instantanément une synthèse structurée."
            showEndpointNotice
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-text">{config.title}</h1>
        <p className="text-sm text-slate-600">{config.description}</p>
      </header>
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center text-slate-500 shadow-inner dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-200">Bientôt disponible</p>
        <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">{config.placeholder}</p>
      </div>
    </div>
  );
}
