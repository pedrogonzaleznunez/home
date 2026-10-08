import { useLang } from '../i18n/LangContext'
import { AUTOMATA, RULE_IDS, type RuleId } from './automata'
import { lifeStore, useLife } from './store'

const btn =
  'cursor-pointer rounded-full border border-transparent bg-white/5 px-3 py-1.5 transition-colors hover:border-accent hover:text-accent'

export function LifeControls() {
  const { t } = useLang()
  const { rule, running, gen } = useLife()

  return (
    <div
      role="group"
      aria-label={t.life.label}
      data-no-life
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between gap-1.5 rounded-full border border-line bg-panel/85 py-1.5 pr-1.5 pl-4 font-mono text-xs text-muted backdrop-blur-md sm:left-auto sm:justify-start"
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
      <button type="button" className={`${btn} text-fg`} onClick={lifeStore.toggle}>
        {running ? t.life.pause : t.life.play}
      </button>
      <button type="button" className={`${btn} text-fg`} onClick={() => lifeStore.command('seed')}>
        {t.life.random}
      </button>
      <button type="button" className={`${btn} text-fg`} onClick={() => lifeStore.command('clear')}>
        {t.life.clear}
      </button>
    </div>
  )
}
