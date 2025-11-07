import type { Metadata } from 'next';
import { Cinzel_Decorative, Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { AppProvider } from '@/app/provider';

const cinzelDecorative = Cinzel_Decorative({
  weight: '400',
  variable: '--font-cinzel-decorative',
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: '400',
  variable: '--font-roboto',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  weight: '400',
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quasar Creates',
  description: 'Unique and custom artisanal handmade bags',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`${cinzelDecorative.variable} ${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
