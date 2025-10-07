import Link from 'next/link';
import { cookies } from 'next/headers';
import { Navbar } from '@/components/navbar';
import { getCurrentUser } from '@/lib/server-auth';

const HERO_HIGHLIGHTS = [
  'Plans de révision dynamiques qui s’adaptent à votre progression.',
  'Suggestions d’exercices ciblées générées par l’IA.',
  'Rappels intelligents pour garder le rythme sans stress.'
];

const FEATURE_CARDS = [
  {
    title: 'Agenda intelligent',
    description:
      'Générez des sessions personnalisées selon vos disponibilités et la priorité de chaque matière.'
  },
  {
    title: 'Cartes mémo propulsées par l’IA',
    description:
      'Transformez vos notes en flashcards automatiquement et révisez grâce à la répétition espacée.'
  },
  {
    title: 'Suivi de progression en temps réel',
    description:
      'Visualisez vos performances, repérez vos forces et ajustez vos objectifs sans perdre de temps.'
  }
];

const ADVANTAGE_ITEMS = [
  'Support multi-plateforme pour réviser où que vous soyez.',
  'Notifications intelligentes pour ne jamais perdre le fil.',
  'Méthodologie validée par des coachs pédagogiques et des étudiant·es.'
];

const ADVANTAGE_CARDS = [
  {
    title: 'Routine personnalisée',
    description:
      'Ajustez la charge de travail, les priorités et l’intensité des rappels selon vos objectifs.'
  },
  {
    title: 'Communauté motivante',
    description:
      'Rejoignez un groupe d’étudiant·es qui partagent leurs stratégies et se soutiennent au quotidien.'
  }
];

const TESTIMONIALS = [
  {
    quote:
      '“UP Mind a transformé mes révisions. Le suivi est clair et les rappels m’aident à rester régulière.”',
    author: 'Emma · Étudiante en droit'
  },
  {
    quote:
      '“Les cartes mémo générées automatiquement sont un gain de temps incroyable. Je révise beaucoup plus efficacement.”',
    author: 'Lucas · Prépa scientifique'
  },
  {
    quote:
      '“Enfin une app qui comprend notre charge mentale. L’agenda intelligent m’évite de procrastiner.”',
    author: 'Mina · Licence de psychologie'
  }
];

