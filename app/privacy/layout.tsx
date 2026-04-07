import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | TexFix Studio',
  description: 'Read the TexFix Studio privacy policy to understand how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | TexFix Studio',
    description: 'Read the TexFix Studio privacy policy to understand how we collect, use, and protect your personal information.',
    url: 'https://texfixstudio.com/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
