import type { Team } from '../types/team'
import type { PredictedScore, PredictionResult } from '../types/prediction'

// 东道主（美/加/墨）享有主场加成。
const HOST_CODES = ['USA', 'CAN', 'MEX']
const HOME_ADVANTAGE = 0.15
const BASE_GOALS = 1.25
const MAX_GOALS = 5 // 比分矩阵 0..5
const MIN_XG = 0.2
const MAX_XG = 3.2

/** 综合战力：六项加权求和。 */
export function teamStrength(t: Team): number {
  return (
    t.overall * 0.35 +
    t.attack * 0.2 +
    t.defense * 0.2 +
    t.form * 0.15 +
    t.worldCupExperience * 0.05 +
    t.consistency * 0.05
  )
}

function clampXg(x: number): number {
  return Math.min(MAX_XG, Math.max(MIN_XG, x))
}

function round2(x: number): number {
  return Math.round(x * 100) / 100
}

function factorial(n: number): number {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}

/** 泊松分布：P(k; λ) = λ^k * e^(-λ) / k! */
export function poissonProbability(lambda: number, goals: number): number {
  return (Math.pow(lambda, goals) * Math.exp(-lambda)) / factorial(goals)
}

/** 计算某队对阵某队的预期进球（已做上下限裁剪并保留两位小数）。 */
export function expectedGoals(scorer: Team, opponent: Team): number {
  const homeAdv = HOST_CODES.includes(scorer.code) ? HOME_ADVANTAGE : 0
  const xg =
    BASE_GOALS +
    (scorer.attack - 75) * 0.025 -
    (opponent.defense - 75) * 0.018 +
    (scorer.form - 75) * 0.012 +
    homeAdv
  return round2(clampXg(xg))
}

/**
 * 主预测函数：预期进球 + 泊松分布 + 比分矩阵汇总。
 * teamA / teamB 应已合并用户在界面上调整过的评分。
 */
export function predictMatch(teamA: Team, teamB: Team): PredictionResult {
  const egA = expectedGoals(teamA, teamB)
  const egB = expectedGoals(teamB, teamA)

  // 构建 0..5 比分概率矩阵
  const cells: PredictedScore[] = []
  let total = 0
  for (let a = 0; a <= MAX_GOALS; a++) {
    for (let b = 0; b <= MAX_GOALS; b++) {
      const p = poissonProbability(egA, a) * poissonProbability(egB, b)
      cells.push({ scoreA: a, scoreB: b, probability: p })
      total += p
    }
  }

  // 归一化，并汇总胜平负
  let rawA = 0
  let rawDraw = 0
  let rawB = 0
  for (const c of cells) {
    c.probability /= total
    if (c.scoreA > c.scoreB) rawA += c.probability
    else if (c.scoreA === c.scoreB) rawDraw += c.probability
    else rawB += c.probability
  }

  // 转为合计 100 的整数百分比
  let teamAWinProbability = Math.round(rawA * 100)
  let drawProbability = Math.round(rawDraw * 100)
  let teamBWinProbability = 100 - teamAWinProbability - drawProbability
  if (teamBWinProbability < 0) {
    drawProbability += teamBWinProbability
    teamBWinProbability = 0
  }

  // Top 3 最可能比分（概率转百分比整数）
  const topScores: PredictedScore[] = cells
    .slice()
    .sort((x, y) => y.probability - x.probability)
    .slice(0, 3)
    .map((c) => ({
      scoreA: c.scoreA,
      scoreB: c.scoreB,
      probability: Math.round(c.probability * 100),
    }))

  // 可信度：综合战力差距
  const diff = Math.abs(teamStrength(teamA) - teamStrength(teamB))
  const confidence: PredictionResult['confidence'] = diff < 5 ? '低' : diff <= 10 ? '中' : '高'

  const analysis = buildAnalysis({
    nameA: teamA.nameZh,
    nameB: teamB.nameZh,
    teamAWinProbability,
    drawProbability,
    teamBWinProbability,
    egA,
    egB,
    confidence,
  })

  return {
    teamAWinProbability,
    drawProbability,
    teamBWinProbability,
    expectedGoalsA: egA,
    expectedGoalsB: egB,
    topScores,
    confidence,
    analysis,
  }
}

function buildAnalysis(args: {
  nameA: string
  nameB: string
  teamAWinProbability: number
  drawProbability: number
  teamBWinProbability: number
  egA: number
  egB: number
  confidence: '低' | '中' | '高'
}): string {
  const { nameA, nameB, teamAWinProbability, drawProbability, teamBWinProbability, egA, egB, confidence } =
    args

  const favored =
    teamAWinProbability > teamBWinProbability
      ? nameA
      : teamBWinProbability > teamAWinProbability
        ? nameB
        : null

  let tendency: string
  if (confidence === '低') {
    tendency = '双方实力较为接近，模型认为比赛存在较高不确定性，平局和小比分结果都有可能出现。'
  } else if (confidence === '中') {
    tendency = '一方略占上风，但仍有爆冷空间，胜负可能取决于临场发挥与把握机会的效率。'
  } else {
    tendency = '纸面实力差距较为明显，不过足球比赛中意外时有发生，结果仍需以实际比赛为准。'
  }

  const lead = favored ? `${favored}相对更被看好。` : '双方旗鼓相当，胜负难料。'
  const xg = `预期进球约为 ${nameA} ${egA.toFixed(2)}、${nameB} ${egB.toFixed(2)}。`
  const probs = `模型胜平负概率：${nameA} ${teamAWinProbability}%、平局 ${drawProbability}%、${nameB} ${teamBWinProbability}%。`

  return `${lead}${xg}${probs}${tendency}`
}
