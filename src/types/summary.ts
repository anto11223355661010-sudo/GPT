export interface SummaryVariant {
  label: 'concis' | 'moyen' | 'developpe';
  content: string;
}

export interface Summary {
  id: string;
  courseId: string;
  userId: string;
  createdAt: number;
  variants: SummaryVariant[];
}
