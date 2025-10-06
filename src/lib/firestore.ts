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
import { firestore, getFirebaseConfigErrorMessage } from './firebase/client';
import type { Course } from '@/types/course';
import type { Summary } from '@/types/summary';
import type { Quiz } from '@/types/quiz';
import type { LeaderboardEntry } from '@/types/user';

const toMillis = (timestamp: Timestamp | null | undefined) =>
  timestamp ? timestamp.toMillis() : Date.now();

const getFirestoreOrThrow = () => {
  if (!firestore) {
    throw new Error(
      getFirebaseConfigErrorMessage() ??
        'Firestore is not configured. Please ensure Firebase environment variables are set.'
    );
  }

  return firestore;
};

export async function createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = getFirestoreOrThrow();
  const ref = await addDoc(collection(db, 'courses'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return ref.id;
}

export async function updateCourse(courseId: string, data: Partial<Course>) {
  const db = getFirestoreOrThrow();
  await updateDoc(doc(db, 'courses', courseId), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function listCourses(userId: string): Promise<Course[]> {
  const db = getFirestoreOrThrow();
  const snapshot = await getDocs(
    query(collection(db, 'courses'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Course, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt')),
    updatedAt: toMillis(docSnap.get('updatedAt'))
  }));
}

export async function getCourse(courseId: string): Promise<Course | null> {
  const db = getFirestoreOrThrow();
  const docSnap = await getDoc(doc(db, 'courses', courseId));

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
  const db = getFirestoreOrThrow();
  const ref = await addDoc(collection(db, 'summaries'), {
    ...data,
    createdAt: serverTimestamp()
  });

  return ref.id;
}

export async function listSummaries(userId: string): Promise<Summary[]> {
  const db = getFirestoreOrThrow();
  const snapshot = await getDocs(
    query(collection(db, 'summaries'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Summary, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt'))
  }));
}

export async function createQuiz(data: Omit<Quiz, 'id' | 'createdAt'>) {
  const db = getFirestoreOrThrow();
  const ref = await addDoc(collection(db, 'quizzes'), {
    ...data,
    createdAt: serverTimestamp()
  });

  return ref.id;
}

export async function listQuizzes(userId: string): Promise<Quiz[]> {
  const db = getFirestoreOrThrow();
  const snapshot = await getDocs(
    query(collection(db, 'quizzes'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Quiz, 'id'>),
    createdAt: toMillis(docSnap.get('createdAt'))
  }));
}

export async function listLeaderboardEntries(week: string): Promise<LeaderboardEntry[]> {
  const db = getFirestoreOrThrow();
  const snapshot = await getDocs(collection(db, 'leaderboard', week, 'entries'));

  return snapshot.docs
    .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as LeaderboardEntry) }))
    .sort((a, b) => b.points - a.points);
}
