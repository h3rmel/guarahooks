import type { Metadata, Viewport } from 'next';

import { geistMono, inter } from '@/assets/fonts';

import '@/assets/globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { Banner } from '@/components/layout/banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { PostHogProvider } from '@/components/posthog-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'h3rmel', url: siteConfig.authorUrl }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  metadataBase: new URL(siteConfig.url),
  creator: 'h3rmel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'relative size-full min-h-dvh font-sans antialiased scroll-smooth flex flex-col',
          inter.variable,
          geistMono.variable,
        )}
      >
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <TooltipProvider delayDuration={200}>
              <Banner />
              <Header />
              <main className={cn('grow flex flex-col', 'size-full')}>
                {children}
              </main>
              <Footer />
              <Toaster richColors position="bottom-center" duration={3000} />
              <SpeedInsights />
            </TooltipProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
