import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { siteUrl } from '@/constants';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Montserrat, Poppins, Urbanist } from 'next/font/google';
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

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
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
        url: `${siteUrl}/hero.webp`,
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
    images: [`${siteUrl}/hero.webp`],
    creator: '@akshat_twt',
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
        <link
          rel='manifest'
          href='data:application/manifest+json,{"name":"Bodyworks","short_name":"Bodyworks","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#d97706","background_color":"#ffffff","display":"standalone"}'
        />
        <meta name='theme-color' content='#d97706' media='(prefers-color-scheme: light)' />
        <meta name='theme-color' content='#000000' media='(prefers-color-scheme: dark)' />
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
              description: 'Fitness exercise guide and workout routine library.',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.webp`,
              },
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
      <body
        className={`${poppins.variable} ${urbanist.variable} ${montserrat.variable} font-urbanist antialiased`}
      >
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
