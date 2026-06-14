import type { Team } from '../types/team'
import type {
  Outcome,
  PredictedScore,
  PredictionResult,
  PredictionSnapshot,
  ReviewResult,
} from '../types/prediction'

/** 判断真实赛果方向。 */
function outcomeOf(scoreA: number, scoreB: number): Outcome {
  if (scoreA > scoreB) return 'teamA'
  if (scoreA === scoreB) return 'draw'
  return 'teamB'
}

/** 取胜平负概率最高的一项作为模型预测方向。 */
function predictedOutcomeOf(p: PredictionResult): Outcome {
  const { teamAWinProbability: a, drawProbability: d, teamBWinProbability: b } = p
  if (a >= d && a >= b) return 'teamA'
  if (b >= a && b >= d) return 'teamB'
  return 'draw'
}

/**
 * 赛后复盘：对比模型预测与真实赛果。
 */
export function reviewPrediction(
  prediction: PredictionResult,
  actualScoreA: number,
  actualScoreB: number,
  teamA: Team,
  teamB: Team,
): ReviewResult {
  const actualOutcome = outcomeOf(actualScoreA, actualScoreB)
  const predictedOutcome = predictedOutcomeOf(prediction)
  const directionCorrect = actualOutcome === predictedOutcome

  const top1 = prediction.topScores[0]
  const exactScoreCorrect =
    prediction.topScores.some(
      (s) => s.scoreA === actualScoreA && s.scoreB === actualScoreB,
    ) || (top1.scoreA === actualScoreA && top1.scoreB === actualScoreB)

  const goalDifferenceError = Math.abs(
    top1.scoreA - top1.scoreB - (actualScoreA - actualScoreB),
  )
  const totalGoalsError = Math.abs(
    top1.scoreA + top1.scoreB - (actualScoreA + actualScoreB),
  )

  // 在 Top 3 中找出与真实比分最接近的一个
  const closestPredictedScore: PredictedScore = prediction.topScores
    .slice()
    .sort((x, y) => {
      const dx = Math.abs(x.scoreA - actualScoreA) + Math.abs(x.scoreB - actualScoreB)
      const dy = Math.abs(y.scoreA - actualScoreA) + Math.abs(y.scoreB - actualScoreB)
      return dx - dy || y.probability - x.probability
    })[0]

  const reviewLevel: ReviewResult['reviewLevel'] = exactScoreCorrect
    ? '命中'
    : directionCorrect
      ? '方向正确'
      : '偏差较大'

  const reviewText = buildReviewText({
    actualOutcome,
    predictedOutcome,
    directionCorrect,
    exactScoreCorrect,
    teamA,
    teamB,
  })

  return {
    actualOutcome,
    predictedOutcome,
    directionCorrect,
    exactScoreCorrect,
    goalDifferenceError,
    totalGoalsError,
    closestPredictedScore,
    reviewLevel,
    reviewText,
  }
}

function buildReviewText(args: {
  actualOutcome: Outcome
  predictedOutcome: Outcome
  directionCorrect: boolean
  exactScoreCorrect: boolean
  teamA: Team
  teamB: Team
}): string {
  const { actualOutcome, predictedOutcome, directionCorrect, exactScoreCorrect, teamA, teamB } = args

  if (exactScoreCorrect) {
    return '模型命中了真实比分，预测结果与实际赛果高度一致。当然，这只是一个简化模型的娱乐性结果，仅供参考。'
  }

  if (directionCorrect) {
    return '模型对胜负方向的判断是正确的，虽然没有完全命中比分，但对比赛走势的把握较为接近。'
  }

  // 方向判断错误的几种情况
  if (predictedOutcome === 'draw' && actualOutcome !== 'draw') {
    const realWinner = actualOutcome === 'teamA' ? teamA.nameZh : teamB.nameZh
    return `模型对平局概率的估计偏高，实际比赛中${realWinner}取胜，分差比模型预期更明显。`
  }

  if (actualOutcome === 'draw' && predictedOutcome !== 'draw') {
    return '模型低估了双方打平的可能，最终两队战平，说明比赛的均势程度超出了模型预期。'
  }

  // 预测错了赢家
  const realWinner = actualOutcome === 'teamA' ? teamA.nameZh : teamB.nameZh
  const realLoser = actualOutcome === 'teamA' ? teamB.nameZh : teamA.nameZh
  return `模型方向判断错误，可能低估了${realWinner}的防守稳定性，也高估了${realLoser}的进攻转化率。作为学习与娱乐项目，这类偏差也是改进模型的参考。`
}

// ============ localStorage 预测快照 ============

function snapshotKey(fixtureId: string): string {
  return `prediction_snapshot_${fixtureId}`
}

/** 保存赛前预测快照（失败时静默忽略，不影响页面）。 */
export function saveSnapshot(snapshot: PredictionSnapshot): void {
  try {
    localStorage.setItem(snapshotKey(snapshot.fixtureId), JSON.stringify(snapshot))
  } catch {
    // localStorage 不可用时忽略
  }
}

/** 读取赛前预测快照，不存在或出错时返回 null。 */
export function loadSnapshot(fixtureId: string): PredictionSnapshot | null {
  try {
    const raw = localStorage.getItem(snapshotKey(fixtureId))
    if (!raw) return null
    return JSON.parse(raw) as PredictionSnapshot
  } catch {
    return null
  }
}

/** 将一份预测结果的 A/B 朝向对调（用于快照朝向与赛程朝向不一致时）。 */
export function flipPrediction(p: PredictionResult): PredictionResult {
  return {
    ...p,
    teamAWinProbability: p.teamBWinProbability,
    teamBWinProbability: p.teamAWinProbability,
    expectedGoalsA: p.expectedGoalsB,
    expectedGoalsB: p.expectedGoalsA,
    topScores: p.topScores.map((s) => ({
      scoreA: s.scoreB,
      scoreB: s.scoreA,
      probability: s.probability,
    })),
  }
}
