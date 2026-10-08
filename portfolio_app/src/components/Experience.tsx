import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLang } from '../i18n/LangContext'
import { jobs } from '../data/experience'
import { Section, Tags } from './ui/Section'
import { SpotlightCard } from './ui/SpotlightCard'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Desktop: la sección queda fija y las cards se desplazan en horizontal con el scroll.
// Mobile / reduced motion: timeline vertical normal.
export function Experience() {
  const { t, lang } = useLang()
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current!
      const distance = () => track.scrollWidth - track.clientWidth
      gsap.to(track.children, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'center center',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => { barRef.current!.style.transform = `scaleX(${self.progress})` },
        },
      })
    })
    return () => mm.revert()
  }, { dependencies: [lang], revertOnUpdate: true })

  return (
    <Section id="experience" index={2} title={t.exp.title}>
      <div ref={pinRef}>
        <ol
          ref={trackRef}
          className="relative grid gap-5 border-l-2 border-accent/40 pl-6 lg:flex lg:gap-6 lg:overflow-visible lg:border-l-0 lg:pl-0"
        >
          {jobs.map((job) => {
            const text = t.exp[job.id as 'devops' | 'ai' | 'fullstack' | 'backend']
            return (
              <li key={job.id} className="relative lg:w-[min(560px,80vw)] lg:shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute top-8 -left-[31px] size-3 rounded-[3px] bg-accent shadow-[0_0_16px_#5cf2b0] lg:hidden"
                />
                <SpotlightCard className="h-full">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-bold">{text.role}</h3>
                    <span className="font-mono text-xs text-muted">{job.company} · {text.date}</span>
                  </div>
                  <ul className="list-disc space-y-1.5 pl-4 text-body marker:text-accent">
                    {text.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <Tags items={job.tags} />
                </SpotlightCard>
              </li>
            )
          })}
        </ol>
        <div aria-hidden="true" className="mt-8 hidden h-0.5 overflow-hidden rounded-full bg-white/5 lg:block">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-linear-to-r from-accent to-accent-2" />
        </div>
      </div>
    </Section>
  )
}
