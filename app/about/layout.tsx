import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | TexFix Studio',
  description: 'Learn about TexFix Studio — a software development agency building custom web apps, SaaS platforms, and enterprise solutions for ambitious businesses worldwide.',
  openGraph: {
    title: 'About Us | TexFix Studio',
    description: 'Learn about TexFix Studio — a software development agency building custom web apps, SaaS platforms, and enterprise solutions for ambitious businesses worldwide.',
    url: 'https://texfixstudio.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
