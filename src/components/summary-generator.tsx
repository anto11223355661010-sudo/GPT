'use client';

import { useState } from 'react';
import { requestSummary } from '@/lib/ai';
import { createSummary, MissingFirebaseConfigError } from '@/lib/firestore';
import { getFirebaseConfigErrorMessage, isFirebaseConfigured } from '@/lib/firebase/client';
import { useAuth } from './auth-provider';
import { SummaryTabs } from './summary-tabs';
import type { SummaryVariant } from '@/types/summary';

export function SummaryGenerator({ courseContent }: { courseContent?: string }) {
  const { user } = useAuth();
  const [content, setContent] = useState(courseContent ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<SummaryVariant[]>([]);

  const handleGenerate = async () => {
    if (!content) {
      setError('Ajoutez du contenu avant de lancer la génération.');
      return;
    }

    if (!user) {
      setError('Veuillez vous connecter.');
      return;
    }

    if (!isFirebaseConfigured) {
      setError(
        getFirebaseConfigErrorMessage() ??
          "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await requestSummary({ content });
      setVariants(response.variants);
      await createSummary({
        userId: user.uid,
        courseId: 'manual',
        variants: response.variants
      });
    } catch (err) {
      if (err instanceof MissingFirebaseConfigError) {
        setError(err.message);
      } else {
        console.error(err);
        setError("La génération n'a pas abouti. Réessayez dans un instant.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="h-60 w-full resize-none rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-accent"
        placeholder="Collez votre cours à résumer..."
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !isFirebaseConfigured}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Génération en cours...' : 'Générer le résumé'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!isFirebaseConfigured && !error && (
          <p className="text-sm text-red-500">
            {getFirebaseConfigErrorMessage() ??
              "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."}
          </p>
        )}
      </div>
      {variants.length > 0 && <SummaryTabs variants={variants} />}
    </div>
  );
}
