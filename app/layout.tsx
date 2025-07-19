import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Open_Sans, Poppins, Roboto, Rubik, Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "./providor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: {
    default:
      "BodyWorks - Your Ultimate Fitness Exercise Guide | 1300+ Exercises",
    template: "%s | BodyWorks - Fitness Exercise Guide",
  },
  description:
    "Discover 1300+ exercises, 600+ workout routines, and comprehensive fitness guidance. Filter by body parts, target muscles, and equipment. Your complete fitness companion for all levels.",
  keywords: [
    "fitness exercises",
    "workout routines",
    "gym exercises",
    "bodybuilding",
    "strength training",
    "muscle building",
    "exercise guide",
    "fitness app",
    "workout plans",
    "target muscles",
    "body parts",
    "equipment workouts",
    "beginner workouts",
    "advanced training",
    "exercise database",
    "fitness tracker",
    "free fitness app",
    "exercise instructions",
    "workout planner",
    "fitness companion",
    "muscle targeting",
    "gym workout",
    "home workout",
    "fitness journey",
    "exercise library",
  ],
  authors: [{ name: "Akshat Jaiswal" }],
  creator: "Akshat Jaiswal",
  publisher: "BodyWorks",
  metadataBase: new URL("https://body-works-akshat.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://body-works-akshat.vercel.app",
    title: "BodyWorks - Your Ultimate Fitness Exercise Guide",
    description:
      "Discover 1300+ exercises, 600+ workout routines, and comprehensive fitness guidance. Filter by body parts, target muscles, and equipment.",
    siteName: "BodyWorks",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "BodyWorks - Fitness Exercise Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BodyWorks - Your Ultimate Fitness Exercise Guide",
    description:
      "Discover 1300+ exercises, 600+ workout routines, and comprehensive fitness guidance.",
    images: ["/hero.webp"],
    creator: "@bodyworks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "fitness",
  classification: "Health & Fitness",
  applicationName: "BodyWorks",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  verification: {
    // Add your verification tokens here when you get them
    // google: "your-google-verification-token",
    // bing: "your-bing-verification-token",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#d97706" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "BodyWorks",
              description:
                "Discover 1300+ exercises, 600+ workout routines, and comprehensive fitness guidance. Filter by body parts, target muscles, and equipment.",
              url: "https://body-works-akshat.vercel.app",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Person",
                name: "Akshat Jaiswal",
                email: "akshatjaiswal.official@gmail.com",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
              featureList: [
                "1300+ Exercise Database",
                "600+ Workout Routines",
                "30+ Equipment Filters",
                "20+ Target Muscle Groups",
                "10+ Body Part Categories",
                "Beginner to Advanced Levels",
                "Free Access",
                "Mobile Responsive",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://body-works-akshat.vercel.app/exercises?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BodyWorks",
              url: "https://body-works-akshat.vercel.app",
              logo: "https://body-works-akshat.vercel.app/logo.webp",
              description:
                "Your Ultimate Fitness Exercise Guide with 1300+ exercises and 600+ workout routines",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "akshatjaiswal.official@gmail.com",
              },
              founder: {
                "@type": "Person",
                name: "Akshat Jaiswal",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${roboto.variable} ${rubik.variable} ${openSans.variable} ${urbanist.variable} font-urbanist antialiased`}
      >
        <Providers>
          <Navbar />
          <div className="mt-[calc(var(--navbar-height))]">{children}</div>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
