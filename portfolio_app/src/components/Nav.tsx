import { useLang } from '../i18n/LangContext'
import { projects } from '../data/projects'
import { useTheme } from '../theme'
import { IconMoon, IconSun } from '@tabler/icons-react'

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
          {theme === 'dark' ? <IconSun size={16} aria-hidden /> : <IconMoon size={16} aria-hidden />}
        </button>
      </div>
    </nav>
  )
}
