import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, DM_Sans, Geist, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuraBackground from '@/components/AuraBackground'
import CustomCursor from '@/components/CustomCursor'
import ScrollAnimations from '@/components/ScrollAnimations'
import Footer from '@/components/Footer'
import BeamDecor from '@/components/BeamDecor'
import PageTransition from '@/components/PageTransition'
import Preloader from '@/components/Preloader'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-hero',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'TexFix Studio | Websites, Apps & Software',
  description:
    'TexFix Studio builds custom websites, mobile apps, web applications, and software solutions tailored to your business — from landing pages to full SaaS platforms.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'TexFix Studio | Websites, Apps & Software',
    description: 'TexFix Studio builds custom websites, mobile apps, web applications, and software solutions tailored to your business — from landing pages to full SaaS platforms.',
    url: 'https://texfixstudio.com',
    siteName: 'TexFix Studio',
    images: [
      {
        url: 'https://texfixstudio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TexFix Studio — Websites, Apps & Software',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TexFix Studio | Websites, Apps & Software',
    description: 'TexFix Studio builds custom websites, mobile apps, web applications, and software solutions tailored to your business.',
    images: ['https://texfixstudio.com/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("bg-black", "antialiased", spaceGrotesk.variable, jetbrainsMono.variable, dmSans.variable, plusJakarta.variable, "font-sans", geist.variable)}
    >
      <head>
        {/* Hide preloader before React hydrates if already seen — prevents flash */}
        <script dangerouslySetInnerHTML={{ __html: `if(sessionStorage.getItem('preloader-shown')){document.head.insertAdjacentHTML('beforeend','<style>.preloader,.split-overlay,.tags-overlay{display:none!important}</style>')}` }} />
      </head>
      <body className="antialiased font-sans selection:bg-white/20 preloader-active">
        <Preloader />
        <div className="site-container">
          <AuraBackground />
          <BeamDecor />
          <div className="noise" />
          <div className="scanlines" />
          <div className="vignette" />
          <CustomCursor />
          <PageTransition />
          <Navbar />
          {children}
          <Footer />
          <ScrollAnimations />
        </div>
      </body>
    </html>
  )
}
