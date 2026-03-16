import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppWidget from '@/components/sections/WhatsAppWidget';
import siteData from '@/content/site.json';
import { organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from '@/lib/seo';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default: `${siteData.name} | ${siteData.shortDescription}`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: [
    'desenvolvimento de software',
    'software sob medida',
    'inteligência artificial',
    'modernização de sistemas',
    'consultoria de software',
    'software house São Paulo',
    'desenvolvimento web',
    'Node.js',
    'React',
    'Next.js',
    'TypeScript',
    'LangChain',
    'agentes IA',
    'empresa de software',
    'programação sob encomenda',
  ],
  authors: [{ name: siteData.founder.name, url: siteData.founder.linkedin }],
  creator: siteData.name,
  publisher: siteData.name,
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteData.url,
    siteName: siteData.name,
    title: `${siteData.name} | ${siteData.shortDescription}`,
    description: siteData.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteData.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteData.name} | ${siteData.shortDescription}`,
    description: siteData.description,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteData.url,
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_ID',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
