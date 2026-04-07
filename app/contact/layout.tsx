import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | TexFix Studio',
  description: 'Have a project in mind? Get in touch with TexFix Studio. We respond within 24 hours and would love to hear about what you are building.',
  openGraph: {
    title: 'Contact Us | TexFix Studio',
    description: 'Have a project in mind? Get in touch with TexFix Studio. We respond within 24 hours and would love to hear about what you are building.',
    url: 'https://texfixstudio.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
