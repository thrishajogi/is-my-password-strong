import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './routes/Login'
import LevelSelect from './routes/LevelSelect'
import PhishingGame from './routes/PhishingGame'
import EndScreen from './routes/EndScreen'
import Leaderboard from './routes/Leaderboard'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-dvh">
        <AnimatedBackground />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/levels" element={<LevelSelect />} />
            <Route path="/play/phishing" element={<PhishingGame />} />
            <Route path="/end" element={<EndScreen />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
