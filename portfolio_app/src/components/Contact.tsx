import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { cvUrl, profile } from '../data/profile'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { ShineBorder } from './ui/ShineBorder'
import { BrandIcon } from './ui/BrandIcon'

export function Contact({ index }: { index: number }) {
  const { t, lang } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* sin permiso de clipboard */ }
  }

  return (
    <Section id="contact" index={index} title={t.contact.title}>
      <Reveal>
        <ShineBorder>
          <div className="card rounded-[inherit] bg-panel/80 px-6 py-12 text-center backdrop-blur-xl sm:p-16">
            <p className="mb-7 text-[clamp(1.6rem,4vw,2.6rem)] leading-tight font-bold tracking-tight">
              {t.contact.big}
              <br />
              <span className="text-accent">{t.contact.cta}</span>
            </p>
            {/* Fila 1: datos de contacto (el mail se copia al hacer click) */}
            <div className="mb-3 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={copy}
                title={t.contact.copyHint}
                aria-label={`${profile.email} — ${t.contact.copyHint}`}
                className="grid cursor-pointer place-items-center rounded-full border border-accent bg-accent px-3.5 py-3 font-mono text-[11px] font-semibold text-bg transition hover:-translate-y-0.5 hover:bg-[#7dffc6] hover:shadow-[0_8px_30px_rgb(92_242_176/0.2)] min-[360px]:px-5 min-[360px]:text-sm"
              >
                <span className={`col-start-1 row-start-1 transition-opacity ${copied ? 'opacity-0' : ''}`}>📨 {profile.email}</span>
                <span aria-live="polite" className={`col-start-1 row-start-1 transition-opacity ${copied ? '' : 'opacity-0'}`}>
                  {copied ? `✓ ${t.contact.copied}` : ''}
                </span>
              </button>
              <Button href={profile.phoneHref}>☎️ {profile.phone}</Button>
            </div>
            {/* Fila 2: enlaces */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <Button href={cvUrl(lang)} download>📄 {t.hero.cv}</Button>
              <Button href={profile.linkedin}><BrandIcon name="linkedin" /> LinkedIn ↗</Button>
              <Button href={profile.github}><BrandIcon name="github" /> GitHub ↗</Button>
            </div>
            <p className="font-mono text-muted">📍 {profile.location}</p>
          </div>
        </ShineBorder>
      </Reveal>
    </Section>
  )
}
