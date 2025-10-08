import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'UP Mind',
  description: 'Réviser, apprendre et progresser grâce à l’IA, sans distraction.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-background">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
