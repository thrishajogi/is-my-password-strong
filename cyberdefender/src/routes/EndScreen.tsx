import { useLocation, useNavigate } from 'react-router-dom'

type Result = { score: number; badge: string; level: string }

const tips = [
  'Never trust urgent requests for money or credentials.',
  'Hover links to inspect the actual URL before clicking.',
  'Report suspicious emails to IT/security immediately.',
  'Enable 2FA wherever possible for extra protection.',
]

const EndScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as Result) || { score: 0, badge: 'Rookie', level: 'Phishing' }

  const best = Number(localStorage.getItem('cd_phishing_best') || 0)
  const username = localStorage.getItem('cd_username') || 'Agent'

  return (
    <div className="min-h-dvh p-6">
      <div className="max-w-3xl mx-auto card p-8">
        <h2 className="text-3xl font-extrabold neon-text">{state.level} Results</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-black/40 p-4 border border-white/10">
            <div className="text-white/60 text-sm">Player</div>
            <div className="text-xl font-semibold">{username}</div>
          </div>
          <div className="rounded-lg bg-black/40 p-4 border border-white/10">
            <div className="text-white/60 text-sm">Score</div>
            <div className="text-xl font-semibold">{state.score}</div>
          </div>
          <div className="rounded-lg bg-black/40 p-4 border border-white/10">
            <div className="text-white/60 text-sm">Best</div>
            <div className="text-xl font-semibold">{best}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="inline-block rounded-full px-4 py-2 bg-[--color-neon-purple] text-white font-semibold">Badge: {state.badge}</div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Quick Tips</h3>
          <ul className="list-disc list-inside text-white/80 mt-2 space-y-1">
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={() => navigate('/play/phishing')} className="rounded-md px-4 py-2 bg-[--color-neon-green] text-black font-semibold">Retry</button>
          <button onClick={() => navigate('/levels')} className="rounded-md px-4 py-2 bg-[--color-neon-cyan] text-black font-semibold">Level Select</button>
        </div>
      </div>
    </div>
  )
}

export default EndScreen

