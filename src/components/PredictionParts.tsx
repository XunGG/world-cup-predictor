import type { PredictedScore } from '../types/prediction'

interface BarProps {
  nameA: string
  nameB: string
  a: number
  draw: number
  b: number
}

/** 胜平负概率进度条 + 图例 */
export function ProbabilityBar({ nameA, nameB, a, draw, b }: BarProps) {
  return (
    <div>
      <div className="flex h-8 w-full overflow-hidden rounded-full text-xs font-bold">
        <div
          className="flex items-center justify-center bg-sky-500/80"
          style={{ width: `${a}%` }}
          title={`${nameA} 胜`}
        >
          {a >= 8 ? `${a}%` : ''}
        </div>
        <div
          className="flex items-center justify-center bg-slate-500/80"
          style={{ width: `${draw}%` }}
          title="平局"
        >
          {draw >= 8 ? `${draw}%` : ''}
        </div>
        <div
          className="flex items-center justify-center bg-rose-500/80"
          style={{ width: `${b}%` }}
          title={`${nameB} 胜`}
        >
          {b >= 8 ? `${b}%` : ''}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
        <span className="flex items-center gap-1.5 text-sky-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
          {nameA}胜 {a}%
        </span>
        <span className="flex items-center gap-1.5 text-slate-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500" />
          平局 {draw}%
        </span>
        <span className="flex items-center gap-1.5 text-rose-300">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          {nameB}胜 {b}%
        </span>
      </div>
    </div>
  )
}

interface XgProps {
  nameA: string
  nameB: string
  flagA: string
  flagB: string
  egA: number
  egB: number
}

/** 预期进球展示 */
export function ExpectedGoals({ nameA, nameB, flagA, flagB, egA, egB }: XgProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-black/20 p-3 text-center">
        <div className="text-xs text-slate-400">
          {flagA} {nameA}
        </div>
        <div className="mt-1 text-2xl font-bold tabular-nums text-sky-300">{egA.toFixed(2)}</div>
      </div>
      <div className="rounded-xl bg-black/20 p-3 text-center">
        <div className="text-xs text-slate-400">
          {flagB} {nameB}
        </div>
        <div className="mt-1 text-2xl font-bold tabular-nums text-rose-300">{egB.toFixed(2)}</div>
      </div>
    </div>
  )
}

interface TopScoresProps {
  nameA: string
  nameB: string
  scores: PredictedScore[]
  highlight?: { scoreA: number; scoreB: number } // 复盘时高亮命中的比分
}

/** Top 3 最可能比分列表 */
export function TopScores({ nameA, nameB, scores, highlight }: TopScoresProps) {
  return (
    <ol className="space-y-2">
      {scores.map((s, i) => {
        const hit = highlight && highlight.scoreA === s.scoreA && highlight.scoreB === s.scoreB
        return (
          <li
            key={`${s.scoreA}-${s.scoreB}-${i}`}
            className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${
              hit ? 'bg-gold/20 ring-1 ring-gold/50' : 'bg-black/20'
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">{i + 1}</span>
              <span className="font-semibold text-white">
                <span className="text-slate-300">{nameA}</span>{' '}
                <span className="tabular-nums text-sky-300">{s.scoreA}</span>
                <span className="mx-1 text-slate-500">:</span>
                <span className="tabular-nums text-rose-300">{s.scoreB}</span>{' '}
                <span className="text-slate-300">{nameB}</span>
              </span>
              {hit && <span className="text-xs font-bold text-gold">命中</span>}
            </span>
            <span className="text-sm font-bold tabular-nums text-slate-200">{s.probability}%</span>
          </li>
        )
      })}
    </ol>
  )
}

interface ConfidenceBadgeProps {
  confidence: '低' | '中' | '高'
}

/** 预测可信度徽章 */
export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const style =
    confidence === '高'
      ? 'bg-emerald-500/20 text-emerald-200'
      : confidence === '中'
        ? 'bg-amber-500/20 text-amber-200'
        : 'bg-slate-500/20 text-slate-200'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${style}`}>
      预测可信度：{confidence}
    </span>
  )
}
