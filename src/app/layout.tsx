// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';

/* ------------------------------------------------------------------
   1 ▸ Global <head> tags
------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    template: '%s | takeuforward',
    default : 'takeuforward - Best Coding Tutorials for Free',
  },
  description:
    'takeuforward is the best place to learn data structures, algorithms, most asked coding interview questions, real interview experiences free of cost.',
  robots: { index: true, follow: true },
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url  : 'https://static.takeuforward.org/content/tuf_v2_circle_black-W3eoL-Q3',
        sizes: 'any',
        type : 'image/x-icon',
      },
    ],
    apple: '/logo192.png',
  },
  openGraph: {
    type      : 'website',
    url       : 'https://takeuforward.org/',
    title     : 'takeuforward - Best Coding Tutorials for Free',
    siteName  : 'takeUforward - ~ Strive for Excellence',
    description:
      'takeuforward is the best place to learn data structures, algorithms, most asked coding interview questions, real interview experiences free of cost.',
    images: [
      'https://takeuforward-content-images.s3.ap-south-1.amazonaws.com/content/wallpaperYoutube-2.webp',
    ],
  },
  twitter: {
    card       : 'summary',
    title      : 'takeuforward - Best Coding Tutorials for Free',
    description:
      'takeuforward is the best place to learn data structures, algorithms, most asked coding interview questions, real interview experiences free of cost.',
    images: [
      'https://takeuforward-content-images.s3.ap-south-1.amazonaws.com/content/wallpaperYoutube-2.webp',
    ],
  },
};

/* ------------------------------------------------------------------
   2 ▸ Root layout
------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <Providers>{children}</Providers>

        {/* ---------- Global scripts ---------- */}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-51P1R4XNJ0"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-51P1R4XNJ0');
        `}</Script>

        {/* Razorpay checkout */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Google One-tap */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="lazyOnload"
        />

        {/* Testpress video player */}
        <Script
          src="https://static.testpress.in/static/js/player.js"
          strategy="lazyOnload"
        />

        {/* Device-intelligence */}
        <Script
          src="https://di.prd.bureau.id/v1.2.4/bureau-device-intelligence.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
