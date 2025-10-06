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
        <div className="mt-6">
          <SummaryGenerator />
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
