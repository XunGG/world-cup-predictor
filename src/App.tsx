import { useMemo, useState } from 'react'
import { TEAMS } from './data/teams'
import type { Ratings } from './data/teams'
import { predict } from './utils/predict'
import type { PredictionResult as Result } from './utils/predict'
import TeamSelector from './components/TeamSelector'
import RatingEditor from './components/RatingEditor'
import PredictionResult from './components/PredictionResult'

export default function App() {
  const [idA, setIdA] = useState('arg')
  const [idB, setIdB] = useState('fra')

  const teamA = useMemo(() => TEAMS.find((t) => t.id === idA)!, [idA])
  const teamB = useMemo(() => TEAMS.find((t) => t.id === idB)!, [idB])

  // Editable rating copies (reset whenever the selected team changes).
  const [ratingsA, setRatingsA] = useState<Ratings>(teamA.ratings)
  const [ratingsB, setRatingsB] = useState<Ratings>(teamB.ratings)

  const [result, setResult] = useState<Result | null>(null)

  function handleSelectA(id: string) {
    setIdA(id)
    setRatingsA(TEAMS.find((t) => t.id === id)!.ratings)
    setResult(null)
  }

  function handleSelectB(id: string) {
    setIdB(id)
    setRatingsB(TEAMS.find((t) => t.id === id)!.ratings)
    setResult(null)
  }

  function handlePredict() {
    setResult(
      predict({
        nameA: teamA.name,
        nameB: teamB.name,
        ratingsA,
        ratingsB,
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pitch-dark via-pitch to-pitch-dark">
      {/* subtle pitch-line texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0, #fff 2px, transparent 2px, transparent 80px)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-3 text-5xl" aria-hidden>
            ⚽🏆
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            World Cup Predictor
          </h1>
          <p className="mt-3 text-slate-300">
            Pick two teams, tweak their ratings, and predict the result.
          </p>
        </header>

        {/* Matchup cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Team A */}
          <section className="rounded-2xl border border-sky-400/20 bg-white/5 p-6 shadow-lg backdrop-blur">
            <TeamSelector
              label="Team A"
              value={idA}
              disabledId={idB}
              onChange={handleSelectA}
            />
            <div className="mt-6">
              <RatingEditor ratings={ratingsA} accent="text-sky-300" onChange={setRatingsA} />
            </div>
          </section>

          {/* Team B */}
          <section className="rounded-2xl border border-rose-400/20 bg-white/5 p-6 shadow-lg backdrop-blur">
            <TeamSelector
              label="Team B"
              value={idB}
              disabledId={idA}
              onChange={handleSelectB}
            />
            <div className="mt-6">
              <RatingEditor ratings={ratingsB} accent="text-rose-300" onChange={setRatingsB} />
            </div>
          </section>
        </div>

        {/* Predict button */}
        <div className="mt-8 text-center">
          <button
            onClick={handlePredict}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-lg font-bold text-pitch-dark shadow-lg transition hover:scale-[1.03] hover:bg-yellow-300 active:scale-95"
          >
            ⚡ Predict
          </button>
        </div>

        {/* Result */}
        {result && (
          <PredictionResult
            result={result}
            nameA={teamA.name}
            nameB={teamB.name}
            flagA={teamA.flag}
            flagB={teamB.flag}
          />
        )}

        {/* Footer */}
        <footer className="mt-14 text-center text-xs text-slate-400">
          Ratings are illustrative. Predictions are for fun, not betting advice. ⚽
        </footer>
      </div>
    </div>
  )
}
