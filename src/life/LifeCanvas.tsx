import { useEffect, useRef } from 'react'
import { AUTOMATA, createWorld, wrap, type World } from './automata'
import { lifeStore } from './store'

const STEP_MS = 95
const GAP = 2
const BG = '#07090d'
// célula joven = verde menta, vieja = azul
const YOUNG = [92, 242, 176]
const OLD = [122, 162, 255]

// Paleta precalculada por edad (0..30) para no armar strings por célula
const AGE_COLORS = Array.from({ length: 31 }, (_, a) => {
  const t = a / 30
  const c = YOUNG.map((v, k) => Math.round(v + (OLD[k] - v) * t))
  return `rgba(${c[0]},${c[1]},${c[2]},${(0.55 - t * 0.25).toFixed(3)})`
})
const TRAIL_STEPS = 12
const TRAIL_COLORS = Array.from({ length: TRAIL_STEPS + 1 }, (_, k) =>
  `rgba(122,162,255,${((k / TRAIL_STEPS) * 0.16).toFixed(3)})`)

export function LifeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const cell = window.innerWidth < 720 ? 9 : 12
    let world: World
    let automaton = AUTOMATA[lifeStore.get().rule]
    let gen = 0
    let lastStep = 0
    let lastInject = 0
    let raf = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(window.innerWidth / cell)
      const rows = Math.ceil(window.innerHeight / cell)
      const old = world
      world = createWorld(cols, rows)
      if (!old) { automaton.seed(world); return }
      // conservar lo que ya estaba vivo
      for (let y = 0; y < Math.min(rows, old.rows); y++)
        for (let x = 0; x < Math.min(cols, old.cols); x++)
          world.cells[y * cols + x] = old.cells[y * old.cols + x]
      world.ants = old.ants.filter((a) => a.x < cols && a.y < rows)
    }

    function draw() {
      const { cols, rows, cells, age, trail } = world
      const size = cell - GAP
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      const brain = automaton.id === 'brain'

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const s = cells[i]
          if (s) {
            ctx.fillStyle = brain && s === 2 ? AGE_COLORS[30] : AGE_COLORS[Math.min(age[i], 30)]
            ctx.fillRect(x * cell, y * cell, size, size)
          } else if (trail[i] > 0.02) {
            ctx.fillStyle = TRAIL_COLORS[Math.round(trail[i] * TRAIL_STEPS)]
            ctx.fillRect(x * cell, y * cell, size, size)
            trail[i] *= 0.86
          } else if (trail[i]) {
            trail[i] = 0
          }
        }
      }

      if (world.ants.length) {
        ctx.fillStyle = '#5cf2b0'
        ctx.shadowColor = '#5cf2b0'
        ctx.shadowBlur = 12
        for (const a of world.ants) ctx.fillRect(a.x * cell - 1, a.y * cell - 1, size + 2, size + 2)
        ctx.shadowBlur = 0
      }
    }

    function loop(now: number) {
      if (lifeStore.get().running && now - lastStep > STEP_MS) {
        let pop = 0
        for (let k = 0; k < automaton.stepsPerTick; k++) pop = automaton.step(world)
        lastStep = now
        gen++
        lifeStore.setGen(gen)
        // mantener el tablero vivo
        const low = automaton.lowPopulation(world, pop)
        if (now - lastInject > (low ? 600 : 3500)) {
          automaton.inject(world)
          lastInject = now
        }
      }
      draw()
      raf = requestAnimationFrame(loop)
    }

    // ---------- Interacción ----------
    let lastCell = -1
    const onMove = (e: PointerEvent) => {
      const x = Math.floor(e.clientX / cell)
      const y = Math.floor(e.clientY / cell)
      const i = wrap(world, x, y)
      if (i === lastCell) return
      lastCell = i
      automaton.paint(world, x, y)
    }
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, input, select, .card, nav, [data-no-life]')) return
      automaton.spawn(world, Math.floor(e.clientX / cell), Math.floor(e.clientY / cell))
    }

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }

    const offCommand = lifeStore.onCommand((c) => {
      if (c === 'seed') automaton.seed(world)
      else { world.cells.fill(0); world.age.fill(0); world.trail.fill(0); world.ants = [] }
      gen = 0
      lifeStore.setGen(0)
    })

    let currentRule = lifeStore.get().rule
    const offStore = lifeStore.subscribe(() => {
      const { rule } = lifeStore.get()
      if (rule === currentRule) return
      currentRule = rule
      automaton = AUTOMATA[rule]
      automaton.seed(world)
      gen = 0
    })

    resize()
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      offCommand()
      offStore()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 block h-screen w-screen" />
      <div aria-hidden="true" className="vignette pointer-events-none fixed inset-0 z-[1]" />
    </>
  )
}
