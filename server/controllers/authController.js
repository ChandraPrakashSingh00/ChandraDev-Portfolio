import asyncHandler from 'express-async-handler'
import Admin from '../models/Admin.js'
import generateToken from '../utils/generateToken.js'

// @desc    Login admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email }).select('+password')
  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    success: true,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    },
  })
})

// @desc    Get currently logged-in admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin })
})
