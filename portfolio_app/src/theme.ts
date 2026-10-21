import { useSyncExternalStore } from 'react'

// Tema claro/oscuro: vive en <html data-theme>. El script inline de index.html lo pone antes del
// primer pintado (guardado en localStorage o, si no hay, el del sistema) para que no parpadee.
export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
// Mismo valor que --color-bg de cada tema (para <meta name="theme-color">)
const THEME_COLOR: Record<Theme, string> = { dark: '#07090d', light: '#f5f6f8' }

const listeners = new Set<() => void>()

function get(): Theme {
  if (typeof document === 'undefined') return 'dark' // pre-render
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function set(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  try { localStorage.setItem(STORAGE_KEY, theme) } catch { /* storage bloqueado */ }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const themeStore = { get, set, subscribe }

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, get, () => 'dark' as Theme)
  return { theme, toggle: () => set(theme === 'dark' ? 'light' : 'dark') }
}
