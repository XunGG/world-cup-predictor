// 预测与复盘类型定义

export type Outcome = 'teamA' | 'draw' | 'teamB'

export interface PredictedScore {
  scoreA: number
  scoreB: number
  probability: number // 百分比，例如 11 表示 11%
}

export interface PredictionResult {
  teamAWinProbability: number
  drawProbability: number
  teamBWinProbability: number
  expectedGoalsA: number
  expectedGoalsB: number
  topScores: PredictedScore[]
  confidence: '低' | '中' | '高'
  analysis: string
}

export interface ReviewResult {
  actualOutcome: Outcome
  predictedOutcome: Outcome
  directionCorrect: boolean
  exactScoreCorrect: boolean
  goalDifferenceError: number
  totalGoalsError: number
  closestPredictedScore: PredictedScore
  reviewLevel: '命中' | '方向正确' | '偏差较大'
  reviewText: string
}

// 赛前预测快照（保存在 localStorage）
export interface PredictionSnapshot {
  fixtureId: string
  teamA: string // 三字母代码
  teamB: string // 三字母代码
  predictedAt: string // ISO 时间
  prediction: PredictionResult
}
