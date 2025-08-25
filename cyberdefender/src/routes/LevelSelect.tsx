import { Link } from 'react-router-dom'

const LevelCard = ({ title, to, locked }: { title: string; to?: string; locked?: boolean }) => {
  return (
    <div className="card p-6 flex flex-col items-start justify-between min-h-40">
      <div>
        <h3 className="text-xl font-bold neon-text">{title}</h3>
        <p className="text-white/60 mt-1">{locked ? 'Locked' : 'Ready'}</p>
      </div>
      {locked ? (
        <button className="mt-4 cursor-not-allowed opacity-50 border border-white/10 rounded-md px-4 py-2">Locked</button>
      ) : (
        <Link to={to!} className="mt-4 inline-block rounded-md px-4 py-2 font-semibold bg-[--color-neon-purple] text-white">
          Start
        </Link>
      )}
    </div>
  )
}

const LevelSelect = () => {
  const username = localStorage.getItem('cd_username') || 'Agent'
  return (
    <div className="min-h-dvh p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Welcome, {username}</h2>
          <div className="flex items-center gap-3">
            <Link to="/leaderboard" className="rounded-md px-3 py-1.5 bg-white/10 hover:bg-white/20">Leaderboard</Link>
            <div className="text-white/60 hidden sm:block">Progress saves locally</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <LevelCard title="Phishing" to="/play/phishing" />
          <LevelCard title="Passwords" locked />
          <LevelCard title="Malware" locked />
          <LevelCard title="Safe Browsing" locked />
        </div>
      </div>
    </div>
  )
}

export default LevelSelect

