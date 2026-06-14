import { useEffect, useMemo, useRef, useState } from 'react'
import { TEAMS } from '../data/teams'
import type { Team } from '../data/teams'

interface SearchableTeamSelectProps {
  label: string
  value: string // 已选球队 id
  excludeId?: string // 不可选择的球队 id（对方球队）
  accent?: 'sky' | 'rose'
  onChange: (teamId: string) => void
}

const ACCENT = {
  sky: 'focus-within:border-sky-400 focus-within:ring-sky-400/40 border-sky-400/30',
  rose: 'focus-within:border-rose-400 focus-within:ring-rose-400/40 border-rose-400/30',
}

export default function SearchableTeamSelect({
  label,
  value,
  excludeId,
  accent = 'sky',
  onChange,
}: SearchableTeamSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = TEAMS.find((t) => t.id === value)

  // 点击组件外部时关闭下拉。
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 打开后自动聚焦搜索框。
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // 按 中文名 / 英文名 / 三字母代码 过滤，排除对方球队。
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEAMS.filter((t) => t.id !== excludeId).filter((t) => {
      if (!q) return true
      return (
        t.nameZh.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q)
      )
    })
  }, [query, excludeId])

  function handleSelect(team: Team) {
    onChange(team.id)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {/* 已选球队 / 触发按钮 */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 text-left outline-none transition ${ACCENT[accent]}`}
      >
        <span className="text-3xl" aria-hidden>
          {selected?.flag ?? '⚽'}
        </span>
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block truncate text-lg font-semibold text-white">
                {selected.nameZh}
                <span className="ml-2 text-sm font-normal text-slate-400">{selected.nameEn}</span>
              </span>
              <span className="text-xs text-slate-400">
                {selected.code} · {selected.group}组
              </span>
            </>
          ) : (
            <span className="text-slate-400">请选择球队</span>
          )}
        </span>
        <span className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {/* 下拉面板 */}
      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-pitch-dark shadow-2xl">
          <div className="border-b border-white/10 p-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索：中文 / English / 三字码（如 巴西 / Brazil / BRA）"
              className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <ul className="max-h-72 overflow-y-auto py-1">
            {results.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-slate-400">未找到球队</li>
            ) : (
              results.map((team) => {
                const isSelected = team.id === value
                return (
                  <li key={team.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(team)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-white/10 ${
                        isSelected ? 'bg-white/5' : ''
                      }`}
                    >
                      <span className="text-2xl" aria-hidden>
                        {team.flag}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white">
                          {team.nameZh}
                          <span className="ml-2 font-normal text-slate-400">{team.nameEn}</span>
                        </span>
                      </span>
                      <span className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-300">
                        {team.code} · {team.group}组
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
