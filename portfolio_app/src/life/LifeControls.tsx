import { useLang } from '../i18n/LangContext'
import { AUTOMATA, RULE_IDS, type RuleId } from './automata'
import { lifeStore, useLife } from './store'
import { PALETTES, PALETTE_IDS, rgb, type Palette } from './palettes'

const btn =
  'cursor-pointer rounded-full border border-transparent bg-white/5 px-3 py-1.5 transition-colors hover:border-accent hover:text-accent'

const swatch = (p: Palette) => `linear-gradient(135deg, ${rgb(p.young)}, ${rgb(p.old)})`

export function LifeControls() {
  const { t } = useLang()
  const { rule, palette, running, gen } = useLife()
  const current = PALETTES[palette]
  const nextPalette = () =>
    lifeStore.setPalette(PALETTE_IDS[(PALETTE_IDS.indexOf(palette) + 1) % PALETTE_IDS.length])

  return (
    <div
      role="group"
      aria-label={t.life.label}
      data-no-life
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between gap-1.5 rounded-full border border-line bg-panel/85 p-1.5 font-mono text-xs text-muted backdrop-blur-md sm:left-auto sm:justify-start sm:pl-4"
    >
      <span className="hidden sm:inline">
        {t.life.gen} <b className="inline-block min-w-[5ch] font-semibold text-accent">{gen}</b>
      </span>
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
      {/* Mobile: un solo círculo que rota entre paletas para que la barra entre en una fila */}
      <button
        type="button"
        aria-label={`${t.life.color}: ${current.name}`}
        onClick={nextPalette}
        style={{ background: swatch(current) }}
        className="size-7 shrink-0 cursor-pointer rounded-full ring-2 ring-fg/80 ring-offset-2 ring-offset-panel sm:hidden"
      />
      <div role="radiogroup" aria-label={t.life.color} className="hidden items-center gap-1 px-1 sm:flex">
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
              className={`size-4 cursor-pointer rounded-full transition-transform hover:scale-110 ${
                active ? 'ring-2 ring-fg/80 ring-offset-2 ring-offset-panel' : 'opacity-60 hover:opacity-100'
              }`}
            />
          )
        })}
      </div>
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
