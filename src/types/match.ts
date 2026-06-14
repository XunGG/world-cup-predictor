// 赛程 / 比赛类型定义

export type MatchStatus = 'scheduled' | 'completed'

export interface Fixture {
  id: string
  group: string
  teamA: string // 三字母代码
  teamB: string // 三字母代码
  status: MatchStatus
  actualScoreA?: number // 真实赛果（已完赛）
  actualScoreB?: number
  date: string // YYYY-MM-DD
}
