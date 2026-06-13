import AnimatedBadge from '@/components/ui/animated-badge'

const services = [
  {
    num: '01',
    title: 'Custom Software Development',
    desc: 'Bespoke enterprise-grade software engineered for your exact requirements.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    bullets: [
      'Enterprise ERP & CRM platforms',
      'API development & integrations',
      'Legacy system modernization',
      'Real-time data pipelines',
    ],
    stack: 'Node.js · Python · React · PostgreSQL · AWS',
    stat: { v: '100%', l: 'Custom code' },
  },
  {
    num: '02',
    title: 'Web & Mobile Applications',
    desc: 'High-performance web and mobile apps built for scale and user experience.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    bullets: [
      'Progressive Web Apps (PWA)',
      'Cross-platform mobile (React Native)',
      'SaaS dashboards & portals',
      'E-commerce platforms',
    ],
    stack: 'Next.js · React Native · TypeScript · Tailwind',
    stat: { v: '95+', l: 'Lighthouse score' },
  },
  {
    num: '03',
    title: 'Business Automation',
    desc: 'Automate repetitive workflows to save time, reduce errors, and cut costs.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    bullets: [
      'Invoice & payment processing',
      'Employee onboarding workflows',
      'Multi-platform data sync',
      'Scheduled reports & exports',
    ],
    stack: 'n8n · Zapier · Python · REST APIs',
    stat: { v: '80%', l: 'Avg. time saved' },
  },
  {
    num: '04',
    title: 'Data Analytics & Dashboards',
    desc: 'Turn raw data into real-time actionable business intelligence.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    bullets: [
      'Real-time KPI dashboards',
      'Sales & conversion analytics',
      'Predictive forecasting',
      'Data warehouse & ETL pipelines',
    ],
    stack: 'Python · SQL · Metabase · BigQuery · Tableau',
    stat: { v: '3×', l: 'Faster decisions' },
  },
]

