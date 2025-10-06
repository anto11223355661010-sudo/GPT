import type { Quiz } from '@/types/quiz';

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-text">QCM généré</h3>
        <p className="text-xs text-slate-500">
          {new Date(quiz.createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </header>
      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <div key={question.question} className="space-y-2">
            <h4 className="text-sm font-semibold text-text">
              {index + 1}. {question.question}
            </h4>
            <ul className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.answer;
                return (
                  <li
                    key={optionIndex}
                    className={`rounded-xl border px-3 py-2 text-sm ${
                      isCorrect
                        ? 'border-accent bg-violet-50 text-accent'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
            {question.explanation && (
              <p className="text-xs text-slate-500">Explication : {question.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
