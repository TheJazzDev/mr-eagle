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
  title: 'Raymond Henry | Web3 Project Manager & Growth Strategist',
  description:
    'Portfolio of Raymond Henry (Mr Eagle) - Project Manager, Marketer and Advisor specializing in Web3, blockchain, and growth strategy. COO at Block AI with experience across multiple Web3 ventures.',
  keywords: [
    'Web3',
    'Project Manager',
    'Growth Strategy',
    'Blockchain',
    'COO',
    'Marketing',
    'Business Development',
  ],
  authors: [{ name: 'Raymond Henry' }],
  openGraph: {
    title: 'Raymond Henry | Web3 Project Manager',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
