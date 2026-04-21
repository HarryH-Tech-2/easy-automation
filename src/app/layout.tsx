import type { Metadata, Viewport } from 'next';
import { Lexend, Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { NewsletterPopup } from '@/components/email/NewsletterPopup';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/constants';
import './globals.css';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Easy Automation — Master Marketing & Finance Automation',
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Easy Automation — Marketing & Finance Automation Guides',
    description: siteConfig.description,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Easy Automation — practical guides to automate your business' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Automation — Marketing & Finance Automation Guides',
    description: siteConfig.description,
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Populated from env vars so no-op locally. Set GOOGLE_SITE_VERIFICATION /
  // BING_SITE_VERIFICATION / YANDEX_SITE_VERIFICATION in the deployment env
  // to have Next.js emit the corresponding <meta> tags.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

// Browser UI tinting — matches brand primary. Next 15+ requires theme-color
// to live in the Viewport export, not Metadata.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF6210' },
    { media: '(prefers-color-scheme: dark)', color: '#FF6210' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Feed discovery for RSS readers, Google Publisher Center, and AI
            agents. Next.js metadata `alternates.types` is unreliable in
            Next 16 for the root layout, so emit it manually. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Easy Automation — latest articles"
          href="/feed.xml"
        />
      </head>
      <body className={`${lexend.variable} ${inter.variable} antialiased`}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
        <NewsletterPopup />
      </body>
    </html>
  );
}
