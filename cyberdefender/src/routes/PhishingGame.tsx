import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import phishingExamples from '../samples/phishingExamples'
import { evaluateRound, getBadgeForScore } from '../utils/scoring'
import { useNavigate } from 'react-router-dom'

type Example = {
  id: string
  subject: string
  from: string
  preview: string
  isPhish: boolean
  tip: string
}

const PhishingGame = () => {
  const navigate = useNavigate()
  const examples = useMemo<Example[]>(() => phishingExamples, [])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState<null | { correct: boolean; tip: string }>(null)
  const lock = useRef(false)

  const current = examples[index]

  const answer = (guessIsPhish: boolean) => {
    if (lock.current) return
    lock.current = true
    const { gained, newStreak, correct } = evaluateRound(guessIsPhish, current.isPhish, streak)
    setScore((s) => s + gained)
    setStreak(newStreak)
    setFeedback({ correct, tip: current.tip })
    setTimeout(() => {
      setFeedback(null)
      if (index + 1 >= examples.length) {
        const badge = getBadgeForScore(score + gained)
        const result = { score: score + gained, badge, level: 'Phishing' }
        const existing = JSON.parse(localStorage.getItem('cd_runs') || '[]')
        existing.unshift({ ...result, at: Date.now() })
        localStorage.setItem('cd_runs', JSON.stringify(existing.slice(0, 20)))
        localStorage.setItem('cd_phishing_best', String(Math.max(Number(localStorage.getItem('cd_phishing_best') || 0), score + gained)))
        navigate('/end', { state: result })
      } else {
        setIndex((i) => i + 1)
        lock.current = false
      }
    }, 900)
  }

  return (
    <div className="min-h-dvh p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white/70">Question {index + 1} / {examples.length}</div>
          <div className="text-white/70">Score: <span className="text-white">{score}</span> | Streak: {streak}</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="card p-6"
          >
            <div className="text-white/60 text-sm">From: <span className="text-white">{current.from}</span></div>
            <div className="text-xl font-semibold mt-2">{current.subject}</div>
            <div className="mt-3 text-white/80">{current.preview}</div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => answer(false)} className="flex-1 rounded-md px-4 py-3 bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-400/40">Safe</button>
              <button onClick={() => answer(true)} className="flex-1 rounded-md px-4 py-3 bg-rose-400/20 hover:bg-rose-400/30 border border-rose-400/40">Phish</button>
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`mt-4 rounded-md px-4 py-3 ${feedback.correct ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-rose-500/20 border border-rose-500/40'}`}
                >
                  <div className="font-semibold">{feedback.correct ? 'Correct!' : 'Not quite.'}</div>
                  <div className="text-white/80 text-sm mt-1">{current.tip}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PhishingGame

