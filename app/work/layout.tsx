import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | TexFix Studio',
  description: 'A curated selection of web apps, platforms, and software products designed and built by TexFix Studio for startups, scale-ups, and enterprise clients.',
  openGraph: {
    title: 'Our Work | TexFix Studio',
    description: 'A curated selection of web apps, platforms, and software products designed and built by TexFix Studio for startups, scale-ups, and enterprise clients.',
    url: 'https://texfixstudio.com/work',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
