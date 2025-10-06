export function Loader({ message = 'Chargement...' }: { message?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-surface px-6 py-4 shadow-sm">
        <div className="h-3 w-3 animate-ping rounded-full bg-accent" />
        <p className="text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
}
