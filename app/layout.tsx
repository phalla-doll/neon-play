import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import DeferredGoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Neon Play | Online Game',
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neongame.online/',
    title: 'Neon Play',
    description: 'A YouTube-style game embedding platform with a neon lime dark modern design.',
    siteName: 'Neon Play | Online Game',
    images: [
      {
        url: '/neon-play-og-image.png',
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
    images: ['/neon-play-og-image.png'],
    creator: '@neonplay',
  },
  metadataBase: new URL('https://neongame.online/'),
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
    <html lang="en" className={`${inter.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="bg-neutral-950 text-neutral-200 font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
      <DeferredGoogleAnalytics gaId="G-J2WS9KFG9R" />
    </html>
  );
}
