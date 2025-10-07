import Link from 'next/link';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    description: 'Idéal pour découvrir UP Mind avec des fonctionnalités essentielles.',
    features: ['Accès aux routines de base', 'Cartes mémo limitées', 'Suivi de progression sur 7 jours'],
    cta: 'Commencer',
    highlighted: false,
  },
  {
    name: 'Essentiel',
    price: '9,90€',
    sub: 'par mois',
    description: 'Le meilleur rapport qualité/prix pour booster vos révisions au quotidien.',
    features: [
      'Agenda intelligent illimité',
      'Cartes mémo automatiques et partagées',
      'Suivi détaillé avec recommandations personnalisées',
    ],
    cta: 'Choisir Essentiel',
    highlighted: true,
  },
  {
    name: 'Avancé',
    price: '19,90€',
    sub: 'par mois',
    description: 'Pour les étudiant·es qui veulent un accompagnement complet et collaboratif.',
    features: [
      'Coaching pédagogique bimensuel',
      'Rapports d’équipe et analytics avancées',
      'Export des données et intégrations premium',
    ],
    cta: 'Passer en Avancé',
    highlighted: false,
  },
];

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">Tarifs</p>
          <h1 className="text-4xl font-semibold">Des plans adaptés à chaque niveau d&apos;engagement</h1>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            Que vous commenciez vos révisions ou que vous cherchiez un accompagnement expert, choisissez la formule qui vous permet de rester concentré·e sur vos objectifs.
          </p>
        </div>
        <div id="tarifs" className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:-translate-y-1 ${
                plan.highlighted ? 'border-violet-400/80 bg-gradient-to-b from-violet-500/30 via-violet-500/20 to-transparent text-white' : ''
              }`}
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.sub && <span className="text-sm text-white/70">{plan.sub}</span>}
                </div>
                <p className="text-sm text-white/70">{plan.description}</p>
                <ul className="space-y-2 text-sm text-white/80">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 text-base">✔️</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition ${
                  plan.highlighted
                    ? 'bg-white text-violet-600 hover:bg-violet-50'
                    : 'border border-white/40 text-white hover:border-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
