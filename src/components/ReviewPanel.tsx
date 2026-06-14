import type { Team } from '../types/team'
import type { PredictionResult, ReviewResult } from '../types/prediction'
import { ProbabilityBar, TopScores } from './PredictionParts'

interface ReviewPanelProps {
  teamA: Team // 用户当前选择的朝向
  teamB: Team
  actualScoreA: number // 已对齐到用户朝向的真实比分
  actualScoreB: number
  group: string
  date: string
  prediction: PredictionResult
  review: ReviewResult
  usedSnapshot: boolean
}

const LEVEL_STYLE: Record<ReviewResult['reviewLevel'], string> = {
  命中: 'bg-emerald-500/20 text-emerald-200 ring-emerald-400/40',
  方向正确: 'bg-sky-500/20 text-sky-200 ring-sky-400/40',
  偏差较大: 'bg-rose-500/20 text-rose-200 ring-rose-400/40',
}

export default function ReviewPanel({
  teamA,
  teamB,
  actualScoreA,
  actualScoreB,
  group,
  date,
  prediction,
  review,
  usedSnapshot,
}: ReviewPanelProps) {
  const { nameZh: nameA, flag: flagA } = teamA
  const { nameZh: nameB, flag: flagB } = teamB

  return (
    <div className="mt-8 space-y-6">
      {/* —— 真实赛果（最突出）—— */}
      <div className="rounded-2xl border-2 border-gold/60 bg-gradient-to-br from-gold/15 via-white/5 to-transparent p-5 shadow-xl sm:p-6">
        <div className="mb-3 flex items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-gold px-3 py-1 font-extrabold text-pitch-dark">已完赛</span>
          <span className="text-slate-300">
            {group}组 · {date}
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl sm:text-5xl" aria-hidden>
              {flagA}
            </span>
            <span className="max-w-[6rem] truncate text-sm text-slate-200">{nameA}</span>
          </div>
          <span className="text-6xl font-black tabular-nums text-white sm:text-7xl">{actualScoreA}</span>
          <span className="text-4xl font-bold text-slate-400 sm:text-5xl">:</span>
          <span className="text-6xl font-black tabular-nums text-white sm:text-7xl">{actualScoreB}</span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl sm:text-5xl" aria-hidden>
              {flagB}
            </span>
            <span className="max-w-[6rem] truncate text-sm text-slate-200">{nameB}</span>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-gold">真实赛果</p>
        <p className="mt-2 text-center text-xs text-slate-300">
          这场比赛已经结束，以下为真实赛果与模型复盘。
        </p>
      </div>

      {/* —— 模型预测回测 / 赛前快照 —— */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur sm:p-6">
        <h3 className="text-sm font-bold text-slate-100">
          {usedSnapshot ? '赛前预测快照' : '模型预测回测'}
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          {usedSnapshot
            ? '使用赛前保存的预测快照进行复盘。'
            : '未找到赛前预测快照，以下为当前模型回测结果。'}
        </p>

        <ProbabilityBar
          nameA={nameA}
          nameB={nameB}
          a={prediction.teamAWinProbability}
          draw={prediction.drawProbability}
          b={prediction.teamBWinProbability}
        />

        <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
          模型最可能比分（Top 3）
        </p>
        <TopScores
          nameA={nameA}
          nameB={nameB}
          scores={prediction.topScores}
          highlight={{ scoreA: actualScoreA, scoreB: actualScoreB }}
        />
      </div>

      {/* —— 复盘结论 —— */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur sm:p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">复盘结论</span>
          <span className={`rounded-full px-3 py-1 text-sm font-bold ring-1 ${LEVEL_STYLE[review.reviewLevel]}`}>
            {review.reviewLevel}
          </span>
        </div>

        <p className="mb-4 rounded-xl bg-black/20 p-4 text-sm leading-relaxed text-slate-200">
          {review.reviewText}
        </p>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">偏差分析</p>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Metric label="方向预测" value={review.directionCorrect ? '正确' : '错误'} ok={review.directionCorrect} />
          <Metric label="比分命中" value={review.exactScoreCorrect ? '是' : '否'} ok={review.exactScoreCorrect} />
          <Metric label="净胜球误差" value={String(review.goalDifferenceError)} />
          <Metric label="总进球误差" value={String(review.totalGoalsError)} />
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  const valueColor = ok === undefined ? 'text-slate-100' : ok ? 'text-emerald-300' : 'text-rose-300'
  return (
    <div className="rounded-xl bg-black/20 p-3 text-center">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`mt-1 text-lg font-bold tabular-nums ${valueColor}`}>{value}</div>
    </div>
  )
}
