'use client';

import { useState } from 'react';
import { requestQuiz } from '@/lib/ai';
import { createQuiz } from '@/lib/firestore';
import { useAuth } from './auth-provider';
import type { QuizQuestion } from '@/types/quiz';

export function QuizGenerator() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const handleGenerate = async () => {
    if (!content) {
      setError('Ajoutez du contenu avant de lancer la génération.');
      return;
    }

    if (!user) {
      setError('Veuillez vous connecter.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await requestQuiz({ content });
      setQuestions(response.questions);
      await createQuiz({
        userId: user.uid,
        courseId: 'manual',
        questions: response.questions
      });
    } catch (err) {
      console.error(err);
      setError('Impossible de générer le QCM.');
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
        placeholder="Collez votre cours pour créer un QCM..."
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Génération en cours...' : 'Créer le QCM'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      {questions.length > 0 && (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.question} className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-text">
                {index + 1}. {question.question}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {question.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    className={`rounded-xl border px-3 py-2 ${
                      optionIndex === question.answer
                        ? 'border-accent bg-violet-50 text-accent'
                        : 'border-slate-200'
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              {question.explanation && (
                <p className="mt-2 text-xs text-slate-500">{question.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
