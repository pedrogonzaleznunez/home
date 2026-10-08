import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { cvUrl, profile } from '../data/profile'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { ShineBorder } from './ui/ShineBorder'

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
            <div className="mb-5 flex flex-wrap justify-center gap-3">
              <Button primary href={`mailto:${profile.email}`}>{profile.email}</Button>
              <button
                type="button"
                onClick={copy}
                className="cursor-pointer rounded-full border border-line bg-white/4 px-4 py-3 font-mono text-sm transition hover:border-accent"
              >
                {copied ? t.contact.copied : '⧉'}
              </button>
              <Button href={profile.phoneHref}>{profile.phone}</Button>
              <Button href={cvUrl(lang)} download>{t.hero.cv} ↓</Button>
              <Button href={profile.linkedin}>LinkedIn ↗</Button>
              <Button href={profile.github}>GitHub ↗</Button>
            </div>
            <p className="font-mono text-muted">📍 {profile.location}</p>
          </div>
        </ShineBorder>
      </Reveal>
    </Section>
  )
}
