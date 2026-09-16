import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import contactRoutes from './routes/contact.js'
import projectRoutes from './routes/projects.js'
import authRoutes from './routes/auth.js'

connectDB()

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Rate limit: protects the contact form and auth routes from abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
app.use('/api/contact', apiLimiter)
app.use('/api/auth', apiLimiter)

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() })
})

app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})
