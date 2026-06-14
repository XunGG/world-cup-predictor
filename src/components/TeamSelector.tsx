import { TEAMS } from '../data/teams'

interface TeamSelectorProps {
  label: string
  value: string // selected team id
  disabledId?: string // id that can't be picked (the other team)
  onChange: (teamId: string) => void
}

export default function TeamSelector({ label, value, disabledId, onChange }: TeamSelectorProps) {
  const selected = TEAMS.find((t) => t.id === value)

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden>
          {selected?.flag ?? '⚽'}
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-semibold text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
        >
          {TEAMS.map((team) => (
            <option
              key={team.id}
              value={team.id}
              disabled={team.id === disabledId}
              className="bg-pitch-dark text-white"
            >
              {team.flag} {team.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
