import { useSyncExternalStore } from 'react'
import { RULE_IDS, type RuleId } from './automata'

// Estado compartido entre el canvas, los controles y la terminal.
type State = { rule: RuleId; running: boolean; gen: number }
type Command = 'seed' | 'clear'

const RULE_KEY = 'life-rule'
const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function savedRule(): RuleId {
  try {
    const r = localStorage.getItem(RULE_KEY) as RuleId | null
    if (r && RULE_IDS.includes(r)) return r
  } catch { /* noop */ }
  return 'conway'
}

let state: State = { rule: savedRule(), running: !reduceMotion, gen: 0 }
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
    set({ rule, gen: 0 })
  },
  toggle: () => set({ running: !state.running }),
  setGen: (gen: number) => set({ gen }),
  command: (c: Command) => commandListeners.forEach((l) => l(c)),
  onCommand(l: (c: Command) => void) {
    commandListeners.add(l)
    return () => { commandListeners.delete(l) }
  },
}

export function useLife() {
  return useSyncExternalStore(lifeStore.subscribe, lifeStore.get)
}
