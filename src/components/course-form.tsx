'use client';

import { useState } from 'react';
import { createCourse, MissingFirebaseConfigError } from '@/lib/firestore';
import { getFirebaseConfigErrorMessage, isFirebaseConfigured } from '@/lib/firebase/client';
import { useAuth } from './auth-provider';

interface CourseFormProps {
  onCreated?: (courseId: string) => void;
}

export function CourseForm({ onCreated }: CourseFormProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      const courseId = await createCourse({
        userId: user.uid,
        title: title || 'Cours sans titre',
        content,
        sourceType: 'text'
      });

      setTitle('');
      setContent('');
      onCreated?.(courseId);
    } catch (err) {
      if (err instanceof MissingFirebaseConfigError) {
        setError(err.message);
      } else {
        setError('Erreur lors de la sauvegarde du cours.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Titre du cours</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-accent"
          placeholder="Ex: Chapitre 1 - Réseaux"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Contenu</label>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="h-60 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-accent"
          placeholder="Collez votre cours ici..."
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!isFirebaseConfigured && !error && (
        <p className="text-sm text-red-500">
          {getFirebaseConfigErrorMessage() ??
            "La configuration Firebase est manquante. Ajoutez les variables d'environnement requises."}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !isFirebaseConfigured}
        className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Enregistrement...' : 'Sauvegarder le cours'}
      </button>
    </form>
  );
}
