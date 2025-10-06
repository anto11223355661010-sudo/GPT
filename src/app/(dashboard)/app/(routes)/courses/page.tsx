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
        <div className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-text">Nouveau cours</h2>
          <p className="mt-2 text-sm text-slate-600">Collez votre contenu ci-dessous. Les fichiers PDF peuvent être importés via Storage.</p>
          <div className="mt-6">
            <CourseForm />
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
          </div>
        </aside>
      </section>
    </div>
  );
}
