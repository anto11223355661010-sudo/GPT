import Link from 'next/link';
import { StatCard } from '@/components/stat-card';
import { getCurrentUser } from '@/lib/server-auth';

const quickLinks = [
  {
    label: 'Mes cours',
    description: 'Ajoutez ou retrouvez vos supports d’apprentissage.',
    href: '/app/courses'
  },
  {
    label: 'Mes amis',
    description: 'Suivez vos camarades et partagez vos fiches.',
    href: '/app/friends'
  },
  {
    label: 'Mes groupes',
    description: 'Organisez vos révisions en équipe restreinte.',
    href: '/app/groups'
  },
  {
    label: 'Mes fiches',
    description: 'Retrouvez toutes vos synthèses générées.',
    href: '/app/fiches'
  }
];

const recentRequests = [
  {
    id: 'REQ-3215',
    course: 'Analyse - suites et séries',
    type: 'Fiche synthétique classique',
    status: 'Généré',
    createdAt: 'Il y a 2 h',
    excerpt:
      'Définition d’une suite, convergence, théorème de Cauchy, méthodes de comparaison et séries numériques.'
  },
  {
    id: 'REQ-3212',
    course: 'Histoire contemporaine - 2nde GM',
    type: 'Fiche développée',
    status: 'En cours',
    createdAt: 'Hier',
    excerpt:
      'Analyse chronologique du conflit, fronts principaux, effort industriel et conséquences géopolitiques.'
  }
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-12">
      <header className="space-y-3 rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
        <p className="text-sm font-medium text-accent">Connexion réussie 🎉</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-text">Heureux de vous retrouver, {user?.displayName ?? 'Étudiant'} !</h1>
            <p className="mt-2 text-sm text-slate-600">
              Naviguez entre vos cours, vos amis et vos groupes pour lancer une nouvelle demande intelligente.
            </p>
          </div>
          <Link
            href="/app/courses"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Ajouter un cours
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-w-[180px] flex-1 flex-col rounded-2xl border border-slate-200 bg-white/60 px-5 py-4 transition hover:border-accent"
            >
              <span className="text-sm font-semibold text-text">{link.label}</span>
              <span className="mt-1 text-xs text-slate-500">{link.description}</span>
            </Link>
          ))}
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Cours actifs" value="12" hint="Supports disponibles" />
        <StatCard label="Groupes" value="3" hint="Sessions collaboratives" />
        <StatCard label="Demandes IA" value="18" hint="Historique des synthèses" />
        <StatCard label="Heures gagnées" value="6h" hint="Estimées cette semaine" />
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text">Historique des demandes</h2>
            <p className="text-sm text-slate-600">
              Retrouvez vos fiches synthétiques classiques et développées générées en un clic.
            </p>
          </div>
          <Link
            href="/app/fiches"
            className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-text transition hover:border-accent"
          >
            Voir toutes les fiches
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recentRequests.map((request) => (
            <article
              key={request.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-accent">{request.id}</span>
                  <span>{request.createdAt}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">{request.course}</h3>
                  <p className="text-sm text-slate-600">{request.excerpt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {request.type}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {request.status}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90">
                  Télécharger la fiche
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-text transition hover:border-accent">
                  Voir le détail
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <header>
              <h2 className="text-2xl font-semibold text-text">Créer une demande</h2>
              <p className="mt-2 text-sm text-slate-600">
                Décrivez rapidement votre cours et laissez notre IA générer la fiche adaptée (classique ou développée).
              </p>
            </header>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text" htmlFor="course-name">
                  Nom du cours
                </label>
                <input
                  id="course-name"
                  name="course-name"
                  type="text"
                  placeholder="Ex. Thermodynamique - Chapitre 2"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-text">Type de fiche</span>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
                      <span>Fiche synthétique classique</span>
                      <input type="radio" name="sheet-type" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
                      <span>Fiche développée</span>
                      <input type="radio" name="sheet-type" />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text" htmlFor="course-import">
                    Ajouter un support
                  </label>
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                    Glissez-déposez votre fichier ou
                    <button type="button" className="ml-2 font-semibold text-accent">
                      importer un cours
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-text" htmlFor="instructions">
                  Instructions supplémentaires
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={4}
                  placeholder="Précisez les notions clés ou les éléments à développer."
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                >
                  Envoyer ma demande
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-text transition hover:border-accent"
                >
                  Enregistrer pour plus tard
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-accent/20 bg-gradient-to-br from-white to-slate-50 p-6 shadow-inner">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Résultat IA (API)</span>
              <h3 className="mt-2 text-xl font-semibold text-text">Synthèse générée : Thermodynamique - Chapitre 2</h3>
              <p className="mt-4 text-sm text-slate-600">
                Voici un aperçu de la fiche produite automatiquement après votre dernière requête.
              </p>
            </div>
            <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
              <div>
                <h4 className="text-sm font-semibold text-text">1. Concepts essentiels</h4>
                <p className="mt-1">
                  Premier principe, énergie interne, capacités calorifiques et travail des gaz parfaits.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">2. Méthode rapide</h4>
                <p className="mt-1">
                  Identifiez le système, écrivez le bilan énergétique et appliquez les transformations usuelles.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">3. Aller plus loin</h4>
                <p className="mt-1">
                  Cas de Carnot, efficacité maximale et applications industrielles (cycle Rankine, moteurs).</p>
              </div>
            </div>
            <button className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90">
              Copier la synthèse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
