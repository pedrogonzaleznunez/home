import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useLang } from '../i18n/LangContext'
import { cvUrl, profile } from '../data/profile'
import { prefersReducedMotion } from '../lib'
import { Button } from './ui/Button'

// Arranca mostrando el primer rol completo (se lee sin esperar) y después rota borrando/escribiendo
function useTyped(words: string[]) {
  const [out, setOut] = useState(words[0])
  useEffect(() => {
    setOut(words[0])
    if (prefersReducedMotion()) return
    let r = 0, c = words[0].length, deleting = true
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
    timer = window.setTimeout(tick, 3500)
    return () => clearTimeout(timer)
  }, [words])
  return out
}

// Entrada corta: el contenido del hero tiene que leerse en el primer segundo
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] as const },
})

export function Hero() {
  const { t, lang } = useLang()
  const [first, ...rest] = profile.name.split(' ')
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
          className="mx-auto size-33 rounded-full object-cover"
        />
        <h1
          aria-label={profile.name}
          className="mt-7 text-[clamp(2.6rem,9vw,6.2rem)] leading-[0.95] font-bold tracking-tighter whitespace-pre-line text-white"
        >
          {first}{'\n'}{rest.join(' ')}
        </h1>
        <p className="mt-6 mb-2.5 min-h-[1.6em] font-mono text-[clamp(1rem,2.4vw,1.3rem)]">
          {role}
          <span className="ml-0.5 animate-blink text-accent">▋</span>
        </p>
        <motion.p {...rise(0.1)} className="mx-auto max-w-xl text-lg text-white [text-shadow:0_1px_12px_#07090d,0_0_4px_#07090d]">
          {t.hero.lead}
        </motion.p>
        <motion.div {...rise(0.2)} className="mt-9 flex flex-wrap justify-center gap-3">
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
