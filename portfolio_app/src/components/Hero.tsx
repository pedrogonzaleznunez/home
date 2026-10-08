import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useLang } from '../i18n/LangContext'
import { cvUrl, profile } from '../data/profile'
import { prefersReducedMotion } from '../lib'
import { Button } from './ui/Button'

const GLYPHS = '█▓▒░<>/\\{}[]#$%01'

// Texto que se "descifra" letra por letra
function useScramble(text: string, delay = 300) {
  const [out, setOut] = useState(() => (prefersReducedMotion() ? text : ''))
  useEffect(() => {
    if (prefersReducedMotion()) { setOut(text); return }
    let frame = 0
    let raf = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      if (now < start) { raf = requestAnimationFrame(tick); return }
      frame++
      const revealed = Math.floor(frame / 2)
      setOut(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || ch === '\n' || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      )
      if (revealed < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay])
  return out
}

function useTyped(words: string[]) {
  const [out, setOut] = useState(() => (prefersReducedMotion() ? words[0] : ''))
  useEffect(() => {
    if (prefersReducedMotion()) { setOut(words[0]); return }
    let r = 0, c = 0, deleting = false
    let timer = 0
    const tick = () => {
      const word = words[r]
      c += deleting ? -1 : 1
      setOut(word.slice(0, c))
      let delay = deleting ? 35 : 70
      if (!deleting && c === word.length) { deleting = true; delay = 1800 }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % words.length; delay = 300 }
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 1400)
    return () => clearTimeout(timer)
  }, [words])
  return out
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] as const },
})

export function Hero() {
  const { t, lang } = useLang()
  const [first, ...rest] = profile.name.split(' ')
  const name = useScramble(`${first}\n${rest.join(' ')}`)
  const role = useTyped(t.hero.roles)

  return (
    <section id="top" className="relative flex min-h-svh flex-col items-center justify-center px-4 pt-28 pb-16">
      <div className="max-w-4xl text-center">
        <motion.img
          {...rise(0)}
          src={`${import.meta.env.BASE_URL}profile_pic.png`}
          alt={profile.name}
          width={132}
          height={132}
          className="mx-auto size-33 rounded-full border-2 border-accent object-cover shadow-[0_0_0_6px_rgb(92_242_176/0.12),0_0_60px_rgb(92_242_176/0.35)]"
        />
        <motion.p {...rise(0.1)} className="mt-7 mb-1.5 font-mono text-accent">$ whoami</motion.p>
        <h1
          aria-label={profile.name}
          className="bg-linear-to-r from-white from-20% via-accent via-60% to-accent-2 bg-clip-text text-[clamp(2.6rem,9vw,6.2rem)] leading-[0.95] font-bold tracking-tighter whitespace-pre-line text-transparent"
        >
          {name || ' '}
        </h1>
        <p className="mt-6 mb-2.5 min-h-[1.6em] font-mono text-[clamp(1rem,2.4vw,1.3rem)]">
          {role}
          <span className="ml-0.5 animate-blink text-accent">▋</span>
        </p>
        <motion.p {...rise(0.35)} className="mx-auto max-w-xl text-lg text-muted [text-shadow:0_1px_12px_#07090d]">
          {t.hero.lead}
        </motion.p>
        <motion.div {...rise(0.5)} className="mt-9 flex flex-wrap justify-center gap-3">
          <Button primary href="#contact">{t.hero.talk}</Button>
          <Button href={cvUrl(lang)} download>{t.hero.cv} ↓</Button>
          <Button href={profile.github}>GitHub ↗</Button>
          <Button href={profile.linkedin}>LinkedIn ↗</Button>
        </motion.div>
      </div>
      <motion.p
        className="absolute inset-x-4 bottom-20 hidden text-center font-mono text-xs text-muted sm:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓ {t.hero.hint}
      </motion.p>
    </section>
  )
}