export default async function HomePage() {
  const skipAuth = cookies().get('skip_auth')?.value === '1';
  const user = skipAuth ? null : await getCurrentUser();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-white to-slate-100 px-6 pt-28 pb-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.18),transparent_45%)]" />
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
            <div className="space-y-7 text-left">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
                Votre copilote d’apprentissage
              </span>
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                  {user ? `Ravi de vous revoir, ${user.displayName}.` :
                    'Transformez vos révisions en un parcours motivant et personnalisé.'}
                </h1>
                <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
                  {user
                    ? 'Retrouvez vos cours, vos fiches et vos amis en un clin d’œil ou explorez nos nouveautés.'
                    : 'UP Mind combine IA et coaching pédagogique pour construire des routines efficaces, mesurer vos progrès et vous maintenir inspiré jusqu’à la réussite.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {user ? (
                  <>
                    <Link
                      href="/app"
                      className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      Accéder à mon espace
                    </Link>
                    <Link
                      href="/app/summaries"
                      className="rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-500 hover:text-slate-700 dark:border-slate-700 dark:text-white dark:hover:border-slate-500"
                    >
                      Ouvrir mes fiches
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/connexion"
                      className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      Commencer maintenant
                    </Link>
                    <Link
                      href="/tarifs"
                      className="rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-500 hover:text-slate-700 dark:border-slate-700 dark:text-white dark:hover:border-slate-500"
                    >
                      Voir les forfaits
                    </Link>
                  </>
                )}
              </div>
            </div>
            <ul className="grid w-full max-w-sm gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
              {HERO_HIGHLIGHTS.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-800/80 dark:text-slate-200"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-900 py-16 text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),rgba(15,23,42,0.6))] opacity-70" />
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
            <span className="rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80">
              La suite vous attend
            </span>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Prêt·e pour une immersion totale ? Découvrez nos fonctionnalités phares.
            </h2>
            <p className="max-w-2xl text-base text-white/80">
              Faites défiler pour explorer l’écosystème UP Mind et laissez-vous guider par une expérience pensée pour vous faire gagner du temps à chaque session de travail.
            </p>
            <a
              href="#features"
              className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-medium transition hover:border-white hover:bg-white/10"
            >
              Explorer les fonctionnalités
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>

        <section id="features" className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Fonctionnalités clés</h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Des outils puissants et intuitifs pour suivre vos cours, mémoriser plus vite et travailler avec confiance.
              </p>
            </div>
            <div className="grid gap-6">
              {FEATURE_CARDS.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white dark:bg-slate-950/60">
          <div className="mx-auto max-w-6xl space-y-10 px-6">
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Votre espace en un clic</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Mes fiches, mes cours et mon abonnement réunis</h2>
              <p className="mx-auto max-w-2xl text-base text-white/70">
                Accédez rapidement à vos pages essentielles : retrouvez vos fiches synthétiques, gérez vos cours et adaptez votre forfait quand vous le souhaitez.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Link
                href="/app"
                className="group flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/5 p-6 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-white/70">Mon profil</span>
                <span className="text-2xl font-semibold text-white">Tableau de bord</span>
                <p className="text-sm text-white/70">Retrouvez l’ensemble de vos activités et votre progression.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  Y aller
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
              <Link
                href="/app/courses"
                className="group flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/5 p-6 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-white/70">Organisation</span>
                <span className="text-2xl font-semibold text-white">Mes cours</span>
                <p className="text-sm text-white/70">Ajoutez de nouveaux supports et planifiez vos sessions IA.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  Gérer
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
              <Link
                href="/app/summaries"
                className="group flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/5 p-6 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-white/70">Révisions</span>
                <span className="text-2xl font-semibold text-white">Mes fiches</span>
                <p className="text-sm text-white/70">Retrouvez toutes vos synthèses générées et téléchargez-les.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  Réviser
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
              <Link
                href="/tarifs"
                className="group flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/5 p-6 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-white/70">Abonnement</span>
                <span className="text-2xl font-semibold text-white">Changer de forfait</span>
                <p className="text-sm text-white/70">Comparez nos offres et ajustez votre abonnement en quelques clics.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  Découvrir
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section id="avantages" className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Les avantages UP Mind</h2>
                <p className="text-base text-slate-600 dark:text-slate-300">
                  Optimisez chaque minute de travail grâce à un environnement conçu pour éliminer les frictions et renforcer votre régularité.
                </p>
                <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  {ADVANTAGE_ITEMS.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 text-lg">✅</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-6">
                {ADVANTAGE_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">À propos de nous</h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                UP Mind est né de la rencontre entre des coachs pédagogiques et des ingénieur·es passionné·es par les sciences cognitives. Notre mission : rendre la réussite accessible à chacun·e en modernisant les méthodes d’apprentissage.
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Nous construisons une plateforme qui met l’humain au centre, en combinant le meilleur de l’IA, du design et de la psychologie positive.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notre équipe</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>• Clara, coach pédagogique, accompagne les étudiant·es dans leur organisation.</li>
                <li>• Malik, ingénieur IA, conçoit les algorithmes qui adaptent les révisions à votre rythme.</li>
                <li>• Sofia, product designer, imagine des parcours fluides pour que chaque session reste agréable.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="avis" className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-3xl font-semibold text-slate-900 dark:text-white">
                4,8/5
                <div className="flex items-center text-amber-400" aria-hidden="true">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Basé sur plus de 250 avis vérifiés.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <blockquote
                  key={testimonial.author}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <p className="text-sm text-slate-600 dark:text-slate-300">{testimonial.quote}</p>
                  <cite className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{testimonial.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
