'use client';

import { FormEvent, useState } from 'react';

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_FICHE_API_URL?.trim() || 'http://localhost:3001/generate-fiche';

interface FicheGeneratorProps {
  title?: string;
  description?: string;
  showEndpointNotice?: boolean;
  className?: string;
}

export function FicheGenerator({
  title = 'Générateur de fiche (bêta)',
  description =
    'Collez votre cours ci-dessous, lancez la requête et vérifiez que le serveur Express renvoie bien une fiche de révision structurée.',
  showEndpointNotice = false,
  className = ''
}: FicheGeneratorProps) {
  const [cours, setCours] = useState('');
  const [fiche, setFiche] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFiche('');

    if (!cours.trim()) {
      setError('Veuillez saisir un texte de cours avant de lancer la génération.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cours })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Une erreur est survenue pendant la génération.');
      }

      if (typeof payload?.fiche !== 'string') {
        throw new Error("La réponse du serveur ne contient pas de fiche valide.");
      }

      setFiche(payload.fiche);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur inattendue est survenue.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        {description ? <p className="text-slate-600 dark:text-slate-300">{description}</p> : null}
        {showEndpointNotice ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Requête envoyée vers&nbsp;
            <span className="font-mono font-medium text-slate-700 dark:text-slate-200">{API_ENDPOINT}</span>
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Texte du cours</span>
          <textarea
            value={cours}
            onChange={(event) => setCours(event.target.value)}
            placeholder="Collez ici le contenu de votre cours..."
            className="h-56 resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-inner outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-500/30"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {isLoading ? 'Génération en cours…' : 'Générer la fiche'}
        </button>
      </form>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/50 dark:text-red-200">
          {error}
        </div>
      ) : null}

      {fiche ? (
        <div className="space-y-3 text-left">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Fiche générée</h2>
          <div className="rounded-xl border border-slate-200 bg-white/80 p-6 text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100">
            {fiche.split('\n').map((line, index) => (
              <p key={`${line}-${index}`} className="whitespace-pre-wrap leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
