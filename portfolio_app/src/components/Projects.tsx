import { useLang } from '../i18n/LangContext'
import { projects } from '../data/projects'
import { Section, Tags } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'
import { Reveal } from './ui/Reveal'

// Se oculta mientras src/data/projects.ts esté vacío
export function Projects({ index }: { index: number }) {
  const { t, lang } = useLang()
  if (!projects.length) return null

  return (
    <Section id="projects" index={index} title={t.projects.title}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <SpotlightCard className="h-full">
              {p.image && (
                <img src={`${import.meta.env.BASE_URL}${p.image}`} alt="" loading="lazy" className="mb-5 aspect-video w-full rounded-xl border border-line object-cover" />
              )}
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-body">{p.description[lang]}</p>
              <Tags items={p.tags} />
              <div className="mt-5 flex gap-4 font-mono text-sm">
                {p.repo && <a href={p.repo} target="_blank" rel="noopener" className="text-accent hover:underline">{t.projects.repo} ↗</a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noopener" className="text-accent hover:underline">{t.projects.demo} ↗</a>}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
