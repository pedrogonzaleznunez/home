import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { AUTOMATA, RULE_IDS, type RuleId } from './automata'
import { lifeStore, useLife } from './store'
import { PALETTES, PALETTE_IDS, rgb, type Palette } from './palettes'

const btn =
  'cursor-pointer rounded-full border border-transparent bg-white/5 px-3 py-1.5 transition-colors hover:border-accent hover:text-accent'

const swatch = (p: Palette) => `linear-gradient(135deg, ${rgb(p.young)}, ${rgb(p.old)})`

// Botón "color" que abre un panel con las paletas encima de la barra
function ColorPicker() {
  const { t } = useLang()
  const { palette } = useLife()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current!.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${t.life.color}: ${PALETTES[palette].name}`}
        onClick={() => setOpen((o) => !o)}
        className={`${btn} flex items-center gap-2 px-2 text-fg sm:px-3 ${open ? 'border-accent text-accent' : ''}`}
      >
        <span aria-hidden="true" className="size-3.5 rounded-full" style={{ background: swatch(PALETTES[palette]) }} />
        <span className="hidden sm:inline">{t.life.color}</span>
      </button>
      {open && (
        <div
          role="radiogroup"
          aria-label={t.life.color}
          className="absolute bottom-full left-1/2 mb-3 flex -translate-x-1/2 gap-2.5 rounded-full border border-line bg-panel/95 p-2.5 backdrop-blur-md"
        >
          {PALETTE_IDS.map((id) => {
            const p = PALETTES[id]
            const active = id === palette
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={p.name}
                title={p.name}
                onClick={() => lifeStore.setPalette(id)}
                style={{ background: swatch(p) }}
                className={`size-7 cursor-pointer rounded-full transition-transform hover:scale-110 sm:size-6 ${
                  active ? 'ring-2 ring-fg/80 ring-offset-2 ring-offset-panel' : 'opacity-70 hover:opacity-100'
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export function LifeControls() {
  const { t } = useLang()
  const { rule, running } = useLife()

  return (
    <div
      role="group"
      aria-label={t.life.label}
      data-no-life
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between gap-1.5 rounded-full border border-line bg-panel/85 p-1.5 font-mono text-xs text-muted backdrop-blur-md sm:left-auto sm:justify-start"
    >
      <select
        aria-label={t.life.rule}
        value={rule}
        onChange={(e) => lifeStore.setRule(e.target.value as RuleId)}
        className={`${btn} appearance-none text-fg outline-none`}
      >
        {RULE_IDS.map((id) => (
          <option key={id} value={id} className="bg-panel text-fg">
            {AUTOMATA[id].name}
          </option>
        ))}
      </select>
      <ColorPicker />
      <button type="button" className={`${btn} text-fg`} onClick={lifeStore.toggle}>
        {running ? t.life.pause : t.life.play}
      </button>
      <button type="button" className={`${btn} text-fg`} onClick={() => lifeStore.command('seed')}>
        {t.life.random}
      </button>
      <button type="button" className={`${btn} hidden text-fg sm:inline-block`} onClick={() => lifeStore.command('clear')}>
        {t.life.clear}
      </button>
    </div>
  )
}
