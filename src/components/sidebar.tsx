'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Accueil', href: '/app' },
  { label: 'Cours', href: '/app/courses' },
  { label: 'Fiches', href: '/app/summaries' },
  { label: 'Exercices', href: '/app/quizzes' },
  { label: 'Amis', href: '/app/friends' },
  { label: 'Classement', href: '/app/leaderboard' }
];

export function Sidebar({ user }: { user: { displayName: string } }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-surface p-6">
      <div className="mb-10 space-y-1">
        <h2 className="text-2xl font-semibold text-text">UP Mind</h2>
        <p className="text-sm text-slate-500">Bienvenue, {user.displayName}</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-accent text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
