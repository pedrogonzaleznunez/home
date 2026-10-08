import { useLang } from '../i18n/LangContext'
import { jobs } from '../data/experience'
import { Section, Tags } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'

// Grilla de 2 columnas (1 en mobile) con scroll vertical normal.
// Cada card: puesto + empresa arriba, bullets en el medio y tecnologías al pie.
export function Experience() {
  const { t } = useLang()

  return (
    <Section id="experience" index={2} title={t.exp.title}>
      <ol className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {jobs.map((job) => {
          const text = t.exp.jobs[job.id]
          return (
            <li key={job.id}>
              <SpotlightCard className="flex h-full flex-col">
                <h3 className="text-xl font-bold">{text.role}</h3>
                <p className="mt-1 mb-4 font-mono text-xs text-muted">{job.company} · {text.type} · {text.date}</p>
                <ul className="list-disc space-y-1.5 pl-4 text-body marker:text-accent">
                  {text.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="mt-auto pt-2">
                  <Tags items={job.tags} />
                </div>
              </SpotlightCard>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
