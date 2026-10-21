import { useLang } from '../i18n/LangContext'
import { projects } from '../data/projects'
import { useTheme } from '../theme'

export function Nav() {
  const { t, lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const links = [
    ['about', t.nav.about],
    ['experience', t.nav.experience],
    ['skills', t.nav.skills],
    ...(projects.length ? [['projects', t.nav.projects]] : []),
    ['education', t.nav.education],
    ['terminal', t.nav.terminal],
    ['contact', t.nav.contact],
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-linear-to-b from-bg/85 to-bg/40 px-4 py-4 backdrop-blur-md sm:px-12">
      <a href="#top" className="font-mono text-lg font-semibold">
        pgn<span className="animate-blink text-accent">_</span>
      </a>
      <div className="flex items-center gap-6">
        <div className="hidden gap-6 font-mono text-sm lg:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-muted transition-colors first-letter:uppercase hover:text-accent">
              {label}
            </a>
          ))}
        </div>
        <div role="group" aria-label="Language" className="flex rounded-full border border-line p-0.5 font-mono text-xs">
          {(['es', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={`cursor-pointer rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'bg-accent text-bg' : 'text-muted hover:text-fg'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? t.nav.toLight : t.nav.toDark}
          title={theme === 'dark' ? t.nav.toLight : t.nav.toDark}
          className="-ml-3 grid size-8 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  )
}

const iconProps = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

function SunIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
