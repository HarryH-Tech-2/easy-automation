import type { Metadata } from 'next';
import { Lexend, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexend.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
          <NewsletterPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
