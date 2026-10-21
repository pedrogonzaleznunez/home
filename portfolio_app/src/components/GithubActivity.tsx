import { GitHubCalendar } from 'react-github-calendar'
import { useLang } from '../i18n/LangContext'
import { profile } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { SpotlightCard } from './ui/SpotlightCard'
import { Button } from './ui/Button'
import { useTheme } from '../theme'

const THEME = { light: ['#e4e7ec', '#a6e9c9', '#4fc98f', '#16a067', '#087a4c'], dark: ['#11161f', '#1b4a3a', '#2a8562', '#43c08c', '#5cf2b0'] }
const MONTHS = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

export function GithubActivity() {
  const { t, lang } = useLang()
  const { theme } = useTheme()
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8">
      <Reveal>
        <SpotlightCard>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-mono text-sm text-accent">// {t.github.title}</h3>
            <Button href={profile.github} className="px-4 py-2 text-xs">@{profile.githubUser} ↗</Button>
          </div>
          <div data-lenis-prevent className="gh-calendar overflow-x-auto pb-2">
            <GitHubCalendar
              username={profile.githubUser}
              colorScheme={theme}
              theme={THEME}
              blockSize={11}
              blockMargin={3}
              fontSize={12}
              errorMessage={t.github.error}
              labels={{ totalCount: t.github.total, months: MONTHS[lang] }}
            />
          </div>
        </SpotlightCard>
      </Reveal>
    </div>
  )
}
