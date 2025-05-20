// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import SupabaseProvider from '@/components/SupabaseProvider';

export const metadata = {
  title: 'Petwear',
  description: 'Premium clothing and accessories for pets',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">
        <header className="p-3 bg-yellow-400 shadow">
          <Navbar />
        </header>

        <main className="p-6">
          <SupabaseProvider>{children}</SupabaseProvider>
        </main>

        <footer className="p-4 mt-10 text-center text-gray-500">
          © 2025 Petwear. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
