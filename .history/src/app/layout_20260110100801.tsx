import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from '@/src/components/Navigation';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mr Eagle | Web3 Project Manager & Growth Strategist',
  description:
    'Portfolio of Mr Eagle - Project Manager, Marketer and Advisor specializing in Web3, blockchain, and growth strategy. COO at Block AI with experience across multiple Web3 ventures.',
  keywords: [
    'Web3',
    'Project Manager',
    'Growth Strategy',
    'Blockchain',
    'COO',
    'Marketing',
    'Business Development',
  ],
  authors: [{ name: 'Mr Eagle' }],
  openGraph: {
    title: 'Mr Eagle | Web3 Project Manager',
    description:
      'Portfolio showcasing expertise in Web3 project management, growth strategy, and blockchain innovation',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
