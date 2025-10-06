import { NextResponse } from 'next/server';

const SUMMARY_PROMPTS = {
  concis: 'Résumé concis en points clés',
  moyen: 'Résumé intermédiaire avec détails essentiels',
  developpe: 'Résumé détaillé et structuré'
} as const;

export async function POST(request: Request) {
  const { content } = await request.json();

  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Contenu manquant' }, { status: 400 });
  }

  const apiKey = process.env.IA_API_KEY;
  const apiBase = process.env.IA_API_BASE_URL;

  if (!apiKey || !apiBase) {
    return NextResponse.json({ error: 'Configuration IA manquante' }, { status: 500 });
  }

  const prompt = `Tu es un assistant pédagogique francophone. Génère trois résumés (${Object.values(
    SUMMARY_PROMPTS
  ).join(', ')}) pour le contenu suivant :\n\n${content}`;

  const response = await fetch(apiBase, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const message = await response.text();
    return NextResponse.json({ error: message || 'Erreur IA' }, { status: 500 });
  }

  const data = await response.json();
  const rawVariants: string[] = Array.isArray(data.variants)
    ? data.variants
    : typeof data.output === 'string'
      ? data.output.split('\n\n').slice(0, 3)
      : [];

  const variants = ['concis', 'moyen', 'developpe'].map((label, index) => ({
    label: label as 'concis' | 'moyen' | 'developpe',
    content: rawVariants[index] ?? ''
  }));

  return NextResponse.json({ variants });
}
