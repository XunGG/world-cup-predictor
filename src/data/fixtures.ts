import type { Fixture } from '../types/match'

// 赛程数据（模拟）。已完赛比赛带有真实赛果。
export const FIXTURES: Fixture[] = [
  // ===== 已完赛 =====
  // A 组
  { id: 'mex-rsa-2026', group: 'A', teamA: 'MEX', teamB: 'RSA', status: 'completed', actualScoreA: 2, actualScoreB: 0, date: '2026-06-11' },
  { id: 'kor-cze-2026', group: 'A', teamA: 'KOR', teamB: 'CZE', status: 'completed', actualScoreA: 2, actualScoreB: 1, date: '2026-06-11' },
  // B 组
  { id: 'can-bih-2026', group: 'B', teamA: 'CAN', teamB: 'BIH', status: 'completed', actualScoreA: 1, actualScoreB: 1, date: '2026-06-12' },
  { id: 'qat-sui-2026', group: 'B', teamA: 'QAT', teamB: 'SUI', status: 'completed', actualScoreA: 1, actualScoreB: 1, date: '2026-06-13' },
  // C 组
  { id: 'bra-mar-2026', group: 'C', teamA: 'BRA', teamB: 'MAR', status: 'completed', actualScoreA: 1, actualScoreB: 1, date: '2026-06-13' },
  { id: 'hti-sco-2026', group: 'C', teamA: 'HTI', teamB: 'SCO', status: 'completed', actualScoreA: 0, actualScoreB: 1, date: '2026-06-13' },
  // D 组
  { id: 'usa-par-2026', group: 'D', teamA: 'USA', teamB: 'PAR', status: 'completed', actualScoreA: 4, actualScoreB: 1, date: '2026-06-12' },
  { id: 'aus-tur-2026', group: 'D', teamA: 'AUS', teamB: 'TUR', status: 'completed', actualScoreA: 2, actualScoreB: 0, date: '2026-06-14' },

  // ===== 未开赛（可用于体验赛前预测快照保存）=====
  { id: 'esp-uru-2026', group: 'H', teamA: 'ESP', teamB: 'URU', status: 'scheduled', date: '2026-06-17' },
  { id: 'fra-sen-2026', group: 'I', teamA: 'FRA', teamB: 'SEN', status: 'scheduled', date: '2026-06-18' },
  { id: 'eng-cro-2026', group: 'L', teamA: 'ENG', teamB: 'CRO', status: 'scheduled', date: '2026-06-19' },
  { id: 'ger-ecu-2026', group: 'E', teamA: 'GER', teamB: 'ECU', status: 'scheduled', date: '2026-06-20' },
]

/**
 * 按两支球队的三字母代码查找赛程，支持双向匹配（不区分主客顺序）。
 * 返回的 Fixture 仍保留其原始 teamA / teamB 朝向（真实赛果与之对应）。
 */
export function findFixtureByTeams(teamCodeA: string, teamCodeB: string): Fixture | undefined {
  return FIXTURES.find(
    (f) =>
      (f.teamA === teamCodeA && f.teamB === teamCodeB) ||
      (f.teamA === teamCodeB && f.teamB === teamCodeA),
  )
}

// 兼容旧调用名
export const findFixture = findFixtureByTeams
