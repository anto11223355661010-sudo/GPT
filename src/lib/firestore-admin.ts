import type { Course } from '@/types/course';
import type { Summary } from '@/types/summary';
import type { Quiz } from '@/types/quiz';
import type { LeaderboardEntry } from '@/types/user';
import { getAdminFirestore } from './firebase/admin';

const firestore = getAdminFirestore();

const normalizeTimestamp = (value: unknown) => {
  if (!value) return Date.now();
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && value !== null && 'toMillis' in value) {
    // @ts-expect-error Firebase Timestamp
    return value.toMillis();
  }
  return Date.now();
};

export async function listCoursesServer(userId: string): Promise<Course[]> {
  if (!firestore) {
    return [];
  }

  const snapshot = await firestore
    .collection('courses')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Course, 'id'>;
    return {
      id: doc.id,
      ...data,
      createdAt: normalizeTimestamp(data.createdAt),
      updatedAt: normalizeTimestamp(data.updatedAt)
    };
  });
}

export async function listSummariesServer(userId: string): Promise<Summary[]> {
  if (!firestore) {
    return [];
  }

  const snapshot = await firestore
    .collection('summaries')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Summary, 'id'>;
    return {
      id: doc.id,
      ...data,
      createdAt: normalizeTimestamp(data.createdAt)
    };
  });
}

export async function listQuizzesServer(userId: string): Promise<Quiz[]> {
  if (!firestore) {
    return [];
  }

  const snapshot = await firestore
    .collection('quizzes')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Quiz, 'id'>;
    return {
      id: doc.id,
      ...data,
      createdAt: normalizeTimestamp(data.createdAt)
    };
  });
}

export async function listLeaderboardEntriesServer(week: string): Promise<LeaderboardEntry[]> {
  if (!firestore) {
    return [];
  }

  const snapshot = await firestore.collection('leaderboard').doc(week).collection('entries').get();

  return snapshot.docs
    .map((doc) => ({
      ...(doc.data() as LeaderboardEntry)
    }))
    .sort((a, b) => b.points - a.points);
}
