import { useRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib'

// Card con vidrio esmerilado y un brillo radial que sigue al cursor (estilo Aceternity "card spotlight")
export function SpotlightCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
        ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className={cn(
        'card group relative rounded-2xl border border-line bg-panel/70 p-5 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:border-accent/35 sm:p-8',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(92 242 176 / 0.09), transparent 40%)' }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
