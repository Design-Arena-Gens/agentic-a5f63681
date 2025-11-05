import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://agentic-a5f63681.vercel.app'),
  title: {
    default: 'Minimalist Full?Stack Portfolio',
    template: '%s ? Minimalist Full?Stack Portfolio',
  },
  description: 'Modern, minimalist full?stack developer portfolio with subtle animations and accessible design.',
  openGraph: {
    title: 'Minimalist Full?Stack Portfolio',
    description: 'Modern, minimalist full?stack developer portfolio with subtle animations and accessible design.',
    url: 'https://agentic-a5f63681.vercel.app',
    siteName: 'Minimalist Portfolio',
    images: [
      { url: '/og.png', width: 1200, height: 630 }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minimalist Full?Stack Portfolio',
    description: 'Modern, minimalist full?stack developer portfolio with subtle animations and accessible design.',
    images: ['/og.png']
  },
  robots: {
    index: true, follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-text`}>
        {children}
      </body>
    </html>
  );
}
