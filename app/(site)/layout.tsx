import { Inter } from 'next/font/google';

import Footer from '@/components/footer';
import Header from '@/components/header';

import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Local Heroes Szerepjátszó Kör',
  description: 'A Local Heroes Szerepjátszó Kör hivatalos weboldala.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="container flex flex-col mx-auto min-h-screen px-2 pt-4 lg:px-4 lg:pt-4 lg:w-[990px]">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
