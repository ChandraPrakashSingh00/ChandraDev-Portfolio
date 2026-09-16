import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../models/Admin.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token provided')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = await Admin.findById(decoded.id).select('-password')
    if (!req.admin) {
      res.status(401)
      throw new Error('Not authorized, admin not found')
    }
    next()
  } catch (err) {
    res.status(401)
    throw new Error('Not authorized, token invalid or expired')
  }
})
