import type { QuizQuestion } from '@/types/quiz';
import type { SummaryVariant } from '@/types/summary';

export interface GenerateSummaryPayload {
  content: string;
}

export interface GenerateQuizPayload {
  content: string;
}

export interface GenerateSummaryResponse {
  variants: SummaryVariant[];
}

export interface GenerateQuizResponse {
  questions: QuizQuestion[];
}

export async function requestSummary(payload: GenerateSummaryPayload): Promise<GenerateSummaryResponse> {
  const response = await fetch('/api/ai/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Impossible de générer le résumé.');
  }

  return response.json();
}

export async function requestQuiz(payload: GenerateQuizPayload): Promise<GenerateQuizResponse> {
  const response = await fetch('/api/ai/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Impossible de générer le QCM.');
  }

  return response.json();
}
