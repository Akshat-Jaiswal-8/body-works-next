import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { siteUrl } from '@/constants';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Poppins, Urbanist } from 'next/font/google';
import React from 'react';
import './globals.css';
import Providers from './providor';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'BodyWorks - Fitness Exercise Guide',
    template: '%s | BodyWorks',
  },
  description:
    'Discover exercises, workout routines, and fitness guidance filtered by body parts, muscles, and equipment.',
  keywords: [
    'fitness exercise guide',
    'workout routines',
    'gym exercises',
    'home workouts',
    'strength training',
    'body part workouts',
    'target muscle exercises',
    'equipment workouts',
  ],
  authors: [{ name: 'Akshat Jaiswal' }],
  creator: 'Akshat Jaiswal',
  publisher: 'BodyWorks',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'BodyWorks - Fitness Exercise Guide',
    description: 'Discover exercises, workout routines, and fitness guidance.',
    siteName: 'BodyWorks',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'BodyWorks - Fitness Exercise Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BodyWorks - Fitness Exercise Guide',
    description: 'Discover exercises, workout routines, and fitness guidance.',
    images: ['/hero.webp'],
    creator: '@bodyworks',
  },
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
  category: 'fitness',
  classification: 'Health & Fitness',
  applicationName: 'BodyWorks',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preload' href='/hero.webp' as='image' type='image/webp' />
        <link rel='preload' href='/img.webp' as='image' type='image/webp' />
        <link rel='preconnect' href='https://api.bodyworks.akshatjaiswal.me' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon-16x16.png' type='image/png' sizes='16x16' />
        <link rel='icon' href='/favicon-32x32.png' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='theme-color' content='#d97706' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'BodyWorks',
              description: 'Discover exercises, workout routines, and fitness guidance.',
              url: siteUrl,
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: {
                '@type': 'Person',
                name: 'Akshat Jaiswal',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://bodyworks.akshatjaiswal.me/exercises?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BodyWorks',
              url: siteUrl,
              logo: `${siteUrl}/logo.webp`,
              description: 'Fitness exercise guide and workout routine library.',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'akshatjaiswal.official@gmail.com',
              },
              founder: {
                '@type': 'Person',
                name: 'Akshat Jaiswal',
              },
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${urbanist.variable} font-urbanist antialiased`}>
        <Providers>
          <Navbar />
          <div className='mt-[var(--navbar-height)]'>{children}</div>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
