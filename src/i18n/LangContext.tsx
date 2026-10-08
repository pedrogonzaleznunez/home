import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { es, type Dict } from './es'
import { en } from './en'

export type Lang = 'es' | 'en'

const dicts: Record<Lang, Dict> = { es, en }
const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* storage bloqueado */ }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* noop */ }
  }, [lang])

  return <LangContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
