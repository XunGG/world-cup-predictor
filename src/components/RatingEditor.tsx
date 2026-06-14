import type { Ratings } from '../data/teams'

interface RatingEditorProps {
  ratings: Ratings
  accent: string // 数值文字的 tailwind 颜色类，如 'text-sky-300'
  onChange: (ratings: Ratings) => void
}

const FIELDS: { key: keyof Ratings; label: string }[] = [
  { key: 'overall', label: '综合实力' },
  { key: 'attack', label: '进攻能力' },
  { key: 'defense', label: '防守能力' },
  { key: 'form', label: '近期状态' },
]

export default function RatingEditor({ ratings, accent, onChange }: RatingEditorProps) {
  function update(key: keyof Ratings, value: number) {
    onChange({ ...ratings, [key]: value })
  }

  return (
    <div className="space-y-4">
      {FIELDS.map(({ key, label }) => (
        <div key={key}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-200">{label}</span>
            <span className={`font-bold tabular-nums ${accent}`}>{ratings[key]}</span>
          </div>
          <input
            type="range"
            min={40}
            max={99}
            value={ratings[key]}
            onChange={(e) => update(key, Number(e.target.value))}
            aria-label={label}
          />
        </div>
      ))}
    </div>
  )
}
