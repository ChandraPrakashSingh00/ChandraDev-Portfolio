import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    category: {
      type: String,
      required: true,
      enum: ['Full Stack', 'Frontend', 'Backend'],
    },
    description: { type: String, required: true, maxlength: 1000 },
    image: { type: String, required: true },
    imagePublicId: { type: String }, // Cloudinary public_id, for deletion
    tech: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    live: { type: String, trim: true },
    github: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

projectSchema.index({ title: 'text', description: 'text' })

export default mongoose.model('Project', projectSchema)
