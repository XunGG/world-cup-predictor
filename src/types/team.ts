// 球队相关类型定义

export interface Ratings {
  overall: number // 综合实力 0-100
  attack: number // 进攻能力 0-100
  defense: number // 防守能力 0-100
  form: number // 近期状态 0-100
}

export interface Team {
  id: string
  nameZh: string // 中文名
  nameEn: string // 英文名
  code: string // 三字母代码
  group: string // 小组 A-L
  flag: string // 国旗 emoji
  overall: number
  attack: number
  defense: number
  form: number
  worldCupExperience: number // 世界杯经验 0-100
  consistency: number // 稳定性 0-100
}
