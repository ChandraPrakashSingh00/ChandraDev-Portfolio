import asyncHandler from 'express-async-handler'
import Contact from '../models/Contact.js'
import sendEmail from '../utils/sendEmail.js'

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  const contact = await Contact.create({ name, email, phone, subject, message })

  // Fire-and-forget email notification — do not fail the request if email fails
  if (process.env.SMTP_USER && process.env.CONTACT_RECEIVER_EMAIL) {
    sendEmail({
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New portfolio message: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }).catch((err) => console.error('Email send failed:', err.message))
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully.',
    data: { id: contact._id },
  })
})

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (admin)
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json({ success: true, count: contacts.length, data: contacts })
})

// @desc    Mark a message as read
// @route   PATCH /api/contact/:id/read
// @access  Private (admin)
export const markContactRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
  if (!contact) {
    res.status(404)
    throw new Error('Message not found')
  }
  res.json({ success: true, data: contact })
})

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private (admin)
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Message not found')
  }
  res.json({ success: true, message: 'Message deleted' })
})
