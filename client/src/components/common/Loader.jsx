import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.div
            className="font-display text-3xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-text">Chandra.Dev</span>
  
          </motion.div>
          <div className="mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full w-1/2 bg-brand-gradient"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">Software Developer</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
