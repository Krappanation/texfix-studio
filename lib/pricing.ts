// ─── Base prices per project type (in DZD) ──────────────────────────────────
export const BASE_PRICES: Record<string, Record<string, number>> = {
  website: {
    'Portfolio Site':  25000,
    'Landing Page':    20000,
    'Corporate Site':  45000,
    'Blog / Magazine': 35000,
  },
  webapp: {
    'Internal Tool / Dashboard': 50000,
    'Booking Platform':          60000,
    'Marketplace':               90000,
    'Custom Business System':    70000,
  },
  mobile: {
    'Simple Info App':       60000,
    'Social / Community':   100000,
    'On-demand / Booking':   90000,
    'Business Management':   80000,
  },
  ai: {
    'Chatbot / Assistant':     70000,
    'Workflow Automation':     80000,
    'Custom AI Integration':  100000,
    'Data Pipeline':           90000,
  },
  saas: {
    'Simple SaaS MVP':     150000,
    'Full SaaS Platform':  250000,
  },
  ecommerce: {
    'Simple Store':               40000,
    'Multi-vendor Marketplace':   90000,
    'Custom E-Commerce':          70000,
  },
}

// ─── Feature add-on prices per service type (in DZD) ────────────────────────
export const FEATURE_PRICES: Record<string, Record<string, number>> = {
  website: {
    'CMS / Blog':           8000,
    'Booking System':      15000,
    'Contact Form':         5000,
    'Animations & Motion':  8000,
    'Multi-language':       8000,
    'SEO Optimization':    10000,
    'Portfolio Gallery':    6000,
    'Live Chat':            8000,
  },
  webapp: {
    'User Authentication':   12000,
    'Admin Dashboard':       25000,
    'Payment Integration':   20000,
    'API Integration':       15000,
    'Real-time Features':    20000,
    'AI Features':           40000,
    'File Uploads':           8000,
    'Email Notifications':    8000,
    'Analytics Dashboard':   15000,
    'Multi-language':         8000,
  },
  mobile: {
    'Push Notifications':   12000,
    'Offline Mode':         15000,
    'Payment Integration':  20000,
    'Social Login':         10000,
    'Camera / GPS Access':  12000,
    'In-app Chat':          20000,
    'Admin Dashboard':      25000,
    'Email Notifications':   8000,
  },
  ai: {
    'Chatbot / Assistant':       20000,
    'Document Processing':       25000,
    'Recommendation System':     30000,
    'Workflow Automation':       25000,
    'Data Analysis':             20000,
    'Custom LLM Integration':    40000,
    'Smart Search':              20000,
    'Email Automation':          15000,
  },
  saas: {
    'Multi-tenant System':    40000,
    'Subscription Billing':   35000,
    'Role-based Access':      25000,
    'Admin Dashboard':        25000,
    'API & Webhooks':         20000,
    'Analytics & Reports':    20000,
    'Team Management':        15000,
    'AI Features':            40000,
    'Email Notifications':     8000,
    'White-label Option':     30000,
  },
  ecommerce: {
    'Product Catalog':       10000,
    'Payment Integration':   20000,
    'Inventory System':      20000,
    'Order Tracking':        15000,
    'Discount & Coupons':    10000,
    'Admin Dashboard':       25000,
    'Multi-language':         8000,
    'Reviews & Ratings':     10000,
    'Email Notifications':    8000,
    'Mobile App':            40000,
  },
}

// ─── Company type multipliers ─────────────────────────────────────────────────
// Positive = surcharge, negative = discount (e.g. -0.1 = 10% off)
export const COMPANY_MULTIPLIERS: Record<string, number> = {
  'Individual / Freelancer': -0.10,
  'Small Business':           0,
  'Startup':                  0,
  'Enterprise':              +0.40,
}

// ─── Price calculation ────────────────────────────────────────────────────────
export function calculatePrice(
  serviceId: string,
  projectLabel: string,
  featureLabels: string[],
  companyLabel: string,
): { min: number; max: number } {
  const base = BASE_PRICES[serviceId]?.[projectLabel] ?? 0

  const featuresTotal = featureLabels.reduce((sum, f) => {
    return sum + (FEATURE_PRICES[serviceId]?.[f] ?? 0)
  }, 0)

  const subtotal   = base + featuresTotal
  const multiplier = COMPANY_MULTIPLIERS[companyLabel] ?? 0
  const total      = Math.round(subtotal * (1 + multiplier))

  return {
    min: total,
    max: Math.round(total * 1.1),
  }
}
