import Link from 'next/link';
import { CourseForm } from '@/components/course-form';
import { listCoursesServer } from '@/lib/firestore-admin';
import { getCurrentUser } from '@/lib/server-auth';

export default async function CoursesPage() {
  const user = await getCurrentUser();

  const courses = user ? await listCoursesServer(user.uid) : [];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text">Mes cours</h1>
        <p className="text-sm text-slate-600">Importez vos supports pour générer résumés et QCM en un clic.</p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-text">Nouveau cours</h2>
            <p className="mt-2 text-sm text-slate-600">
              Collez votre contenu ci-dessous. Les fichiers PDF peuvent être importés via Storage.
            </p>
            <div className="mt-6">
              <CourseForm />
            </div>
          </div>

          <div className="rounded-3xl border border-violet-200/60 bg-gradient-to-br from-white via-white to-violet-50 p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-text">Connecter l’IA et générer vos fiches</h2>
            <ol className="mt-4 space-y-4 text-sm text-slate-700">
              <li>
                <span className="font-semibold text-violet-700">1.&nbsp;Ajoutez votre clé API</span>
                <p className="mt-1 text-slate-600">
                  Renseignez <code className="rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-700">AI_API_KEY</code> et
                  <code className="ml-1 rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-700">AI_API_BASE_URL</code> dans vos variables d’environnement pour relier UP Mind à ChatGPT.
                </p>
              </li>
              <li>
                <span className="font-semibold text-violet-700">2.&nbsp;Déposez votre cours</span>
                <p className="mt-1 text-slate-600">
                  Enregistrez le cours via le formulaire ci-dessus ou importez un fichier PDF depuis Storage. Nous segmentons automatiquement le contenu pour l’IA.
                </p>
              </li>
              <li>
                <span className="font-semibold text-violet-700">3.&nbsp;Générez vos fiches</span>
                <p className="mt-1 text-slate-600">
                  Ouvrez ensuite le <Link href="/app/summaries" className="font-semibold text-violet-700 hover:text-violet-800">Générateur IA</Link> et choisissez le format de fiche souhaité : synthèse, flashcards ou plan révision.
                </p>
              </li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/app/summaries"
                className="inline-flex items-center justify-center rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
              >
                Accéder au générateur
              </Link>
              <Link
                href="/app/fiches"
                className="inline-flex items-center justify-center rounded-full border border-violet-200 px-5 py-2 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:text-violet-800"
              >
                Voir mes fiches IA
              </Link>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-text">Historique</h3>
            <p className="mt-2 text-sm text-slate-600">{courses.length} cours enregistrés.</p>
            <ul className="mt-4 space-y-3">
              {courses.map((course) => (
                <li key={course.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                  <p className="text-sm font-medium text-text">{course.title}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(course.updatedAt).toLocaleDateString('fr-FR')}
                  </p>
                </li>
              ))}
            </ul>
            {courses.length === 0 && (
              <p className="mt-4 text-xs text-slate-500">
                Dès que vous ajoutez un cours, il apparaît ici avec sa dernière date de mise à jour.
              </p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
