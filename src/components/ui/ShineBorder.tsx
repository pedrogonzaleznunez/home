import type { ReactNode } from 'react'
import { cn } from '../../lib'

// Borde con gradiente animado (adaptado de Magic UI "shine border")
export function ShineBorder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative rounded-2xl p-px', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-shine rounded-[inherit]"
        style={{
          backgroundImage: 'linear-gradient(120deg, transparent 25%, #5cf2b0 45%, #7aa2ff 55%, transparent 75%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="relative h-full rounded-[inherit] bg-bg">{children}</div>
    </div>
  )
}
