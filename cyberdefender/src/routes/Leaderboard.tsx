type Run = { score: number; badge: string; level: string; at: number }

const Leaderboard = () => {
  const runs: Run[] = JSON.parse(localStorage.getItem('cd_runs') || '[]')
  const best = Number(localStorage.getItem('cd_phishing_best') || 0)
  const username = localStorage.getItem('cd_username') || 'Agent'

  return (
    <div className="min-h-dvh p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold neon-text">Leaderboard</h2>
        <div className="mt-4 card p-4">
          <div className="flex items-center justify-between">
            <div className="text-white/70">Player</div>
            <div className="font-semibold">{username}</div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-white/70">Best (Phishing)</div>
            <div className="font-semibold">{best}</div>
          </div>
        </div>

        <div className="mt-6 card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-2">When</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Badge</th>
              </tr>
            </thead>
            <tbody>
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-white/60">No runs yet. Play a level!</td>
                </tr>
              ) : (
                runs.slice(0, 20).map((r, i) => (
                  <tr key={i} className="odd:bg-white/0 even:bg-white/5">
                    <td className="px-4 py-2 text-white/80">{new Date(r.at).toLocaleString()}</td>
                    <td className="px-4 py-2">{r.level}</td>
                    <td className="px-4 py-2">{r.score}</td>
                    <td className="px-4 py-2">{r.badge}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

