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
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
