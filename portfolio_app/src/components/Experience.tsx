import { useLang } from '../i18n/LangContext'
import { jobs } from '../data/experience'
import { Section, Tags } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'

// Grilla de 2 columnas (1 en mobile) con scroll vertical normal.
// Cada card: puesto + empresa arriba, bullets en el medio y, al pie, mini preview de la web (si tiene) y tecnologías.
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
                  {job.url && <SitePreview id={job.id} url={job.url} company={job.company} />}
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

// Mini ventana de navegador con la captura de la web de la empresa (public/previews/<id>.webp); abre el sitio
function SitePreview({ id, url, company }: { id: string; url: string; company: string }) {
  const host = new URL(url).hostname.replace(/^www\./, '')
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${company} — ${host}`}
      className="group/preview mt-4 block overflow-hidden rounded-lg border border-line bg-bg/60 transition-colors hover:border-accent/50"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-1.5">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="ml-2 truncate font-mono text-[0.68rem] text-muted transition-colors group-hover/preview:text-accent">{host} ↗</span>
      </div>
      <div className="aspect-[16/7] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}previews/${id}.webp`}
          alt=""
          width={640}
          height={400}
          loading="lazy"
          className="w-full object-cover object-top opacity-85 transition duration-500 group-hover/preview:scale-[1.03] group-hover/preview:opacity-100"
        />
      </div>
    </a>
  )
}
