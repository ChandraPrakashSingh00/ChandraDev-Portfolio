import { Code2, Server, Layers, Smartphone, Plug, Palette, Gauge, LayoutDashboard } from 'lucide-react'

export const services = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'Pixel-perfect, accessible interfaces built with React and modern component architecture.',
    details:
      "I build interfaces that feel fast and considered \u2014 component-driven React apps with clean state management, responsive layouts, and motion that supports the UX instead of distracting from it.",
    features: [
      'Component-based React architecture',
      'Responsive, mobile-first layouts',
      'Reusable design system & UI kit',
      'Accessibility (WCAG) best practices',
      'Performance-tuned animations',
      'Cross-browser QA',
    ],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Secure, scalable REST APIs with Node.js, Express, and well-modeled MongoDB schemas.',
    details:
      "Backends built to stay reliable under real traffic \u2014 clear data models, sensible validation, and auth that doesn't get in the way of shipping features.",
    features: [
      'RESTful API design',
      'JWT-based authentication',
      'Schema modeling in MongoDB',
      'Input validation & error handling',
      'Rate limiting & security middleware',
      'Environment-based config',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    icon: Layers,
    title: 'Full Stack Development',
    description: 'End-to-end product builds — from database design to deployed, production-ready UI.',
    details:
      'One person owning the whole slice: schema, API, UI, and deployment — so decisions stay consistent from the database up to the last pixel.',
    features: [
      'End-to-end feature ownership',
      'Database to UI architecture',
      'Third-party API integrations',
      'CI-friendly project structure',
      'Deployment & environment setup',
      'Post-launch support',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    icon: Smartphone,
    title: 'Responsive Websites',
    description: 'Interfaces that adapt cleanly across desktop, tablet, and mobile without compromise.',
    details:
      "Layouts built mobile-first and tested across real breakpoints, so the experience holds up whether it's opened on a phone or a wide desktop monitor.",
    features: [
      'Mobile-first grid & flex layouts',
      'Fluid typography & spacing',
      'Touch-friendly interactions',
      'Tested across real devices',
      'Optimized images per breakpoint',
      'No horizontal scroll surprises',
    ],
    stack: ['Tailwind CSS', 'React', 'CSS Grid'],
  },
  {
    icon: Plug,
    title: 'API Development',
    description: 'Versioned, documented APIs with authentication, validation, and rate limiting built in.',
    details:
      "APIs meant to be consumed by someone else's team as easily as your own — documented, predictable, and versioned so nothing breaks silently.",
    features: [
      'Versioned endpoint structure',
      'Request/response validation',
      'Auth & role-based access',
      'Rate limiting & throttling',
      'Postman / OpenAPI documentation',
      'Structured error responses',
    ],
    stack: ['Express', 'JWT', 'Postman', 'MongoDB'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Design systems and interaction patterns that make products feel considered and calm.',
    details:
      "Design work focused on clarity — consistent spacing, type, and color tokens that hold together as a system, not a one-off screen.",
    features: [
      'Design tokens (color, type, spacing)',
      'Component & interaction patterns',
      'Wireframes to high-fidelity flows',
      'Micro-interaction & motion design',
      'Design handoff for dev',
      'Dark/light theming',
    ],
    stack: ['Figma', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: Gauge,
    title: 'Website Optimization',
    description: 'Performance audits and fixes — code splitting, lazy loading, and asset optimization.',
    details:
      "A focused pass on what's actually slowing a site down — bundle size, render-blocking assets, and layout shifts — with measurable before/after numbers.",
    features: [
      'Lighthouse & Core Web Vitals audit',
      'Code splitting & lazy loading',
      'Image & asset optimization',
      'Bundle size reduction',
      'Caching strategy',
      'Render-blocking resource fixes',
    ],
    stack: ['Vite', 'Lighthouse', 'React'],
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Development',
    description: 'Data-dense admin panels and analytics dashboards with clear, readable visualizations.',
    details:
      "Admin tools built around the questions the user actually needs answered — clean tables, filters, and charts instead of noisy, cluttered screens.",
    features: [
      'Role-based admin panels',
      'Data tables with filter & search',
      'Charts & analytics widgets',
      'CRUD workflows',
      'Export & reporting tools',
      'Real-time data updates',
    ],
    stack: ['React', 'Recharts', 'MongoDB', 'Express'],
  },
]
