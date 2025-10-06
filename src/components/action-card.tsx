interface ActionCardProps {
  title: string;
  description: string;
  href: string;
}

export function ActionCard({ title, description, href }: ActionCardProps) {
  return (
    <a
      href={href}
      className="flex h-44 flex-col justify-between rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-lg"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-text">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <span className="text-sm font-medium text-accent">Commencer →</span>
    </a>
  );
}
