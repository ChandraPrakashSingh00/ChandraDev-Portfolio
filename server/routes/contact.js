import express from 'express'
import { body } from 'express-validator'
import validate from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import {
  createContact,
  getContacts,
  markContactRead,
  deleteContact,
} from '../controllers/contactController.js'

const router = express.Router()

const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 20 }),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 150 }),
  body('message')
    .trim()
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters'),
]

router.post('/', contactRules, validate, createContact)
router.get('/', protect, getContacts)
router.patch('/:id/read', protect, markContactRead)
router.delete('/:id', protect, deleteContact)

export default router
