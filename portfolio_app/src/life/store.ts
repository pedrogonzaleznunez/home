import { useSyncExternalStore } from 'react'
import { RULE_IDS, type RuleId } from './automata'
import { PALETTE_IDS, type PaletteId } from './palettes'

// Estado compartido entre el canvas, los controles y la terminal.
type State = { rule: RuleId; palette: PaletteId; running: boolean }
type Command = 'seed' | 'clear'

const RULE_KEY = 'life-rule'
const PALETTE_KEY = 'life-palette'
const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function savedRule(): RuleId {
  try {
    const r = localStorage.getItem(RULE_KEY) as RuleId | null
    if (r && RULE_IDS.includes(r)) return r
  } catch { /* noop */ }
  return 'brain'
}

function savedPalette(): PaletteId {
  try {
    const p = localStorage.getItem(PALETTE_KEY) as PaletteId | null
    if (p && PALETTE_IDS.includes(p)) return p
  } catch { /* noop */ }
  return 'mint'
}

let state: State = { rule: savedRule(), palette: savedPalette(), running: !reduceMotion }
const listeners = new Set<() => void>()
const commandListeners = new Set<(c: Command) => void>()

function set(patch: Partial<State>) {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

export const lifeStore = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l)
    return () => { listeners.delete(l) }
  },
  setRule(rule: RuleId) {
    try { localStorage.setItem(RULE_KEY, rule) } catch { /* noop */ }
    set({ rule })
  },
  setPalette(palette: PaletteId) {
    try { localStorage.setItem(PALETTE_KEY, palette) } catch { /* noop */ }
    set({ palette })
  },
  toggle: () => set({ running: !state.running }),
  command: (c: Command) => commandListeners.forEach((l) => l(c)),
  onCommand(l: (c: Command) => void) {
    commandListeners.add(l)
    return () => { commandListeners.delete(l) }
  },
}

export function useLife() {
  return useSyncExternalStore(lifeStore.subscribe, lifeStore.get)
}
