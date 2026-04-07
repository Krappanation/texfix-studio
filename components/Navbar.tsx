'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Home, User, Briefcase, Mail } from 'lucide-react'

const NAV_LINKS = [
  { id: 'home',     label: 'Home',    href: '/'         },
  { id: 'about',    label: 'About',   href: '/about'    },
  { id: 'projects', label: 'Work',    href: '/work'     },
  { id: 'contact',  label: 'Contact', href: '/contact'  },
]

const NAV_ICONS = [Home, User, Briefcase, Mail]

const SERVICE_TAGS = ['Web Apps', 'Websites', 'AI & Automation', 'SaaS Platforms', 'E-Commerce']

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isAnimatingRef = useRef(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!isMenuOpen) setIsSticky(window.scrollY >= 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMenuOpen])

  const runOpen = async () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setIsMenuOpen(true)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`

    const { gsap } = await import('gsap')
    const { CustomEase } = await import('gsap/CustomEase')
    gsap.registerPlugin(CustomEase)
    CustomEase.create('hop', '.87,0,.13,1')

    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))

    const overlay        = document.getElementById('menu-overlay')
    const overlayContent = document.getElementById('menu-overlay-content')
    const links          = document.querySelectorAll<HTMLElement>('[data-menu-line]')
    const media          = document.getElementById('menu-media')

    const tl = gsap.timeline({ onComplete: () => { isAnimatingRef.current = false } })

    tl.to(overlay, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      ease: 'hop',
    }, '<')
    .to(overlayContent, { yPercent: 0, duration: 1, ease: 'hop' }, '<')
    .to(media, { opacity: 1, duration: 0.75, ease: 'power2.out' }, '-=0.3')
    .to(links, { y: '0%', duration: 1.2, ease: 'hop', stagger: -0.06 }, '-=0.7')
  }

  const runClose = async () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const { gsap } = await import('gsap')
    const { CustomEase } = await import('gsap/CustomEase')
    gsap.registerPlugin(CustomEase)
    CustomEase.create('hop', '.87,0,.13,1')

    const overlay        = document.getElementById('menu-overlay')
    const overlayContent = document.getElementById('menu-overlay-content')
    const links          = document.querySelectorAll<HTMLElement>('[data-menu-line]')

    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false)
        isAnimatingRef.current = false
        document.documentElement.style.overflow = ''
        document.documentElement.style.paddingRight = ''
        gsap.set(links, { y: '-110%' })
      },
    })

    tl.to(overlay, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1,
      ease: 'hop',
    }, '<')
    .to(overlayContent, { yPercent: -50, duration: 1, ease: 'hop' }, '<')
  }

  const handleMenuToggle = () => {
    if (isMenuOpen) runClose()
    else runOpen()
  }

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('/')) {
      // Don't prevent default — PageTransition interceptor handles navigation
      if (isMenuOpen) runClose()
    } else {
      e.preventDefault()
      if (isMenuOpen) runClose()
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 800)
    }
  }

  const collapsed = isMobile || isSticky

  return (
    <>
      <div className="fixed z-50 w-full pointer-events-none">
        <motion.nav
          ref={navRef}
          initial={false}
          className={cn(
            'pointer-events-auto flex justify-center items-center',
            'backdrop-blur-2xl border',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.7),0_0_0_1px_rgba(59,130,246,0.08)]',
            'bg-gradient-to-b from-white/10 to-white/4 border-white/10',
            'fixed',
          )}
          animate={{
            height:       collapsed ? 64   : 68,
            width:        collapsed ? 64   : 440,
            borderRadius: collapsed ? 9999 : 14,
            top:          collapsed ? 24   : 28,
            left:         collapsed ? 24   : '50%',
            x:            collapsed ? 0    : '-50%',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
        >
          <AnimatePresence>
            {!collapsed && NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 28 }}
                className="px-4 py-2 text-[12px] font-sans uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5"
              >
                {React.createElement(NAV_ICONS[i], { className: 'w-3 h-3 opacity-60' })}
                {link.label}
              </motion.a>
            ))}
          </AnimatePresence>

          <motion.button
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            className={cn(
              'absolute w-[52px] h-[52px] rounded-full outline-none border cursor-pointer',
              'bg-gradient-to-b from-white/12 to-white/4 border-white/10',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(59,130,246,0.10)]',
              'hover:from-white/18 hover:to-white/8 hover:border-white/15 transition-all duration-200 backdrop-blur-2xl',
              collapsed ? 'flex' : 'flex md:hidden',
              'flex-col items-center justify-center gap-[5px]',
            )}
          >
            <motion.span
              className="block w-4 h-[1.5px] bg-zinc-300 origin-center"
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.4, ease: [0.87, 0, 0.13, 1] }}
            />
            <motion.span
              className="block w-4 h-[1.5px] bg-zinc-300"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-4 h-[1.5px] bg-zinc-300 origin-center"
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.4, ease: [0.87, 0, 0.13, 1] }}
            />
          </motion.button>
        </motion.nav>
      </div>

      {isMenuOpen && (
        <div
          id="menu-overlay"
          className="fixed inset-0 z-40 overflow-hidden"
          style={{
            backgroundColor: '#0d0d0d',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            willChange: 'clip-path',
          }}
        >
          <div
            id="menu-overlay-content"
            className="flex w-full h-full"
            style={{ transform: 'translateY(-50%)', willChange: 'transform' }}
          >
            {/* Left visual panel */}
            <div
              id="menu-media"
              className="hidden lg:flex flex-[2] relative overflow-hidden"
              style={{ opacity: 0, willChange: 'opacity' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/menu-media.jpg"
                alt=""
                className="w-full h-full object-cover"
                style={{ opacity: 0.25 }}
              />
            </div>

            {/* Right content panel */}
            <div className="flex-[3] flex flex-col justify-between h-full px-10 lg:px-16 py-10 border-l border-zinc-800/40">

              <div />

              <div className="flex flex-col gap-1 mt-8">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.id} className="overflow-hidden leading-none py-1">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      data-menu-line={i}
                      className="block font-display font-medium uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 hover:to-zinc-300 transition-all duration-300"
                      style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        transform: 'translateY(-110%)',
                        willChange: 'transform',
                      }}
                    >
                      {link.label}
                    </a>
                  </div>
                ))}

                <div className="overflow-hidden mt-6">
                  <div
                    data-menu-line="tags"
                    className="flex flex-wrap gap-2"
                    style={{ transform: 'translateY(-110%)', willChange: 'transform' }}
                  >
                    {SERVICE_TAGS.map((tag) => (
                      <span key={tag} className="text-xs text-zinc-500 font-sans border border-zinc-800 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden border-t border-zinc-800/50 pt-6">
                <div
                  data-menu-line="footer"
                  className="flex flex-col sm:flex-row gap-8"
                  style={{ transform: 'translateY(-110%)', willChange: 'transform' }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-sans mb-1">Location</p>
                    <p className="text-sm text-zinc-400 font-sans">Guelma, Algeria</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-sans mb-1">Email</p>
                    <p className="text-sm text-zinc-400 font-sans">texfix.info@gmail.com</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
