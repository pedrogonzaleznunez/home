// Reglas puras de los autómatas celulares. Sin DOM: solo operan sobre un World.

export type RuleId = 'conway' | 'daynight' | 'brain' | 'ant'

export type Ant = { x: number; y: number; dir: number } // dir: 0↑ 1→ 2↓ 3←

export type World = {
  cols: number
  rows: number
  cells: Uint8Array // estado de cada célula (0 = muerta)
  next: Uint8Array
  age: Uint16Array // generaciones que lleva viva
  trail: Float32Array // brillo residual al morir
  ants: Ant[]
}

export type Automaton = {
  id: RuleId
  name: string
  // cuántos pasos se calculan por tick (Langton es lento, necesita varios)
  stepsPerTick: number
  step: (w: World) => number // devuelve la población
  seed: (w: World) => void
  paint: (w: World, x: number, y: number) => void // pincel del mouse
  spawn: (w: World, x: number, y: number) => void // click
  inject: (w: World) => void // para que el tablero no se apague
  lowPopulation: (w: World, pop: number) => boolean
}

export function createWorld(cols: number, rows: number): World {
  const n = cols * rows
  return {
    cols, rows,
    cells: new Uint8Array(n),
    next: new Uint8Array(n),
    age: new Uint16Array(n),
    trail: new Float32Array(n),
    ants: [],
  }
}

export const wrap = (w: World, x: number, y: number) =>
  ((y % w.rows) + w.rows) % w.rows * w.cols + ((x % w.cols) + w.cols) % w.cols

const rand = (n: number) => Math.floor(Math.random() * n)

function clearWorld(w: World) {
  w.cells.fill(0); w.age.fill(0); w.trail.fill(0); w.ants = []
}

function randomFill(w: World, density: number, state = 1) {
  clearWorld(w)
  for (let i = 0; i < w.cells.length; i++) if (Math.random() < density) w.cells[i] = state
}

// ---------- Patrones ----------
export const PATTERNS = {
  glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  lwss: [[1, 0], [4, 0], [0, 1], [0, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3]],
  rpent: [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]],
  acorn: [[1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2]],
} satisfies Record<string, number[][]>

function stamp(w: World, pattern: number[][], cx: number, cy: number, state = 1) {
  const fx = Math.random() < 0.5 ? -1 : 1
  const fy = Math.random() < 0.5 ? -1 : 1
  for (const [dx, dy] of pattern) {
    const i = wrap(w, cx + dx * fx, cy + dy * fy)
    w.cells[i] = state
    w.age[i] = 0
  }
}

function blob(w: World, cx: number, cy: number, r: number, density: number, state = 1) {
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++)
      if (Math.random() < density) w.cells[wrap(w, cx + dx, cy + dy)] = state
}

function brush(w: World, x: number, y: number, state = 1) {
  for (let k = 0; k < 3; k++) {
    const i = wrap(w, x + rand(3) - 1, y + rand(3) - 1)
    w.cells[i] = state
    w.age[i] = 0
  }
}

// ---------- Life-like (B/S) ----------
function lifeLike(id: RuleId, name: string, birth: number[], survive: number[], density: number): Automaton {
  const B = new Uint8Array(9), S = new Uint8Array(9)
  birth.forEach((n) => (B[n] = 1))
  survive.forEach((n) => (S[n] = 1))

  return {
    id, name,
    stepsPerTick: 1,
    step(w) {
      const { cols, rows, cells, next, age, trail } = w
      let pop = 0
      for (let y = 0; y < rows; y++) {
        const up = ((y - 1 + rows) % rows) * cols
        const mid = y * cols
        const dn = ((y + 1) % rows) * cols
        for (let x = 0; x < cols; x++) {
          const l = (x - 1 + cols) % cols
          const r = (x + 1) % cols
          const n =
            cells[up + l] + cells[up + x] + cells[up + r] +
            cells[mid + l] + cells[mid + r] +
            cells[dn + l] + cells[dn + x] + cells[dn + r]
          const i = mid + x
          const alive = cells[i] ? S[n] : B[n]
          next[i] = alive
          if (alive) { age[i] = cells[i] ? Math.min(age[i] + 1, 60) : 0; pop++ }
          else if (cells[i]) { trail[i] = 1; age[i] = 0 }
        }
      }
      w.cells = next; w.next = cells
      return pop
    },
    seed: (w) => randomFill(w, density),
    paint: (w, x, y) => brush(w, x, y),
    spawn(w, x, y) {
      if (id === 'conway') stamp(w, Math.random() < 0.7 ? PATTERNS.glider : PATTERNS.lwss, x, y)
      else blob(w, x, y, 4, 0.6)
    },
    inject(w) {
      const x = rand(w.cols), y = rand(w.rows)
      if (id === 'conway') {
        const names = Object.keys(PATTERNS) as (keyof typeof PATTERNS)[]
        stamp(w, PATTERNS[names[rand(names.length)]], x, y)
      } else {
        blob(w, x, y, 6, 0.55)
      }
    },
    lowPopulation: (w, pop) => pop < w.cells.length * 0.03,
  }
}

