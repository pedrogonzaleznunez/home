import { motion } from 'motion/react'
import { useLang } from '../i18n/LangContext'
import { Section } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'
import { Reveal } from './ui/Reveal'
import { Flag } from './ui/Flag'

export function Education({ index }: { index: number }) {
  const { t } = useLang()
  return (
    <Section id="education" index={index} title={t.edu.title}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {t.edu.items.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.06}>
            <SpotlightCard className="h-full">
              <span className="font-mono text-xs text-muted">{e.date}</span>
              <h3 className="mt-1.5 mb-1 text-xl font-bold">{e.title}</h3>
              <p className="text-muted">{e.place}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal>
          <SpotlightCard className="h-full">
            <h3 className="mb-2 font-mono text-sm text-accent">// {t.edu.languagesTitle}</h3>
            {t.edu.languages.map((l, i) => (
              <div key={l.name} className="my-3 grid grid-cols-[104px_1fr_56px] items-center gap-3">
                <span className="flex items-center gap-2">
                  <Flag code={l.flag} className="h-3.5 w-[21px]" />
                  {l.name}
                </span>
                <span className="h-1.5 overflow-hidden rounded-full bg-white/6">
                  <motion.i
                    className="block h-full rounded-full bg-linear-to-r from-accent to-accent-2"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                </span>
                <span className="text-right font-mono text-xs text-muted">{l.level}</span>
              </div>
            ))}
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.08}>
          <SpotlightCard className="h-full">
            <h3 className="mb-2 font-mono text-sm text-accent">// {t.edu.hobbiesTitle}</h3>
            <ul>
              {t.edu.hobbies.map((h) => (
                <li key={h} className="border-b border-dashed border-line py-2.5 last:border-0">{h}</li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  )
}
