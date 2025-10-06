import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Suspense } from 'react';
import { Loader } from '@/components/loader';
import { getCurrentUser } from '@/lib/server-auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto p-10">
        <Suspense fallback={<Loader message="Chargement des données..." />}>{children}</Suspense>
      </main>
    </div>
  );
}
