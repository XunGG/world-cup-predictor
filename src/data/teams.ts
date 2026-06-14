export interface Ratings {
  overall: number // 综合实力 0-100
  attack: number // 进攻能力 0-100
  defense: number // 防守能力 0-100
  form: number // 近期状态 0-100
}

export interface Team {
  id: string
  name: string
  flag: string // emoji flag
  ratings: Ratings
}

// Default ratings are rough, illustrative values — feel free to tweak.
export const TEAMS: Team[] = [
  { id: 'arg', name: 'Argentina', flag: '🇦🇷', ratings: { overall: 92, attack: 90, defense: 86, form: 91 } },
  { id: 'fra', name: 'France', flag: '🇫🇷', ratings: { overall: 91, attack: 92, defense: 85, form: 88 } },
  { id: 'bra', name: 'Brazil', flag: '🇧🇷', ratings: { overall: 90, attack: 91, defense: 84, form: 85 } },
  { id: 'eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ratings: { overall: 89, attack: 87, defense: 85, form: 86 } },
  { id: 'esp', name: 'Spain', flag: '🇪🇸', ratings: { overall: 89, attack: 88, defense: 84, form: 90 } },
  { id: 'por', name: 'Portugal', flag: '🇵🇹', ratings: { overall: 88, attack: 89, defense: 82, form: 87 } },
  { id: 'ned', name: 'Netherlands', flag: '🇳🇱', ratings: { overall: 87, attack: 85, defense: 84, form: 83 } },
  { id: 'ger', name: 'Germany', flag: '🇩🇪', ratings: { overall: 87, attack: 86, defense: 83, form: 82 } },
  { id: 'bel', name: 'Belgium', flag: '🇧🇪', ratings: { overall: 85, attack: 86, defense: 80, form: 79 } },
  { id: 'ita', name: 'Italy', flag: '🇮🇹', ratings: { overall: 85, attack: 81, defense: 88, form: 81 } },
  { id: 'cro', name: 'Croatia', flag: '🇭🇷', ratings: { overall: 84, attack: 80, defense: 82, form: 80 } },
  { id: 'uru', name: 'Uruguay', flag: '🇺🇾', ratings: { overall: 84, attack: 84, defense: 81, form: 84 } },
  { id: 'mar', name: 'Morocco', flag: '🇲🇦', ratings: { overall: 82, attack: 78, defense: 85, form: 83 } },
  { id: 'usa', name: 'USA', flag: '🇺🇸', ratings: { overall: 80, attack: 79, defense: 78, form: 80 } },
  { id: 'mex', name: 'Mexico', flag: '🇲🇽', ratings: { overall: 80, attack: 80, defense: 77, form: 78 } },
  { id: 'jpn', name: 'Japan', flag: '🇯🇵', ratings: { overall: 81, attack: 80, defense: 79, form: 84 } },
  { id: 'kor', name: 'South Korea', flag: '🇰🇷', ratings: { overall: 79, attack: 80, defense: 75, form: 79 } },
  { id: 'sen', name: 'Senegal', flag: '🇸🇳', ratings: { overall: 80, attack: 79, defense: 79, form: 78 } },
  { id: 'sui', name: 'Switzerland', flag: '🇨🇭', ratings: { overall: 80, attack: 77, defense: 81, form: 77 } },
  { id: 'den', name: 'Denmark', flag: '🇩🇰', ratings: { overall: 81, attack: 80, defense: 80, form: 79 } },
]
