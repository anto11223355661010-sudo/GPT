'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth, getFirebaseConfigErrorMessage } from '@/lib/firebase/client';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseAuth) {
      console.error(getFirebaseConfigErrorMessage() ?? 'Firebase Auth is not configured.');
      setLoading(false);
      return;
    }

    let active = true;

    const synchronizeSession = async (firebaseUser: User | null) => {
      try {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
          });
        } else {
          await fetch('/api/auth/session', { method: 'DELETE' });
        }
      } catch (error) {
        console.error('Impossible de synchroniser la session serveur', error);
      }
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!active) {
        return;
      }

      setUser(firebaseUser);

      try {
        await synchronizeSession(firebaseUser);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
