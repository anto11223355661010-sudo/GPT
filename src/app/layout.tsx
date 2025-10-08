import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { Footer } from '@/components/footer';

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
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
