import 'dotenv/config'
import connectDB from '../config/db.js'
import Admin from '../models/Admin.js'
import Project from '../models/Project.js'

const sampleProjects = [
  {
    title: 'NexCommerce',
    category: 'Full Stack',
    description:
      'A full-featured e-commerce platform with real-time inventory, Stripe payments, and an admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    features: ['JWT Authentication', 'Admin Dashboard', 'Stripe Checkout'],
    live: 'https://example.com',
    github: 'https://github.com/example/nexcommerce',
    featured: true,
    order: 1,
  },
  {
    title: 'TaskFlow',
    category: 'Full Stack',
    description: 'A collaborative project management tool with kanban boards and real-time updates.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop',
    tech: ['React', 'Express', 'MongoDB', 'Socket.io'],
    features: ['Drag & Drop Boards', 'Real-time Sync'],
    live: 'https://example.com',
    github: 'https://github.com/example/taskflow',
    featured: true,
    order: 2,
  },
]

async function seed() {
  await connectDB()

  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const existing = await Admin.findOne({ email })

  if (!existing) {
    await Admin.create({
      name: 'Portfolio Admin',
      email,
      password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!',
    })
    console.log(`Admin created: ${email} (change the password after first login)`)
  } else {
    console.log('Admin already exists, skipping.')
  }

  const projectCount = await Project.countDocuments()
  if (projectCount === 0) {
    await Project.insertMany(sampleProjects)
    console.log(`Seeded ${sampleProjects.length} sample projects.`)
  } else {
    console.log('Projects already exist, skipping.')
  }

  console.log('Seeding complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
