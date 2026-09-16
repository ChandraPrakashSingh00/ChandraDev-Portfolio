export const projects = [
  {
    id: 1,
    title: 'UTCI based Heat Stress Risk Index Forecast',
    category: 'Full Stack',
    featured: true,
    image: './Project/utci.JPG',
    description:
      'UTCI-Based Heat Stress Risk Index Forecast (IIT Rookrie Project) is a web application that provides real-time weather data and forecasts based on the Universal Thermal Climate Index (UTCI).',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redux'],
    features: ['JWT Authentication', 'Admin Dashboard', 'Stripe Checkout', 'Order Tracking'],
    live: 'https://hsrif.com',
    github: 'https://github.com/ChandraPrakashSingh00/UTCI_Based-Heat-Stress-Risk-Index_Foracst-Project---Mern-Stack',
  },
  {
    id: 2,
    title: 'Kairos Blog Platform',
    category: 'Full Stack',
    featured: true,
    image: './Project/kairos.png',
    description:
      'Kairos is a modern blogging and content publishing platform designed to help creators, businesses, and communities share knowledge, insights, and stories through a clean, user-friendly experience.',
    tech: ['React', 'Express', 'MongoDB', 'Socket.io', 'Tailwind'],
    features: ['Drag & Drop Boards', 'Real-time Sync', 'Team Workspaces', 'Activity Log'],
    live: 'https://example.com',
    github: 'https://github.com/example/taskflow',
  },
  {
    id: 3,
    title: 'Kamigami – E-commerce Store',
    category: 'Full Stack',
    featured: false,
    image: './Project/kamigamiecommerce.png',
    description:
      'Kamigami is a premium e-commerce destination inspired by mythology, strength, and individuality. We offer carefully crafted apparel and lifestyle products that blend modern streetwear aesthetics with timeless cultural influences.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Redis', 'JWT'],
    features: ['Rate Limiting', 'API Key Auth', 'Aggregation Pipelines', 'Caching Layer'],
    live: 'https://kamigami.in',
    github: 'https://github.com/example/devmetrics',
  },
  {
    id: 4,
    title: 'Alfacure Lifescience Pvt. Ltd.',
    category: 'Frontend',
    featured: true,
    image: './Project/alf.png',
    description:
      'Alfacure Lifescience Pvt. Ltd. is a pharmaceutical and healthcare company committed to improving lives through high-quality, safe, and affordable healthcare solutions.',
    tech: ['React', 'Recharts', 'Framer Motion', 'Tailwind'],
    features: ['Interactive Charts', 'Animated Transitions', 'CSV Export', 'Responsive Layout'],
    live: 'https://alfacurelifescience.com/',
    github: 'https://github.com/example/auroraboard',
  },
  {
    id: 5,
    title: 'Edu Web - Education Website',
    category: 'Full Stack',
    featured: false,
    image: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?q=80&w=1400&auto=format&fit=crop',
    description:
      'A clean, responsive education platform website with organized course listings, informative pages and an easy-to-navigate layout designed for students and institutions.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Cloudinary'],
    features: ['Real-time Chat', 'Media Uploads', 'Typing Indicators', 'Read Receipts'],
    live: 'https://chandraprakashsingh00.github.io/Education-Website/',
    github: 'https://chandraprakashsingh00.github.io/Education-Website/',
  },
  {
    id: 6,
    title: 'FitTrack API',
    category: 'Backend',
    featured: false,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1400&auto=format&fit=crop',
    description:
      'A workout and nutrition tracking API with user authentication, progress analytics, and a versioned REST interface.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Express Validator'],
    features: ['Versioned REST API', 'Progress Analytics', 'Input Validation', 'Role-based Access'],
    live: 'https://example.com',
    github: 'https://github.com/example/fittrack-api',
  },
]

export const categories = ['All', 'Full Stack', 'Frontend', 'Backend']
