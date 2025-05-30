import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import { auth } from '@/auth';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Local Heroes Website',
    default: 'Local Heroes Website',
  },
  description: 'A Local Heroes Szerepjátszó Kör hivatalos weboldala.',
  openGraph: {
    title: {
      template: '%s | Local Heroes Website',
      default: 'Local Heroes Website',
    },
    description: 'A Local Heroes Szerepjátszó Kör hivatalos weboldala.',
    url: 'https://localheroes.quest',
    siteName: 'Local Heroes Website',
    images: [
      {
        url: 'https://localheroes.quest/thumbnail.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'hu_HU',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html
      lang="en"
      className="text-foreground bg-background dark"
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <Header session={session} />
          <div className="container flex flex-col mx-auto min-h-screen px-4 pt-4 lg:w-[990px]">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
