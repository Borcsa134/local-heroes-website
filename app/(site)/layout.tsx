import Footer from '@/components/footer';
import Header from '@/components/header';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="container flex flex-col mx-auto h-screen px-4 pt-4 lg:px-6 lg:pt-6">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}