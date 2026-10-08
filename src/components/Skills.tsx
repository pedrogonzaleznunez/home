import { useLang } from '../i18n/LangContext'
import { marqueeTech, skillGroups } from '../data/skills'
import { cn } from '../lib'
import { Section } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'
import { Reveal } from './ui/Reveal'
import { Marquee } from './ui/Marquee'
import { ShineBorder } from './ui/ShineBorder'

export function Skills() {
  const { t } = useLang()
  return (
    <Section id="skills" index={3} title={t.skills.title}>
      {/* bento grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => {
          const content = (
            <>
              <h3 className="mb-3 font-mono text-sm text-accent">// {t.skills.groups[g.id]}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-body">
                {g.items.map((s) => (
                  <span key={s} className="rounded-md border border-line bg-white/4 px-2.5 py-1">{s}</span>
                ))}
              </div>
            </>
          )
          return (
            <Reveal key={g.id} delay={i * 0.05} className={cn(g.span === 2 && 'sm:col-span-2')}>
              {g.id === 'ai' ? (
                <ShineBorder className="h-full">
                  <SpotlightCard className="h-full border-0">{content}</SpotlightCard>
                </ShineBorder>
              ) : (
                <SpotlightCard className="h-full transition-transform hover:-translate-y-1">{content}</SpotlightCard>
              )}
            </Reveal>
          )
        })}
      </div>

      {/* marquee de tecnologías */}
      <div className="mt-10 space-y-3">
        <Marquee duration="45s">
          {marqueeTech.map((s) => (
            <span key={s} className="rounded-lg border border-line bg-panel/60 px-4 py-2 font-mono text-sm whitespace-nowrap text-muted">{s}</span>
          ))}
        </Marquee>
        <Marquee duration="55s" reverse>
          {[...marqueeTech].reverse().map((s) => (
            <span key={s} className="rounded-lg border border-line bg-panel/60 px-4 py-2 font-mono text-sm whitespace-nowrap text-muted">{s}</span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
