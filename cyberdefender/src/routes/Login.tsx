import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Login = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const start = () => {
    const trimmed = username.trim()
    if (!trimmed) return
    localStorage.setItem('cd_username', trimmed)
    navigate('/levels')
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="card w-full max-w-lg p-8 relative">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold neon-text text-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CyberDefender
        </motion.h1>
        <p className="mt-2 text-center text-white/70">Train your cyber instincts.</p>

        <div className="mt-8 space-y-3">
          <label className="block text-sm uppercase tracking-widest text-white/70">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && start()}
            placeholder="Neo"
            className="w-full bg-black/40 border border-white/10 focus:border-[--color-neon-cyan] outline-none rounded-lg px-4 py-3 text-white placeholder-white/40"
          />
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(57,255,20,0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={start}
            className="w-full mt-4 rounded-lg px-5 py-3 font-semibold bg-[--color-neon-green] text-black"
          >
            Enter The Grid
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Login

