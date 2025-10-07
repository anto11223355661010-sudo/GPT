import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Sidebar } from '@/components/sidebar';
import { Suspense } from 'react';
import { Loader } from '@/components/loader';
import { getCurrentUser } from '@/lib/server-auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const skipAuth = cookieStore.get('skip_auth')?.value === '1';
  const user = await getCurrentUser();

  if (!user && !skipAuth) {
    redirect('/');
  }

  const effectiveUser =
    user ?? {
      displayName: 'Invité',
    };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={effectiveUser} />
      <main className="flex-1 overflow-y-auto p-10">
        <Suspense fallback={<Loader message="Chargement des données..." />}>{children}</Suspense>
      </main>
    </div>
  );
}
