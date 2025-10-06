export interface Course {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  sourceType: 'text' | 'pdf';
  storagePath?: string;
}
