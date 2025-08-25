import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[--color-cyber-bg]">
      <motion.div
        className="absolute -inset-40 opacity-40 blur-3xl"
        style={{
          background:
            'conic-gradient(from 0deg, var(--color-neon-purple), var(--color-neon-cyan), var(--color-neon-green), var(--color-neon-purple))',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(168,85,247,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
    </div>
  )
}

export default AnimatedBackground