// ---------- Brian's Brain: 0 apagada, 1 encendida, 2 muriendo ----------
const brain: Automaton = {
  id: 'brain',
  name: "Brian's Brain",
  stepsPerTick: 1,
  step(w) {
    const { cols, rows, cells, next, trail } = w
    let pop = 0
    for (let y = 0; y < rows; y++) {
      const up = ((y - 1 + rows) % rows) * cols
      const mid = y * cols
      const dn = ((y + 1) % rows) * cols
      for (let x = 0; x < cols; x++) {
        const i = mid + x
        const s = cells[i]
        if (s === 1) { next[i] = 2; pop++; continue }
        if (s === 2) { next[i] = 0; trail[i] = 1; continue }
        const l = (x - 1 + cols) % cols
        const r = (x + 1) % cols
        const n =
          (cells[up + l] === 1 ? 1 : 0) + (cells[up + x] === 1 ? 1 : 0) + (cells[up + r] === 1 ? 1 : 0) +
          (cells[mid + l] === 1 ? 1 : 0) + (cells[mid + r] === 1 ? 1 : 0) +
          (cells[dn + l] === 1 ? 1 : 0) + (cells[dn + x] === 1 ? 1 : 0) + (cells[dn + r] === 1 ? 1 : 0)
        next[i] = n === 2 ? 1 : 0
        if (next[i]) pop++
      }
    }
    w.cells = next; w.next = cells
    return pop
  },
  seed: (w) => randomFill(w, 0.08),
  paint: (w, x, y) => brush(w, x, y),
  spawn: (w, x, y) => blob(w, x, y, 3, 0.5),
  inject: (w) => blob(w, rand(w.cols), rand(w.rows), 4, 0.4),
  lowPopulation: (w, pop) => pop < w.cells.length * 0.01,
}

// ---------- Langton's Ant ----------
const MAX_ANTS = 24
const DX = [0, 1, 0, -1]
const DY = [-1, 0, 1, 0]

function addAnt(w: World, x: number, y: number) {
  if (w.ants.length >= MAX_ANTS) w.ants.shift()
  w.ants.push({ x: ((x % w.cols) + w.cols) % w.cols, y: ((y % w.rows) + w.rows) % w.rows, dir: rand(4) })
}

const ant: Automaton = {
  id: 'ant',
  name: "Langton's Ant",
  stepsPerTick: 12,
  step(w) {
    for (const a of w.ants) {
      const i = a.y * w.cols + a.x
      if (w.cells[i]) { a.dir = (a.dir + 3) % 4; w.cells[i] = 0; w.trail[i] = 1 }
      else { a.dir = (a.dir + 1) % 4; w.cells[i] = 1; w.age[i] = 0 }
      a.x = (a.x + DX[a.dir] + w.cols) % w.cols
      a.y = (a.y + DY[a.dir] + w.rows) % w.rows
    }
    for (let i = 0; i < w.age.length; i++) if (w.cells[i] && w.age[i] < 60) w.age[i]++
    return w.ants.length
  },
  seed(w) {
    clearWorld(w)
    for (let k = 0; k < 6; k++) addAnt(w, rand(w.cols), rand(w.rows))
  },
  paint: (w, x, y) => { w.cells[wrap(w, x, y)] = 1 },
  spawn: (w, x, y) => addAnt(w, x, y),
  inject: (w) => addAnt(w, rand(w.cols), rand(w.rows)),
  lowPopulation: (w) => w.ants.length < 3,
}

export const AUTOMATA: Record<RuleId, Automaton> = {
  conway: lifeLike('conway', "Conway's Life", [3], [2, 3], 0.18),
  daynight: lifeLike('daynight', 'Day & Night', [3, 6, 7, 8], [3, 4, 6, 7, 8], 0.5),
  brain,
  ant,
}

export const RULE_IDS = Object.keys(AUTOMATA) as RuleId[]
