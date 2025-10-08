export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 font-semibold ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-violet-500/30 dark:shadow-fuchsia-500/20">
        UP
      </span>
      <span className="text-lg tracking-tight text-slate-900 dark:text-white">
        Mind
      </span>
    </span>
  );
}
