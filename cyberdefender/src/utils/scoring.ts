export function evaluateRound(guessIsPhish: boolean, actualIsPhish: boolean, currentStreak: number) {
  const correct = guessIsPhish === actualIsPhish
  const newStreak = correct ? currentStreak + 1 : 0
  const base = correct ? 100 : 0
  const combo = correct ? Math.min(newStreak * 10, 100) : 0
  const gained = base + combo
  return { correct, newStreak, gained }
}

export function getBadgeForScore(score: number) {
  if (score >= 900) return 'Firewall Ninja'
  if (score >= 700) return 'Phish Slayer'
  if (score >= 500) return 'Password Guru'
  return 'Rookie'
}

