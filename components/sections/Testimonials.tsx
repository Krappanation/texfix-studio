'use client'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import AnimatedBadge from '@/components/ui/animated-badge'
import { useReveal, wordStyle } from '@/hooks/use-reveal'

const testimonials = [
  {
    name: 'Karim Benali',
    handle: 'Fondateur',
    avatar: 'KB',
    body: 'TexFix nous a construit une boutique en ligne sur mesure qui a complètement changé notre façon de vendre. Simple, rapide, et exactement ce dont on avait besoin.',
    metric: { icon: 'lucide:shopping-bag', label: 'E-commerce' },
  },
  {
    name: 'James Whitfield',
    handle: 'Founder',
    avatar: 'JW',
    body: "I came with a rough idea and they turned it into a full web platform. The attention to detail and the quality of the code genuinely surprised me. Couldn't ask for better.",
    metric: { icon: 'lucide:globe', label: 'Web Platform' },
  },
  {
    name: 'Yasmine Hadj',
    handle: 'Directrice',
    avatar: 'YH',
    body: "Notre plateforme de gestion a été livrée dans les délais et fonctionne parfaitement. L'équipe a vraiment pris le temps de comprendre notre activité avant de commencer.",
    metric: { icon: 'lucide:layout-dashboard', label: 'Dashboard' },
  },
  {
    name: 'Lena Hoffmann',
    handle: 'Co-founder',
    avatar: 'LH',
    body: "TexFix built our client portal from scratch and it works flawlessly. Our users love how intuitive it feels, and we've had zero issues since launch. Impressive work.",
    metric: { icon: 'lucide:panel-left', label: 'Client Portal' },
  },
  {
    name: 'Sofiane Meziane',
    handle: 'CEO',
    avatar: 'SM',
    body: "L'application web qu'ils ont développée pour notre logistique a simplifié des processus qu'on gérait manuellement depuis des années. Un vrai gain au quotidien.",
    metric: { icon: 'lucide:app-window', label: 'Web App' },
  },
  {
    name: 'Omar Khalil',
    handle: 'Founder',
    avatar: 'OK',
    body: "They delivered a polished e-commerce site that represents our brand perfectly. The whole process was smooth, communication was great, and the result speaks for itself.",
    metric: { icon: 'lucide:store', label: 'E-commerce' },
  },
]

function TestimonialCard({
  name, handle, avatar, body, metric,
}: (typeof testimonials)[number]) {
  return (
    <figure
      className={cn(
        'group relative flex-shrink-0 w-96 cursor-default overflow-hidden rounded-xl p-7 mx-3 min-h-[260px] flex flex-col justify-between',
        'transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
        'transition-all duration-300 hover:[border:1px_solid_rgba(59,130,246,0.35)]',
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-sm font-semibold text-blue-400 font-mono flex-shrink-0">
          {avatar}
        </div>
        <div className="min-w-0">
          <figcaption className="text-base font-medium text-white leading-tight">{name}</figcaption>
          <p className="text-xs text-zinc-500 font-mono truncate">{handle}</p>
        </div>
        <div className="ml-auto flex-shrink-0 flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Icon icon={metric.icon} className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-[9px] text-zinc-600 font-mono tracking-wide uppercase">{metric.label}</div>
        </div>
      </div>
      <div className="h-px bg-white/5 mb-3" />
      <blockquote className="text-sm text-zinc-400 leading-relaxed">
        &ldquo;{body}&rdquo;
      </blockquote>
    </figure>
  )
}

/** Seamless marquee: duplicates items once, animates the track by -50% */
function SeamlessMarquee({
  items,
  reverse = false,
  duration = '20s',
}: {
  items: (typeof testimonials)
  reverse?: boolean
  duration?: string
}) {
  const keyframe = reverse ? 'marquee-rtl' : 'marquee-ltr'
  return (
    <div className="overflow-hidden w-full">
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        className="flex w-max"
        style={{
          animation: `${keyframe} ${duration} linear infinite`,
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        {/* Original set */}
        {items.map((t, i) => <TestimonialCard key={`a-${i}`} {...t} />)}
        {/* Exact duplicate — makes the -50% loop seamless */}
        {items.map((t, i) => <TestimonialCard key={`b-${i}`} {...t} />)}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { ref: revealRef, visible } = useReveal(0.2)
  return (
    <section id="testimonials" className="py-32 relative bg-black/80">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-14">
          <div className="flex justify-center mb-2">
            <AnimatedBadge text="Client Results" color="#3B82F6" />
          </div>
          {/* @ts-expect-error ref typing */}
          <h2 ref={revealRef} className="font-display text-4xl font-medium text-center uppercase">
            <span className="block">
              {['Real', 'Results,', 'Real'].map((w, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.2em' }}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500" style={wordStyle(visible, i * 0.12)}>{w}</span>
                </span>
              ))}
            </span>
            <span className="block">
              {['Clients'].map((w, i) => (
                <span key={w} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.2em' }}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700" style={wordStyle(visible, 0.36 + i * 0.12)}>{w}</span>
                </span>
              ))}
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm max-w-xl mx-auto text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: visible ? 'opacity 0.8s ease 0.6s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s' : 'none' }}>
            Businesses across industries trust TexFix to deliver software that performs. Here&apos;s what our clients say after working with us.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <SeamlessMarquee items={testimonials} duration="22s" />
          <SeamlessMarquee items={testimonials} reverse duration="18s" />
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black to-transparent" />
      </div>
    </section>
  )
}



