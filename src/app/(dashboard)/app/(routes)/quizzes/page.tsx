import { getCurrentUser } from '@/lib/server-auth';
import { QuizGenerator } from '@/components/quiz-generator';
import { QuizCard } from '@/components/quiz-card';
import { listQuizzesServer } from '@/lib/firestore-admin';

export default async function QuizzesPage() {
  const user = await getCurrentUser();
  const quizzes = user ? await listQuizzesServer(user.uid) : [];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text">Exercices personnalisés</h1>
        <p className="text-sm text-slate-600">Générez des QCM de 5 questions pour mémoriser efficacement vos cours.</p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-text">Nouveau QCM</h2>
        <p className="mt-2 text-sm text-slate-600">
          Collez votre cours et obtenez instantanément un quiz à partager avec vos amis.
        </p>
        <div className="mt-6">
          <QuizGenerator />
        </div>
      </section>

      {quizzes.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-text">Historique</h2>
          <div className="space-y-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
