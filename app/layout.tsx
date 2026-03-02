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
  keywords: ['games', 'play', 'embed', 'youtube-style', 'neon', 'gaming platform', 'web games'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neon-play.vercel.app/',
    title: 'Neon Play',
    description: 'A YouTube-style game embedding platform with a neon lime dark modern design.',
    siteName: 'Neon Play',
    images: [
      {
        url: '/og-image-main.jpeg',
        width: 1200,
        height: 630,
        alt: 'Neon Play - Game Embedding Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neon Play',
    description: 'A YouTube-style game embedding platform with a neon lime dark modern design.',
    images: ['/og-image-main.jpeg'],
    creator: '@neonplay',
  },
  metadataBase: new URL('https://neon-play.vercel.app/'),
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