export default function Services() {
  return (
    <section id="services" className="services-section">
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-grid pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      <style>{`
        .services-section {
          position: relative;
          background: #030303;
          padding: 7rem 1.25rem;
        }

        /* Header */
        .services-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .services-title {
          font-size: 2.25rem;
          font-weight: 500;
          line-height: 1.25;
          text-transform: uppercase;
          margin: 0.75rem 0 1rem;
        }
        .services-title .line-white {
          background: linear-gradient(to bottom, #ffffff, #ffffff 50%, #71717a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .services-title .line-blue {
          background: linear-gradient(to bottom, #60a5fa, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .services-subtitle {
          font-size: 0.875rem;
          color: #71717a;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          max-width: 1400px;
          margin: 0 auto;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        /* Card */
        .svc-card {
          position: relative;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(175deg, rgba(255,255,255,0.06) 0%, rgba(10,10,15,0.92) 40%, rgba(0,0,0,0.97) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            inset 0 2px 0 rgba(255,255,255,0.08),
            inset 0 -2px 0 rgba(0,0,0,0.30),
            inset 0 -20px 80px -20px rgba(255,255,255,0.06),
            0 8px 60px rgba(0,0,0,0.60);
          padding: 2rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.35s ease, background 0.35s ease;
        }
        .svc-card:hover {
          background: linear-gradient(175deg, rgba(255,255,255,0.08) 0%, rgba(12,12,20,0.94) 40%, rgba(0,0,0,0.98) 100%);
          box-shadow:
            inset 0 2px 0 rgba(255,255,255,0.10),
            inset 0 -2px 0 rgba(0,0,0,0.35),
            inset 0 -20px 80px -20px rgba(255,255,255,0.08),
            0 8px 60px rgba(0,0,0,0.70),
            0 0 40px rgba(59,130,246,0.06);
        }

        /* Glow blob */
        .svc-card::before {
          content: '';
          position: absolute;
          top: -60px; left: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 50%;
        }
        .svc-card:hover::before { opacity: 1; }

        /* Top accent line */
        .svc-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40px; height: 2px;
          background: linear-gradient(to right, #3B82F6, transparent);
          opacity: 0;
          transition: opacity 0.35s ease, width 0.35s ease;
        }
        .svc-card:hover::after { opacity: 1; width: 60px; }

        /* Number */
        .svc-num {
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          display: block;
        }

        /* Icon 3D box */
        .svc-icon-wrap {
          width: 56px;
          height: 56px;
          margin-bottom: 1.25rem;
          position: relative;
          perspective: 400px;
        }
        .svc-icon-box {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transform: rotateX(12deg) rotateY(-8deg);
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
          background: linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(15,15,20,0.95) 60%, rgba(0,0,0,1) 100%);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            inset 1px 0 0 rgba(255,255,255,0.05),
            4px 8px 24px rgba(0,0,0,0.7),
            0 0 0 rgba(59,130,246,0);
          color: #383838;
        }
        .svc-card:hover .svc-icon-box {
          transform: rotateX(6deg) rotateY(-4deg) translateY(-2px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            inset 1px 0 0 rgba(255,255,255,0.07),
            6px 12px 32px rgba(0,0,0,0.8),
            0 0 20px rgba(59,130,246,0.15);
          color: rgba(59,130,246,0.8);
          background: linear-gradient(145deg, rgba(59,130,246,0.08) 0%, rgba(15,15,25,0.97) 60%, rgba(0,0,0,1) 100%);
        }
        /* Bottom face (3D edge illusion) */
        .svc-icon-box::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 4px;
          right: 4px;
          height: 5px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
          border-radius: 0 0 8px 8px;
          filter: blur(3px);
          pointer-events: none;
        }

        /* Title + desc */
        .svc-title {
          font-size: 1rem;
          font-weight: 600;
          color: #d4d4d4;
          margin: 0 0 0.5rem;
          line-height: 1.35;
        }
        .svc-desc {
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          color: #525252;
          line-height: 1.7;
          margin: 0 0 1.25rem;
        }

        /* Divider */
        .svc-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 1rem;
        }

        /* Bullets */
        .svc-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .svc-bullet {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: #737373;
          line-height: 1.5;
        }
        .svc-bullet-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(59,130,246,0.5);
          flex-shrink: 0;
          margin-top: 0.45em;
        }

        /* Stack */
        .svc-stack {
          font-family: var(--font-mono), monospace;
          font-size: 0.62rem;
          color: #404040;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        /* Stat */
        .svc-stat-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          padding-top: 0.875rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: auto;
        }
        .svc-stat-val {
          font-family: var(--font-display), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e5e5e5;
        }
        .svc-stat-lbl {
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          color: #525252;
        }
      `}</style>

      {/* Header */}
      <div className="services-header">
        <div className="flex justify-center mb-2">
          <AnimatedBadge text="What We Do" color="#3B82F6" />
        </div>
        <h2 className="services-title">
          <span className="line-white">Services Built for</span>
          <br />
          <span className="line-blue">Real Business Outcomes</span>
        </h2>
        <p className="services-subtitle">
          Custom software, web &amp; mobile applications, and intelligent automation
          engineered to scale your operations and accelerate growth.
        </p>
      </div>

      {/* Cards */}
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.num} className="svc-card">
            <span className="svc-num">( {s.num} )</span>
            <div className="svc-icon-wrap">
              <div className="svc-icon-box">{s.icon}</div>
            </div>
            <h3 className="svc-title">{s.title}</h3>
            <p className="svc-desc">{s.desc}</p>
            <div className="svc-divider" />
            <ul className="svc-bullets">
              {s.bullets.map((b) => (
                <li key={b} className="svc-bullet">
                  <span className="svc-bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="svc-stack">{s.stack}</p>
            <div className="svc-stat-row">
              <span className="svc-stat-val">{s.stat.v}</span>
              <span className="svc-stat-lbl">{s.stat.l}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
