import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Cursor con forma de célula que sigue al mouse con inercia. Solo en dispositivos con mouse.
export function Cursor() {
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHover(!!(e.target as Element).closest('a, button, select, input, [role="button"]'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* punto exacto */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1.5 -translate-1/2 rounded-[1px] bg-accent"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      {/* célula con inercia */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-1/2 rounded-[3px] border border-accent mix-blend-difference"
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
        animate={{ width: hover ? 40 : 18, height: hover ? 40 : 18, backgroundColor: hover ? 'rgba(92,242,176,0.15)' : 'rgba(92,242,176,0)', rotate: hover ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </>
  )
}
