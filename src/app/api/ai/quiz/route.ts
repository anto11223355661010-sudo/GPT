import { NextResponse } from 'next/server';

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

  const prompt = `Tu es un assistant pédagogique francophone. Génère un QCM de 5 questions avec 4 options et une seule bonne réponse. Réponds en JSON avec le format suivant: [{"question":string,"options":string[],"answer":number,"explanation":string}]. Contenu: ${content}`;

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
  const questions = Array.isArray(data.questions)
    ? data.questions
    : typeof data.output === 'string'
      ? safeParseQuestions(data.output)
      : [];

  return NextResponse.json({ questions });
}

function safeParseQuestions(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn('Impossible de parser le QCM IA', error);
  }
  return [];
}
