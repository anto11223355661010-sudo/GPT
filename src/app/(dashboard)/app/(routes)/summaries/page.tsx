import { getCurrentUser } from '@/lib/server-auth';
import { SummaryTabs } from '@/components/summary-tabs';
import { SummaryGenerator } from '@/components/summary-generator';
import { listSummariesServer } from '@/lib/firestore-admin';

export default async function SummariesPage() {
  const user = await getCurrentUser();
  const summaries = user ? await listSummariesServer(user.uid) : [];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text">Fiches intelligentes</h1>
        <p className="text-sm text-slate-600">Générez automatiquement trois niveaux de résumés pour chaque cours.</p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-text">Nouveau résumé</h2>
        <p className="mt-2 text-sm text-slate-600">
          Collez votre cours ci-dessous et laissez l’IA créer une fiche adaptée à votre temps disponible.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
          <SummaryGenerator />
          <aside className="space-y-4 rounded-3xl border border-violet-200 bg-white/80 p-6 text-sm text-slate-600 shadow-sm dark:border-violet-900/40 dark:bg-slate-900/70 dark:text-slate-300">
            <h3 className="text-base font-semibold text-text">Comment connecter l’API ChatGPT ?</h3>
            <ol className="space-y-3 text-sm">
              <li>
                <span className="font-medium text-text">1.</span> Ajoutez vos variables <code className="rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">IA_API_KEY</code> et
                <code className="ml-1 rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">IA_API_BASE_URL</code> à votre fichier d’environnement.
              </li>
              <li>
                <span className="font-medium text-text">2.</span> Relancez l’application pour prendre en compte les nouvelles clés.
              </li>
              <li>
                <span className="font-medium text-text">3.</span> Collez votre cours ici, cliquez sur « Générer le résumé » et récupérez les trois fiches proposées.
              </li>
            </ol>
            <p>
              Astuce : variez la longueur de vos cours pour comparer les résumés concis, moyens et développés et choisissez celui qui correspond le mieux à votre session de révision.
            </p>
          </aside>
        </div>
      </section>

      {summaries.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-text">Historique</h2>
          <div className="space-y-6">
            {summaries.map((summary) => (
              <div key={summary.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text">Résumé du {new Date(summary.createdAt).toLocaleString('fr-FR')}</p>
                </div>
                <SummaryTabs variants={summary.variants} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
