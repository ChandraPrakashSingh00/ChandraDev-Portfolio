import express from 'express'
import { body } from 'express-validator'
import validate from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { loginAdmin, getMe } from '../controllers/authController.js'

const router = express.Router()

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  loginAdmin
)

router.get('/me', protect, getMe)

export default router
