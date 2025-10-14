import { FicheGenerator } from '@/components/fiche-generator';

export default function FicheStandalonePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-16 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
        <FicheGenerator showEndpointNotice />
      </div>
    </main>
  );
}
