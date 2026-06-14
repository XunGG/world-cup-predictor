import type { Team } from '../types/team'
import type { PredictionResult as Result } from '../types/prediction'
import { ProbabilityBar, ExpectedGoals, TopScores, ConfidenceBadge } from './PredictionParts'

interface PredictionResultProps {
  teamA: Team
  teamB: Team
  prediction: Result
  isCustom: boolean // 是否为不在赛程中的自定义对阵
}

export default function PredictionResult({
  teamA,
  teamB,
  prediction,
  isCustom,
}: PredictionResultProps) {
  const { nameZh: nameA, flag: flagA } = teamA
  const { nameZh: nameB, flag: flagB } = teamB

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur sm:p-6">
      {/* 标题 */}
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">预测结果</p>
        <h2 className="mt-1 text-xl font-bold sm:text-2xl">
          {flagA} {nameA} <span className="text-slate-500">vs</span> {nameB} {flagB}
        </h2>
      </div>

      {isCustom && (
        <p className="mb-5 rounded-xl bg-amber-500/15 px-4 py-2.5 text-center text-sm text-amber-200">
          该对阵不在当前赛程数据中，以下为模拟预测。
        </p>
      )}

      {/* 胜平负 */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
        胜平负概率
      </p>
      <ProbabilityBar
        nameA={nameA}
        nameB={nameB}
        a={prediction.teamAWinProbability}
        draw={prediction.drawProbability}
        b={prediction.teamBWinProbability}
      />

      {/* 预期进球 */}
      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
        预期进球
      </p>
      <ExpectedGoals
        nameA={nameA}
        nameB={nameB}
        flagA={flagA}
        flagB={flagB}
        egA={prediction.expectedGoalsA}
        egB={prediction.expectedGoalsB}
      />

      {/* Top 3 比分 */}
      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
        最可能比分（Top 3）
      </p>
      <TopScores nameA={nameA} nameB={nameB} scores={prediction.topScores} />

      {/* 可信度 */}
      <div className="mt-6">
        <ConfidenceBadge confidence={prediction.confidence} />
      </div>

      {/* 预测分析 */}
      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
        预测分析
      </p>
      <p className="rounded-xl bg-black/20 p-4 text-sm leading-relaxed text-slate-200">
        {prediction.analysis}
      </p>
    </div>
  )
}
