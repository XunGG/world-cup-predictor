import type { Ratings } from '../data/teams'

interface RatingEditorProps {
  ratings: Ratings
  accent: string // tailwind color class for the value text, e.g. 'text-sky-300'
  onChange: (ratings: Ratings) => void
}

const FIELDS: { key: keyof Ratings; label: string; cn: string }[] = [
  { key: 'overall', label: 'Overall', cn: '综合实力' },
  { key: 'attack', label: 'Attack', cn: '进攻' },
  { key: 'defense', label: 'Defense', cn: '防守' },
  { key: 'form', label: 'Form', cn: '近期状态' },
]

export default function RatingEditor({ ratings, accent, onChange }: RatingEditorProps) {
  function update(key: keyof Ratings, value: number) {
    onChange({ ...ratings, [key]: value })
  }

  return (
    <div className="space-y-4">
      {FIELDS.map(({ key, label, cn }) => (
        <div key={key}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-200">
              {label} <span className="text-slate-400">/ {cn}</span>
            </span>
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
