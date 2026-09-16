import express from 'express'
import { body } from 'express-validator'
import validate from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../config/cloudinary.js'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js'

const router = express.Router()

const projectRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('category').isIn(['Full Stack', 'Frontend', 'Backend']).withMessage('Invalid category'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }),
]

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', protect, upload.single('image'), projectRules, validate, createProject)
router.put('/:id', protect, upload.single('image'), updateProject)
router.delete('/:id', protect, deleteProject)

export default router
