import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLang } from '../i18n/LangContext'
import { cvUrl, profile } from '../data/profile'
import { jobs } from '../data/experience'
import { skillGroups } from '../data/skills'
import { lifeStore } from '../life/store'
import { AUTOMATA, RULE_IDS, type RuleId } from '../life/automata'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'

type Line = { id: number; kind: 'in' | 'out'; body: ReactNode }

const COMMANDS = ['help', 'whoami', 'experience', 'skills', 'education', 'languages', 'contact', 'cv', 'life', 'lang', 'clear'] as const
const PROMPT = 'guest@pgn:~$'

let lineId = 0

export function Terminal() {
  const { t, lang, setLang } = useLang()
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight })
  }, [lines])

  const out = (body: ReactNode): Line => ({ id: lineId++, kind: 'out', body })

  function run(raw: string): Line[] | 'clear' {
    const [cmd, ...args] = raw.trim().split(/\s+/)
    const arg = args[0]?.toLowerCase()
    switch (cmd?.toLowerCase()) {
      case '':
      case undefined:
        return []
      case 'help':
        return [out(
          <div className="grid grid-cols-[auto_1fr] gap-x-6">
            {COMMANDS.map((c) => [
              <span key={c} className="text-accent">{c}</span>,
              <span key={c + '-d'} className="text-muted">{t.terminal.help[c]}</span>,
            ])}
          </div>,
        )]
      case 'whoami':
        return [out(<><span className="text-accent">{profile.name}</span> — {t.hero.roles.slice(0, 2).join(' · ')}{'\n'}{t.about.p1}</>)]
      case 'experience':
        return jobs.map((j) => {
          const e = t.exp.jobs[j.id]
          return out(<><span className="text-accent">▸ {e.role}</span> <span className="text-muted">@ {j.company} ({e.date})</span>{'\n'}  {j.tags.join(', ')}</>)
        })
      case 'skills':
        return skillGroups.map((g) => out(<><span className="text-accent">{t.skills.groups[g.id].padEnd(18)}</span>{g.items.join(', ')}</>))
      case 'education':
        return t.edu.items.map((e) => out(<><span className="text-accent">▸ {e.title}</span> <span className="text-muted">— {e.place} ({e.date})</span></>))
      case 'languages':
        return t.edu.languages.map((l) => out(<>{l.name.padEnd(10)}<span className="text-accent">{'█'.repeat(Math.round(l.pct / 10)).padEnd(10, '░')}</span> {l.level}</>))
      case 'contact':
        return [out(<>
          email     <a className="text-accent underline" href={`mailto:${profile.email}`}>{profile.email}</a>{'\n'}
          linkedin  <a className="text-accent underline" href={profile.linkedin} target="_blank" rel="noopener">{profile.linkedin}</a>{'\n'}
          github    <a className="text-accent underline" href={profile.github} target="_blank" rel="noopener">{profile.github}</a>
        </>)]
      case 'cv': {
        const a = document.createElement('a')
        a.href = cvUrl(lang)
        a.download = ''
        a.click()
        return [out(t.terminal.cvDownloading)]
      }
      case 'life':
        if (arg && RULE_IDS.includes(arg as RuleId)) {
          lifeStore.setRule(arg as RuleId)
          return [out(t.terminal.lifeSet(AUTOMATA[arg as RuleId].name))]
        }
        return [out(t.terminal.lifeUsage)]
      case 'lang':
        if (arg === 'es' || arg === 'en') { setLang(arg); return [] }
        return [out(t.terminal.langUsage)]
      case 'clear':
        return 'clear'
      case 'sudo':
        return [out(t.terminal.sudo)]
      default:
        return [out(<span className="text-red-400">{t.terminal.notFound(cmd)}</span>)]
    }
  }

  function submit() {
    const res = run(value)
    const input: Line = { id: lineId++, kind: 'in', body: value }
    if (value.trim()) setHistory((h) => [value, ...h])
    setHIndex(-1)
    setValue('')
    setLines((l) => (res === 'clear' ? [] : [...l, input, ...res]))
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit()
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, hIndex + (e.key === 'ArrowUp' ? 1 : -1)))
      setHIndex(next)
      setValue(next === -1 ? '' : history[next])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const [cmd, arg] = value.trimStart().split(/\s+/)
      if (arg !== undefined) {
        const opts = cmd === 'life' ? RULE_IDS : cmd === 'lang' ? ['es', 'en'] : []
        const match = opts.filter((o) => o.startsWith(arg))
        if (match.length === 1) setValue(`${cmd} ${match[0]}`)
      } else {
        const match = COMMANDS.filter((c) => c.startsWith(cmd ?? ''))
        if (match.length === 1) setValue(match[0] + (match[0] === 'life' || match[0] === 'lang' ? ' ' : ''))
        else if (match.length > 1) setLines((l) => [...l, out(<span className="text-muted">{match.join('  ')}</span>)])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <Section id="terminal" index={4} title={t.terminal.title}>
      <Reveal>
        <div
          className="card overflow-hidden rounded-2xl border border-line bg-[#05070a]/90 font-mono text-sm shadow-[0_30px_80px_rgb(0_0_0/0.5)] backdrop-blur-xl"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted">guest@pgn — zsh</span>
          </div>
          <div ref={outRef} data-lenis-prevent className="h-80 overflow-y-auto p-4 leading-relaxed whitespace-pre-wrap">
            <p className="text-muted">{t.terminal.intro}</p>
            {lines.map((l) =>
              l.kind === 'in' ? (
                <p key={l.id} className="mt-2"><span className="text-accent-2">{PROMPT}</span> {l.body}</p>
              ) : (
                <div key={l.id} className="text-body">{l.body}</div>
              ),
            )}
            <label className="mt-2 flex items-center gap-2">
              <span className="shrink-0 text-accent-2">{PROMPT}</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.terminal.placeholder}
                aria-label={t.terminal.placeholder}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-transparent text-fg caret-accent outline-none placeholder:text-muted/50"
              />
            </label>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
