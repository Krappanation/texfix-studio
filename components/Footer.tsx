'use client'

import { Icon } from '@iconify/react'
import { Dock, DockIcon, DockSeparator } from '@/components/ui/dock'
import { usePathname, useRouter } from 'next/navigation'

const quickLinks = [
  { label: 'Home',         href: '/#home'         },
  { label: 'About',        href: '/#about'        },
  { label: 'Services',     href: '/#services'     },
  { label: 'Projects',     href: '/#projects'     },
  { label: 'Process',      href: '/#process'      },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact',      href: '/#contact'      },
]

const pages = [
  { label: 'Home',           href: '/'             },
  { label: 'About',          href: '/about'        },
  { label: 'Work',           href: '/work'         },
  { label: 'Contact',        href: '/contact'      },
  { label: 'Privacy Policy', href: '/privacy'      },
]

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSectionLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes('#')) return
    e.preventDefault()
    const hash = href.split('#')[1]

    if (pathname === '/') {
      // Already on home — just smooth scroll
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Navigate to home, then scroll after the page loads
      sessionStorage.setItem('scrollTo', hash)
      router.push('/')
    }
  }

  return (
    <footer className="relative z-10 bg-black overflow-hidden border-t border-white/5">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-10 flex flex-col md:flex-row md:justify-between gap-12 relative z-10">

        {/* Left — brand */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-white">TexFix</p>
            <p className="text-zinc-400 text-sm mt-1">We Build What Moves Businesses.</p>
          </div>
          <Dock magnification={52} distance={100}>
            <DockIcon href="https://www.facebook.com/profile.php?id=61585389652103&locale=fr_FR" target="_blank" rel="noopener noreferrer" title="Facebook">
              <Icon icon="lucide:facebook" className="w-5 h-5" />
            </DockIcon>
            <DockSeparator />
            <DockIcon href="https://www.instagram.com/texfix.agency/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <Icon icon="lucide:instagram" className="w-5 h-5" />
            </DockIcon>
            <DockIcon href="https://www.tiktok.com/@texfixstdio?lang=fr" target="_blank" rel="noopener noreferrer" title="TikTok">
              <Icon icon="ri:tiktok-fill" className="w-5 h-5" />
            </DockIcon>
          </Dock>
        </div>

        {/* Right — link columns */}
        <div className="flex gap-8 sm:gap-16 md:gap-24 lg:gap-60">
        {/* Middle — Quick Links */}
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-500 font-medium mb-5">Quick Links</p>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((l) => (
              <li key={l.label} className={(l.label === 'Process' || l.label === 'Testimonials') ? 'hidden sm:block' : ''}>
                <a
                  href={l.href}
                  onClick={(e) => handleSectionLink(e, l.href)}
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Pages */}
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-500 font-medium mb-5">Pages</p>
          <ul className="flex flex-col gap-3">
            {pages.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

      {/* Large background wordmark */}
      <div className="relative z-0 overflow-hidden select-none pointer-events-none" aria-hidden>
        <p
          className="text-center font-black uppercase leading-none text-white"
          style={{
            fontSize: 'clamp(5rem, 28vw, 32rem)',
            maskImage: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 90%)',
          }}
        >
          TEXFIX
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-zinc-500 text-xs">Made by TexFix Studio</p>
        <p className="text-zinc-500 text-xs">TexFix © 2026 — All rights reserved</p>
      </div>
    </footer>
  )
}

