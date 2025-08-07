import { getUserFromCookie } from '@/lib/auth';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = { /* …unchanged… */ };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();     // still okay – server side

  return (
    <html lang="en" className="dark">
      <body>
        <Providers
          user={user}
          initialLoginModalOpen={false}
          dehydratedState={null}
        >
          {children}  {/* ← hooks live here */}
        </Providers>

        {/* -------- external scripts (unchanged) -------- */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-51P1R4XNJ0" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-51P1R4XNJ0');
        `}</Script>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
        <Script src="https://static.testpress.in/static/js/player.js" strategy="lazyOnload" />
        <Script src="https://di.prd.bureau.id/v1.2.4/bureau-device-intelligence.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
