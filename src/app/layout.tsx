import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shelf',
  description: 'A simple app to manage your bento shelf of favorites.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
