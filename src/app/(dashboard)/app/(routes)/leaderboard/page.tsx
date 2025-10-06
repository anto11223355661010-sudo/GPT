import { LeaderboardTable } from '@/components/leaderboard-table';
import { listLeaderboardEntriesServer } from '@/lib/firestore-admin';

function getCurrentWeekKey() {
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

export default async function LeaderboardPage() {
  const weekKey = getCurrentWeekKey();
  const entries = await listLeaderboardEntriesServer(weekKey);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text">Classement hebdomadaire</h1>
        <p className="text-sm text-slate-600">
          Les 10 meilleurs étudiants de la semaine {weekKey}. Chaque quiz réussi rapporte des points.
        </p>
      </header>

      <LeaderboardTable entries={entries} />
    </div>
  );
}
