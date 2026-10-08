import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'
import { useLang } from '../i18n/LangContext'
import { Section } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'
import { Reveal } from './ui/Reveal'

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => { ref.current!.textContent = String(Math.round(v)) } })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>0</span>
}

const STATS = [6, 4, 3]

export function About() {
  const { t } = useLang()
  return (
    <Section id="about" index={1} title={t.about.title}>
      <Reveal>
        <SpotlightCard>
          <p className="mb-4 text-lg text-body">{t.about.p1}</p>
          <p className="text-lg text-body">{t.about.p2}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {STATS.map((n, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-[clamp(2rem,5vw,3rem)] leading-none text-accent"><Counter to={n} /></span>
                <span className="mt-1.5 text-xs text-muted sm:text-sm">{t.about.stats[i]}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </Reveal>
    </Section>
  )
}
