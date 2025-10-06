import type { LeaderboardEntry } from '@/types/user';

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Étudiant</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {entries.slice(0, 10).map((entry, index) => (
            <tr key={entry.userId} className={index === 0 ? 'bg-violet-50' : ''}>
              <td className="px-6 py-4 text-sm font-semibold text-slate-600">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-text">{entry.displayName}</td>
              <td className="px-6 py-4 text-right text-sm font-semibold text-accent">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
