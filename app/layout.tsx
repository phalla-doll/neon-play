import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Neon Play',
  description: 'A YouTube-style game embedding platform with a neon lime dark modern design.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-neutral-950 text-neutral-200 font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
