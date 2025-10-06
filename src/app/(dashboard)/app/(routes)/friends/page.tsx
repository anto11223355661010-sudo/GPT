import { getCurrentUser } from '@/lib/server-auth';

const mockFriends = [
  { id: '1', name: 'Camille', status: 'Étudie les statistiques' },
  { id: '2', name: 'Noah', status: 'Vient de terminer un QCM' }
];

export default async function FriendsPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text">Amis et partage</h1>
        <p className="text-sm text-slate-600">
          Ajoutez vos camarades pour partager des fiches et comparer vos scores.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-text">Inviter un ami</h2>
        <p className="mt-2 text-sm text-slate-600">
          Partagez ce lien pour inviter un ami à rejoindre UP Mind :
        </p>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          https://upmind.app/invite/{user?.uid ?? 'code'}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text">Vos amis</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {mockFriends.map((friend) => (
            <div key={friend.id} className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
              <p className="text-sm font-semibold text-text">{friend.name}</p>
              <p className="text-xs text-slate-500">{friend.status}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">
                  Partager une fiche
                </button>
                <button className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">Défier</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
