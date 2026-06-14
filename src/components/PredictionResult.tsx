import type { PredictionResult as Result } from '../utils/predict'

interface PredictionResultProps {
  result: Result
  nameA: string
  nameB: string
  flagA: string
  flagB: string
}

export default function PredictionResult({
  result,
  nameA,
  nameB,
  flagA,
  flagB,
}: PredictionResultProps) {
  const { winA, draw, winB, scoreA, scoreB, explanation } = result

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      {/* Recommended scoreline */}
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Recommended Score
        </p>
        <div className="mt-2 flex items-center justify-center gap-4 text-4xl font-extrabold">
          <span className="flex items-center gap-2">
            <span aria-hidden>{flagA}</span>
            <span className="text-sky-300 tabular-nums">{scoreA}</span>
          </span>
          <span className="text-slate-500">:</span>
          <span className="flex items-center gap-2">
            <span className="text-rose-300 tabular-nums">{scoreB}</span>
            <span aria-hidden>{flagB}</span>
          </span>
        </div>
      </div>

      {/* Probability bar */}
      <div className="mb-2 flex h-7 w-full overflow-hidden rounded-full text-xs font-bold">
        <div
          className="flex items-center justify-center bg-sky-500/80"
          style={{ width: `${winA}%` }}
          title={`${nameA} win`}
        >
          {winA >= 8 ? `${winA}%` : ''}
        </div>
        <div
          className="flex items-center justify-center bg-slate-500/80"
          style={{ width: `${draw}%` }}
          title="Draw"
        >
          {draw >= 8 ? `${draw}%` : ''}
        </div>
        <div
          className="flex items-center justify-center bg-rose-500/80"
          style={{ width: `${winB}%` }}
          title={`${nameB} win`}
        >
          {winB >= 8 ? `${winB}%` : ''}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex justify-between text-sm">
        <span className="flex items-center gap-1.5 text-sky-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
          {nameA} {winA}%
        </span>
        <span className="flex items-center gap-1.5 text-slate-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500" />
          Draw {draw}%
        </span>
        <span className="flex items-center gap-1.5 text-rose-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          {nameB} {winB}%
        </span>
      </div>

      {/* Explanation */}
      <p className="rounded-xl bg-black/20 p-4 text-sm leading-relaxed text-slate-200">
        {explanation}
      </p>
    </div>
  )
}
