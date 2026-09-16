import asyncHandler from 'express-async-handler'
import Project from '../models/Project.js'
import cloudinary from '../config/cloudinary.js'

// @desc    Get all projects (supports ?category= & ?search=)
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const { category, search } = req.query
  const filter = {}
  if (category && category !== 'All') filter.category = category
  if (search) filter.$text = { $search: search }

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 })
  res.json({ success: true, count: projects.length, data: projects })
})

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }
  res.json({ success: true, data: project })
})

// @desc    Create a project (with optional image upload)
// @route   POST /api/projects
// @access  Private (admin)
export const createProject = asyncHandler(async (req, res) => {
  const body = { ...req.body }

  if (typeof body.tech === 'string') body.tech = body.tech.split(',').map((t) => t.trim())
  if (typeof body.features === 'string') body.features = body.features.split(',').map((f) => f.trim())

  if (req.file) {
    body.image = req.file.path
    body.imagePublicId = req.file.filename
  }

  const project = await Project.create(body)
  res.status(201).json({ success: true, data: project })
})

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (admin)
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  const body = { ...req.body }
  if (typeof body.tech === 'string') body.tech = body.tech.split(',').map((t) => t.trim())
  if (typeof body.features === 'string') body.features = body.features.split(',').map((f) => f.trim())

  if (req.file) {
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {})
    }
    body.image = req.file.path
    body.imagePublicId = req.file.filename
  }

  Object.assign(project, body)
  await project.save()

  res.json({ success: true, data: project })
})

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (admin)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  if (project.imagePublicId) {
    await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {})
  }

  await project.deleteOne()
  res.json({ success: true, message: 'Project deleted' })
})
