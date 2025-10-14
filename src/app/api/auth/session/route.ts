import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from '@/lib/firebase/admin';

const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const { idToken } = (await request.json()) as { idToken?: string };

    if (!idToken) {
      return NextResponse.json({ error: 'ID token manquant.' }, { status: 400 });
    }

    const app = getAdminApp();

    if (!app) {
      return NextResponse.json(
        { error: "Le serveur d'authentification n'est pas disponible." },
        { status: 503 }
      );
    }

    const auth = getAuth(app);
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: FIVE_DAYS_IN_MS
    });

    const response = NextResponse.json({ status: 'ok' });

    response.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: FIVE_DAYS_IN_MS / 1000,
      path: '/',
      sameSite: 'lax'
    });

    response.cookies.set({
      name: 'skip_auth',
      value: '',
      maxAge: 0,
      path: '/',
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Impossible de créer le cookie de session', error);
    return NextResponse.json(
      { error: "Impossible de créer la session sécurisée." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ status: 'ok' });

    response.cookies.set({
      name: 'session',
      value: '',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    });

    response.cookies.set({
      name: 'skip_auth',
      value: '',
      maxAge: 0,
      path: '/',
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Impossible de supprimer le cookie de session', error);
    return NextResponse.json(
      { error: 'Impossible de supprimer la session sécurisée.' },
      { status: 500 }
    );
  }
}
