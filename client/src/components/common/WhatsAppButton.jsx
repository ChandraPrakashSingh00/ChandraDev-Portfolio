import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = '8810503029' // TODO: replace with your real WhatsApp number (with country code, no + or spaces)
const DEFAULT_MESSAGE = "Hi Chandra, I'd like to talk about a project."

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-7 left-7 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* pulsing ring to draw attention */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />

      <FaWhatsapp size={20} />

      {/* tooltip */}
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </motion.a>
  )
}
