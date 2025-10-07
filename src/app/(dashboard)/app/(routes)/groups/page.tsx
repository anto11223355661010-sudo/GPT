import { getCurrentUser } from '@/lib/server-auth';

const mockGroups = [
  {
    id: 'grp-1',
    name: 'Prépa Physique',
    members: 6,
    nextSession: 'Jeudi 18h',
    focus: 'Révisions des ondes et optique'
  },
  {
    id: 'grp-2',
    name: 'Licence Droit - L2',
    members: 4,
    nextSession: 'Samedi 10h',
    focus: 'Synthèse de jurisprudence'
  }
];

const suggestions = [
  {
    id: 'sg-1',
    name: 'Méthodo dissertation',
    members: 12,
    focus: 'Partage de plans types et corrections'
  },
  {
    id: 'sg-2',
    name: 'IA & Productivité',
    members: 8,
    focus: 'Ateliers pour accélérer les révisions'
  }
];

export default async function GroupsPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text">Mes groupes</h1>
        <p className="text-sm text-slate-600">
          Retrouvez vos espaces collaboratifs pour réviser ensemble et partager les demandes générées par l’IA.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text">Créer un nouveau groupe</h2>
            <p className="mt-2 text-sm text-slate-600">
              Invitez vos amis et attribuez un planning commun pour suivre vos demandes et fiches.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">
                Lancer un groupe
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-text">
                Programmer une session
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Groupes actifs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {mockGroups.map((group) => (
                <article key={group.id} className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-text">{group.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{group.focus}</p>
                  <dl className="mt-4 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <dt>Membres</dt>
                      <dd className="font-semibold text-text">{group.members}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Prochaine session</dt>
                      <dd className="font-semibold text-text">{group.nextSession}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">
                      Partager une demande
                    </button>
                    <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-text">
                      Ouvrir le groupe
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-text">Suggestions pour {user?.displayName ?? 'vous'}</h2>
            <p className="mt-1 text-sm text-slate-600">
              Rejoignez une communauté qui correspond à vos objectifs.
            </p>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-sm font-semibold text-text">{suggestion.name}</p>
                <p className="text-xs text-slate-500">{suggestion.focus}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{suggestion.members} membres</span>
                  <button className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">Rejoindre</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
