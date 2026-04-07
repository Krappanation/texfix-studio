// ─── Service types ────────────────────────────────────────────────────────────
export type ServiceId =
  | 'website'
  | 'webapp'
  | 'mobile'
  | 'ai'
  | 'saas'
  | 'ecommerce'

export const SERVICES: { id: ServiceId; label: string; icon: string }[] = [
  { id: 'website',   label: 'Website',          icon: '🌐' },
  { id: 'webapp',    label: 'Web Application',   icon: '⚡' },
  { id: 'mobile',    label: 'Mobile App',        icon: '📱' },
  { id: 'ai',        label: 'AI & Automation',   icon: '🤖' },
  { id: 'saas',      label: 'SaaS Platform',     icon: '☁️' },
  { id: 'ecommerce', label: 'E-Commerce',        icon: '🛍️' },
]

// ─── Project types per service ────────────────────────────────────────────────
export const PROJECT_TYPES: Record<ServiceId, string[]> = {
  website: [
    'Portfolio Site',
    'Landing Page',
    'Corporate Site',
    'Blog / Magazine',
  ],
  webapp: [
    'Internal Tool / Dashboard',
    'Booking Platform',
    'Marketplace',
    'Custom Business System',
  ],
  mobile: [
    'Simple Info App',
    'Social / Community',
    'On-demand / Booking',
    'Business Management',
  ],
  ai: [
    'Chatbot / Assistant',
    'Workflow Automation',
    'Custom AI Integration',
    'Data Pipeline',
  ],
  saas: [
    'Simple SaaS MVP',
    'Full SaaS Platform',
  ],
  ecommerce: [
    'Simple Store',
    'Multi-vendor Marketplace',
    'Custom E-Commerce',
  ],
}

// ─── Features per service ─────────────────────────────────────────────────────
export const FEATURES: Record<ServiceId, string[]> = {
  website: [
    'CMS / Blog',
    'Booking System',
    'Contact Form',
    'Animations & Motion',
    'Multi-language',
    'SEO Optimization',
    'Portfolio Gallery',
    'Live Chat',
  ],
  webapp: [
    'User Authentication',
    'Admin Dashboard',
    'Payment Integration',
    'API Integration',
    'Real-time Features',
    'AI Features',
    'File Uploads',
    'Email Notifications',
    'Analytics Dashboard',
    'Multi-language',
  ],
  mobile: [
    'Push Notifications',
    'Offline Mode',
    'Payment Integration',
    'Social Login',
    'Camera / GPS Access',
    'In-app Chat',
    'Admin Dashboard',
    'Email Notifications',
  ],
  ai: [
    'Chatbot / Assistant',
    'Document Processing',
    'Recommendation System',
    'Workflow Automation',
    'Data Analysis',
    'Custom LLM Integration',
    'Smart Search',
    'Email Automation',
  ],
  saas: [
    'Multi-tenant System',
    'Subscription Billing',
    'Role-based Access',
    'Admin Dashboard',
    'API & Webhooks',
    'Analytics & Reports',
    'Team Management',
    'AI Features',
    'Email Notifications',
    'White-label Option',
  ],
  ecommerce: [
    'Product Catalog',
    'Payment Integration',
    'Inventory System',
    'Order Tracking',
    'Discount & Coupons',
    'Admin Dashboard',
    'Multi-language',
    'Reviews & Ratings',
    'Email Notifications',
    'Mobile App',
  ],
}

// ─── Company types ────────────────────────────────────────────────────────────
export const COMPANY_TYPES: {
  id: string
  label: string
  description: string
}[] = [
  {
    id:          'individual',
    label:       'Individual / Freelancer',
    description: 'Working solo or as a freelancer',
  },
  {
    id:          'small',
    label:       'Small Business',
    description: 'Established business, 1–50 employees',
  },
  {
    id:          'startup',
    label:       'Startup',
    description: 'Early-stage, fast-growing company',
  },
  {
    id:          'enterprise',
    label:       'Enterprise',
    description: 'Large-scale organization',
  },
]

// ─── Step metadata ────────────────────────────────────────────────────────────
export const STEP_LABELS = ['Service', 'Project', 'Features', 'Company', 'Estimate']

export const STEP_TITLES: Record<number, string> = {
  1: 'What are you looking to build?',
  2: 'What type of project is it?',
  3: 'What features do you need?',
  4: 'What kind of company are you?',
  5: 'Your estimate is ready.',
}
