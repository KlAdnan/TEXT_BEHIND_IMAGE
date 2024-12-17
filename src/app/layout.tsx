import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { EditorProvider } from '@/context/EditorContext';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Text Behind Image Editor',
  description: 'Create text-behind-image effects easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EditorProvider>
          {children}
        </EditorProvider>
      </body>
    </html>
  );
} 