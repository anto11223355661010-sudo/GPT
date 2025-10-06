import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { firestore } from './firebase/client';
import type { Course } from '@/types/course';
import type { Summary } from '@/types/summary';
import type { Quiz } from '@/types/quiz';
import type { LeaderboardEntry } from '@/types/user';

const toMillis = (timestamp: Timestamp | null | undefined) =>
  timestamp ? timestamp.toMillis() : Date.now();

export async function createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) {
  const ref = await addDoc(collection(firestore, 'courses'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return ref.id;
}

export async function updateCourse(courseId: string, data: Partial<Course>) {
  await updateDoc(doc(firestore, 'courses', courseId), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function listCourses(userId: string): Promise<Course[]> {
  const snapshot = await getDocs(
    query(collection(firestore, 'courses'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Course, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt')),
    updatedAt: toMillis(docSnap.get('updatedAt'))
  }));
}

export async function getCourse(courseId: string): Promise<Course | null> {
  const docSnap = await getDoc(doc(firestore, 'courses', courseId));

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...(data as Omit<Course, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt')),
    updatedAt: toMillis(docSnap.get('updatedAt'))
  };
}

export async function createSummary(data: Omit<Summary, 'id' | 'createdAt'>) {
  const ref = await addDoc(collection(firestore, 'summaries'), {
    ...data,
    createdAt: serverTimestamp()
  });

  return ref.id;
}

export async function listSummaries(userId: string): Promise<Summary[]> {
  const snapshot = await getDocs(
    query(collection(firestore, 'summaries'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Summary, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt'))
  }));
}

export async function createQuiz(data: Omit<Quiz, 'id' | 'createdAt'>) {
  const ref = await addDoc(collection(firestore, 'quizzes'), {
    ...data,
    createdAt: serverTimestamp()
  });

  return ref.id;
}

export async function listQuizzes(userId: string): Promise<Quiz[]> {
  const snapshot = await getDocs(
    query(collection(firestore, 'quizzes'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Quiz, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt'))
  }));
}

export async function listLeaderboardEntries(week: string): Promise<LeaderboardEntry[]> {
  const snapshot = await getDocs(collection(firestore, 'leaderboard', week, 'entries'));

  return snapshot.docs
    .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as LeaderboardEntry) }))
    .sort((a, b) => b.points - a.points);
}
