import { useMemo, useState } from 'react'
import { TEAMS, ratingsOf } from './data/teams'
import { findFixtureByTeams } from './data/fixtures'
import type { Ratings, Team } from './types/team'
import type { PredictionResult, ReviewResult } from './types/prediction'
import { predictMatch } from './utils/predict'
import { reviewPrediction, saveSnapshot, loadSnapshot, flipPrediction } from './utils/review'
import SearchableTeamSelect from './components/SearchableTeamSelect'
import RatingEditor from './components/RatingEditor'
import PredictionResultView from './components/PredictionResult'
import ReviewPanel from './components/ReviewPanel'

type ViewState =
  | { kind: 'prediction'; teamA: Team; teamB: Team; prediction: PredictionResult; isCustom: boolean }
  | {
      kind: 'completed'
      teamA: Team
      teamB: Team
      actualScoreA: number
      actualScoreB: number
      group: string
      date: string
      prediction: PredictionResult
      review: ReviewResult
      usedSnapshot: boolean
    }

export default function App() {
  // 初始为空：未选择任何球队
  const [idA, setIdA] = useState('')
  const [idB, setIdB] = useState('')

  const teamA = useMemo(() => TEAMS.find((t) => t.id === idA), [idA])
  const teamB = useMemo(() => TEAMS.find((t) => t.id === idB), [idB])

  // 可编辑评分（未选择球队时为 null）
  const [ratingsA, setRatingsA] = useState<Ratings | null>(null)
  const [ratingsB, setRatingsB] = useState<Ratings | null>(null)

  const [view, setView] = useState<ViewState | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleSelectA(id: string) {
    setIdA(id)
    setRatingsA(ratingsOf(TEAMS.find((t) => t.id === id)!))
    setView(null)
    setError(null)
  }

  function handleSelectB(id: string) {
    setIdB(id)
    setRatingsB(ratingsOf(TEAMS.find((t) => t.id === id)!))
    setView(null)
    setError(null)
  }

  // 合并界面上调整过的评分（按 id 匹配）。
  function mergeRatings(team: Team): Team {
    if (team.id === idA && ratingsA) return { ...team, ...ratingsA }
    if (team.id === idB && ratingsB) return { ...team, ...ratingsB }
    return team
  }

  function handlePredict() {
    // 校验：必须选择两支不同球队
    if (!teamA || !teamB) {
      setView(null)
      setError('请先选择两支不同的球队')
      return
    }
    if (teamA.id === teamB.id) {
      setView(null)
      setError('请选择两支不同的球队')
      return
    }
    setError(null)

    const fixture = findFixtureByTeams(teamA.code, teamB.code)

    // 始终以用户选择的朝向构建球队对象
    const ta = mergeRatings(teamA)
    const tb = mergeRatings(teamB)

    // —— 情况 C：已完赛 → 复盘模式 ——
    if (fixture && fixture.status === 'completed') {
      // 把赛程真实比分对齐到用户选择的朝向
      const reversed = fixture.teamA !== ta.code
      const actualScoreA = reversed ? fixture.actualScoreB ?? 0 : fixture.actualScoreA ?? 0
      const actualScoreB = reversed ? fixture.actualScoreA ?? 0 : fixture.actualScoreB ?? 0

      // 优先使用赛前快照（按用户朝向对齐），否则当前模型回测
      const snap = loadSnapshot(fixture.id)
      let prediction: PredictionResult
      let usedSnapshot = false
      if (snap) {
        prediction = snap.teamA === ta.code ? snap.prediction : flipPrediction(snap.prediction)
        usedSnapshot = true
      } else {
        prediction = predictMatch(ta, tb)
      }

      const review = reviewPrediction(prediction, actualScoreA, actualScoreB, ta, tb)

      setView({
        kind: 'completed',
        teamA: ta,
        teamB: tb,
        actualScoreA,
        actualScoreB,
        group: fixture.group,
        date: fixture.date,
        prediction,
        review,
        usedSnapshot,
      })
      return
    }

    // —— 情况 A / B：未开赛 或 自定义 → 预测模式 ——
    const prediction = predictMatch(ta, tb)

    if (fixture && fixture.status === 'scheduled') {
      saveSnapshot({
        fixtureId: fixture.id,
        teamA: ta.code,
        teamB: tb.code,
        predictedAt: new Date().toISOString(),
        prediction,
      })
    }

    setView({ kind: 'prediction', teamA: ta, teamB: tb, prediction, isCustom: !fixture })
  }

  function handleReset() {
    setIdA('')
    setIdB('')
    setRatingsA(null)
    setRatingsB(null)
    setView(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pitch-dark via-pitch to-pitch-dark">
      {/* 球场草皮纹理 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0, #fff 2px, transparent 2px, transparent 80px)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:py-14">
        {/* 页头 */}
        <header className="mb-10 text-center">
          <div className="mb-3 text-5xl" aria-hidden>
            ⚽🏆
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">2026 世界杯预测器</h1>
          <p className="mt-3 text-slate-300">
            选择两支球队，调整实力评分，获取预期进球与泊松比分预测；已完赛比赛将展示真实赛果与赛后复盘。
          </p>
        </header>

        {/* 对阵卡片 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 球队 A */}
          <section className="rounded-2xl border border-sky-400/20 bg-white/5 p-5 shadow-lg backdrop-blur sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-200">
                Team A
              </span>
              {teamA && (
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-300">
                  Group {teamA.group} / {teamA.group}组
                </span>
              )}
            </div>
            <SearchableTeamSelect
              label="选择球队"
              value={idA}
              excludeId={idB}
              accent="sky"
              onChange={handleSelectA}
            />
            <div className="mt-6">
              {teamA && ratingsA ? (
                <RatingEditor ratings={ratingsA} accent="text-sky-300" onChange={setRatingsA} />
              ) : (
                <p className="text-sm text-slate-500">选择球队后可调整评分</p>
              )}
            </div>
          </section>

          {/* 球队 B */}
          <section className="rounded-2xl border border-rose-400/20 bg-white/5 p-5 shadow-lg backdrop-blur sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">
                Team B
              </span>
              {teamB && (
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-300">
                  Group {teamB.group} / {teamB.group}组
                </span>
              )}
            </div>
            <SearchableTeamSelect
              label="选择球队"
              value={idB}
              excludeId={idA}
              accent="rose"
              onChange={handleSelectB}
            />
            <div className="mt-6">
              {teamB && ratingsB ? (
                <RatingEditor ratings={ratingsB} accent="text-rose-300" onChange={setRatingsB} />
              ) : (
                <p className="text-sm text-slate-500">选择球队后可调整评分</p>
              )}
            </div>
          </section>
        </div>

        {/* 操作按钮 */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={handlePredict}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-lg font-bold text-pitch-dark shadow-lg transition hover:scale-[1.03] hover:bg-yellow-300 active:scale-95 sm:w-auto"
          >
            ⚡ 开始预测
          </button>
          <button
            onClick={handleReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-slate-200 transition hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            ↺ 重置
          </button>
        </div>

        {/* 结果区域 */}
        {!view && (
          <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
            {error ? (
              <span className="text-base font-medium text-amber-300">{error}</span>
            ) : (
              <span className="text-base text-slate-300">请选择两支球队，开始预测比赛结果</span>
            )}
          </div>
        )}

        {view?.kind === 'prediction' && (
          <PredictionResultView
            teamA={view.teamA}
            teamB={view.teamB}
            prediction={view.prediction}
            isCustom={view.isCustom}
          />
        )}
        {view?.kind === 'completed' && (
          <ReviewPanel
            teamA={view.teamA}
            teamB={view.teamB}
            actualScoreA={view.actualScoreA}
            actualScoreB={view.actualScoreB}
            group={view.group}
            date={view.date}
            prediction={view.prediction}
            review={view.review}
            usedSnapshot={view.usedSnapshot}
          />
        )}

        {/* 页脚免责声明 */}
        <footer className="mt-14 text-center text-xs leading-relaxed text-slate-400">
          本工具为学习和娱乐项目。预测结果基于简化评分模型，不代表真实比赛结果。已完赛比赛会优先显示真实赛果，赛后复盘仅用于模型效果分析。⚽
        </footer>
      </div>
    </div>
  )
}
