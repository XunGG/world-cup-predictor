import type { Ratings, Team } from '../types/team'

// 重新导出类型，保持对现有 import 路径的兼容。
export type { Ratings, Team } from '../types/team'

/** 从球队对象中提取四项可调评分。 */
export function ratingsOf(team: Pick<Team, 'overall' | 'attack' | 'defense' | 'form'>): Ratings {
  return {
    overall: team.overall,
    attack: team.attack,
    defense: team.defense,
    form: team.form,
  }
}

// 2026 美加墨世界杯 48 支参赛球队（A-L 共 12 组）。
// 评分为模拟值，仅用于演示：传统强队偏高、弱队偏低，稳定型球队 consistency 略高。
// 字段：overall 综合 / attack 进攻 / defense 防守 / form 状态 /
//       worldCupExperience 世界杯经验 / consistency 稳定性
export const TEAMS: Team[] = [
  // ---------------- A 组 ----------------
  { id: 'mexico', nameZh: '墨西哥', nameEn: 'Mexico', code: 'MEX', group: 'A', flag: '🇲🇽', overall: 80, attack: 80, defense: 77, form: 78, worldCupExperience: 85, consistency: 78 },
  { id: 'south-africa', nameZh: '南非', nameEn: 'South Africa', code: 'RSA', group: 'A', flag: '🇿🇦', overall: 72, attack: 71, defense: 70, form: 73, worldCupExperience: 60, consistency: 66 },
  { id: 'south-korea', nameZh: '韩国', nameEn: 'South Korea', code: 'KOR', group: 'A', flag: '🇰🇷', overall: 79, attack: 80, defense: 75, form: 79, worldCupExperience: 78, consistency: 74 },
  { id: 'czechia', nameZh: '捷克', nameEn: 'Czechia', code: 'CZE', group: 'A', flag: '🇨🇿', overall: 78, attack: 77, defense: 77, form: 76, worldCupExperience: 70, consistency: 75 },

  // ---------------- B 组 ----------------
  { id: 'canada', nameZh: '加拿大', nameEn: 'Canada', code: 'CAN', group: 'B', flag: '🇨🇦', overall: 76, attack: 77, defense: 73, form: 76, worldCupExperience: 55, consistency: 70 },
  { id: 'bosnia', nameZh: '波黑', nameEn: 'Bosnia and Herzegovina', code: 'BIH', group: 'B', flag: '🇧🇦', overall: 75, attack: 76, defense: 73, form: 74, worldCupExperience: 58, consistency: 71 },
  { id: 'qatar', nameZh: '卡塔尔', nameEn: 'Qatar', code: 'QAT', group: 'B', flag: '🇶🇦', overall: 71, attack: 70, defense: 70, form: 71, worldCupExperience: 55, consistency: 70 },
  { id: 'switzerland', nameZh: '瑞士', nameEn: 'Switzerland', code: 'SUI', group: 'B', flag: '🇨🇭', overall: 80, attack: 77, defense: 81, form: 77, worldCupExperience: 80, consistency: 82 },

  // ---------------- C 组 ----------------
  { id: 'brazil', nameZh: '巴西', nameEn: 'Brazil', code: 'BRA', group: 'C', flag: '🇧🇷', overall: 90, attack: 90, defense: 85, form: 86, worldCupExperience: 98, consistency: 88 },
  { id: 'morocco', nameZh: '摩洛哥', nameEn: 'Morocco', code: 'MAR', group: 'C', flag: '🇲🇦', overall: 82, attack: 78, defense: 85, form: 83, worldCupExperience: 70, consistency: 80 },
  { id: 'haiti', nameZh: '海地', nameEn: 'Haiti', code: 'HTI', group: 'C', flag: '🇭🇹', overall: 68, attack: 68, defense: 65, form: 68, worldCupExperience: 45, consistency: 62 },
  { id: 'scotland', nameZh: '苏格兰', nameEn: 'Scotland', code: 'SCO', group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', overall: 76, attack: 75, defense: 75, form: 75, worldCupExperience: 62, consistency: 73 },

  // ---------------- D 组 ----------------
  { id: 'united-states', nameZh: '美国', nameEn: 'United States', code: 'USA', group: 'D', flag: '🇺🇸', overall: 80, attack: 79, defense: 78, form: 80, worldCupExperience: 72, consistency: 76 },
  { id: 'paraguay', nameZh: '巴拉圭', nameEn: 'Paraguay', code: 'PAR', group: 'D', flag: '🇵🇾', overall: 75, attack: 74, defense: 75, form: 74, worldCupExperience: 68, consistency: 73 },
  { id: 'australia', nameZh: '澳大利亚', nameEn: 'Australia', code: 'AUS', group: 'D', flag: '🇦🇺', overall: 76, attack: 74, defense: 76, form: 75, worldCupExperience: 70, consistency: 75 },
  { id: 'turkey', nameZh: '土耳其', nameEn: 'Turkey', code: 'TUR', group: 'D', flag: '🇹🇷', overall: 80, attack: 81, defense: 77, form: 80, worldCupExperience: 66, consistency: 72 },

  // ---------------- E 组 ----------------
  { id: 'germany', nameZh: '德国', nameEn: 'Germany', code: 'GER', group: 'E', flag: '🇩🇪', overall: 87, attack: 86, defense: 83, form: 82, worldCupExperience: 97, consistency: 86 },
  { id: 'curacao', nameZh: '库拉索', nameEn: 'Curacao', code: 'CUW', group: 'E', flag: '🇨🇼', overall: 67, attack: 66, defense: 65, form: 68, worldCupExperience: 40, consistency: 60 },
  { id: 'ivory-coast', nameZh: '科特迪瓦', nameEn: 'Ivory Coast', code: 'CIV', group: 'E', flag: '🇨🇮', overall: 78, attack: 78, defense: 76, form: 77, worldCupExperience: 64, consistency: 73 },
  { id: 'ecuador', nameZh: '厄瓜多尔', nameEn: 'Ecuador', code: 'ECU', group: 'E', flag: '🇪🇨', overall: 78, attack: 76, defense: 79, form: 77, worldCupExperience: 66, consistency: 75 },

  // ---------------- F 组 ----------------
  { id: 'netherlands', nameZh: '荷兰', nameEn: 'Netherlands', code: 'NED', group: 'F', flag: '🇳🇱', overall: 87, attack: 85, defense: 84, form: 83, worldCupExperience: 90, consistency: 84 },
  { id: 'japan', nameZh: '日本', nameEn: 'Japan', code: 'JPN', group: 'F', flag: '🇯🇵', overall: 81, attack: 80, defense: 79, form: 84, worldCupExperience: 76, consistency: 80 },
  { id: 'sweden', nameZh: '瑞典', nameEn: 'Sweden', code: 'SWE', group: 'F', flag: '🇸🇪', overall: 78, attack: 78, defense: 76, form: 76, worldCupExperience: 74, consistency: 76 },
  { id: 'tunisia', nameZh: '突尼斯', nameEn: 'Tunisia', code: 'TUN', group: 'F', flag: '🇹🇳', overall: 74, attack: 72, defense: 75, form: 73, worldCupExperience: 62, consistency: 72 },

  // ---------------- G 组 ----------------
  { id: 'belgium', nameZh: '比利时', nameEn: 'Belgium', code: 'BEL', group: 'G', flag: '🇧🇪', overall: 85, attack: 86, defense: 80, form: 79, worldCupExperience: 82, consistency: 79 },
  { id: 'egypt', nameZh: '埃及', nameEn: 'Egypt', code: 'EGY', group: 'G', flag: '🇪🇬', overall: 77, attack: 77, defense: 75, form: 76, worldCupExperience: 60, consistency: 72 },
  { id: 'iran', nameZh: '伊朗', nameEn: 'Iran', code: 'IRI', group: 'G', flag: '🇮🇷', overall: 76, attack: 75, defense: 76, form: 75, worldCupExperience: 66, consistency: 74 },
  { id: 'new-zealand', nameZh: '新西兰', nameEn: 'New Zealand', code: 'NZL', group: 'G', flag: '🇳🇿', overall: 70, attack: 69, defense: 69, form: 70, worldCupExperience: 50, consistency: 68 },

  // ---------------- H 组 ----------------
  { id: 'spain', nameZh: '西班牙', nameEn: 'Spain', code: 'ESP', group: 'H', flag: '🇪🇸', overall: 89, attack: 88, defense: 84, form: 90, worldCupExperience: 90, consistency: 85 },
  { id: 'cape-verde', nameZh: '佛得角', nameEn: 'Cape Verde', code: 'CPV', group: 'H', flag: '🇨🇻', overall: 70, attack: 70, defense: 68, form: 71, worldCupExperience: 42, consistency: 65 },
  { id: 'saudi-arabia', nameZh: '沙特阿拉伯', nameEn: 'Saudi Arabia', code: 'KSA', group: 'H', flag: '🇸🇦', overall: 72, attack: 71, defense: 71, form: 72, worldCupExperience: 60, consistency: 70 },
  { id: 'uruguay', nameZh: '乌拉圭', nameEn: 'Uruguay', code: 'URU', group: 'H', flag: '🇺🇾', overall: 84, attack: 84, defense: 81, form: 84, worldCupExperience: 88, consistency: 82 },

  // ---------------- I 组 ----------------
  { id: 'france', nameZh: '法国', nameEn: 'France', code: 'FRA', group: 'I', flag: '🇫🇷', overall: 91, attack: 92, defense: 85, form: 88, worldCupExperience: 92, consistency: 86 },
  { id: 'senegal', nameZh: '塞内加尔', nameEn: 'Senegal', code: 'SEN', group: 'I', flag: '🇸🇳', overall: 80, attack: 79, defense: 79, form: 78, worldCupExperience: 64, consistency: 76 },
  { id: 'iraq', nameZh: '伊拉克', nameEn: 'Iraq', code: 'IRQ', group: 'I', flag: '🇮🇶', overall: 70, attack: 69, defense: 70, form: 70, worldCupExperience: 52, consistency: 68 },
  { id: 'norway', nameZh: '挪威', nameEn: 'Norway', code: 'NOR', group: 'I', flag: '🇳🇴', overall: 81, attack: 84, defense: 76, form: 82, worldCupExperience: 55, consistency: 74 },

  // ---------------- J 组 ----------------
  { id: 'argentina', nameZh: '阿根廷', nameEn: 'Argentina', code: 'ARG', group: 'J', flag: '🇦🇷', overall: 92, attack: 90, defense: 86, form: 91, worldCupExperience: 96, consistency: 88 },
  { id: 'algeria', nameZh: '阿尔及利亚', nameEn: 'Algeria', code: 'DZA', group: 'J', flag: '🇩🇿', overall: 77, attack: 77, defense: 75, form: 76, worldCupExperience: 60, consistency: 72 },
  { id: 'austria', nameZh: '奥地利', nameEn: 'Austria', code: 'AUT', group: 'J', flag: '🇦🇹', overall: 79, attack: 78, defense: 78, form: 78, worldCupExperience: 64, consistency: 76 },
  { id: 'jordan', nameZh: '约旦', nameEn: 'Jordan', code: 'JOR', group: 'J', flag: '🇯🇴', overall: 70, attack: 69, defense: 70, form: 71, worldCupExperience: 45, consistency: 67 },

  // ---------------- K 组 ----------------
  { id: 'portugal', nameZh: '葡萄牙', nameEn: 'Portugal', code: 'POR', group: 'K', flag: '🇵🇹', overall: 88, attack: 89, defense: 82, form: 87, worldCupExperience: 86, consistency: 83 },
  { id: 'dr-congo', nameZh: '刚果民主共和国', nameEn: 'DR Congo', code: 'COD', group: 'K', flag: '🇨🇩', overall: 73, attack: 73, defense: 72, form: 73, worldCupExperience: 50, consistency: 70 },
  { id: 'uzbekistan', nameZh: '乌兹别克斯坦', nameEn: 'Uzbekistan', code: 'UZB', group: 'K', flag: '🇺🇿', overall: 72, attack: 71, defense: 72, form: 72, worldCupExperience: 46, consistency: 70 },
  { id: 'colombia', nameZh: '哥伦比亚', nameEn: 'Colombia', code: 'COL', group: 'K', flag: '🇨🇴', overall: 83, attack: 83, defense: 81, form: 83, worldCupExperience: 74, consistency: 80 },

  // ---------------- L 组 ----------------
  { id: 'england', nameZh: '英格兰', nameEn: 'England', code: 'ENG', group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', overall: 89, attack: 87, defense: 85, form: 86, worldCupExperience: 90, consistency: 84 },
  { id: 'croatia', nameZh: '克罗地亚', nameEn: 'Croatia', code: 'CRO', group: 'L', flag: '🇭🇷', overall: 84, attack: 80, defense: 82, form: 80, worldCupExperience: 80, consistency: 83 },
  { id: 'ghana', nameZh: '加纳', nameEn: 'Ghana', code: 'GHA', group: 'L', flag: '🇬🇭', overall: 76, attack: 76, defense: 74, form: 75, worldCupExperience: 64, consistency: 72 },
  { id: 'panama', nameZh: '巴拿马', nameEn: 'Panama', code: 'PAN', group: 'L', flag: '🇵🇦', overall: 71, attack: 70, defense: 71, form: 71, worldCupExperience: 48, consistency: 69 },
]

/** 按三字母代码查找球队。 */
export function teamByCode(code: string): Team | undefined {
  return TEAMS.find((t) => t.code === code)
}
