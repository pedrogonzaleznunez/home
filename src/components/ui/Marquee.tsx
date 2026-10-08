import type { ReactNode } from 'react'
import { cn } from '../../lib'

// Marquee infinito (adaptado de Magic UI). Duplica el contenido para el loop.
export function Marquee({ children, className, duration = '40s', reverse = false }: {
  children: ReactNode
  className?: string
  duration?: string
  reverse?: boolean
}) {
  return (
    <div
      className={cn('group flex gap-(--gap) overflow-hidden [--gap:1rem]', className)}
      style={{
        ['--duration' as string]: duration,
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className={cn(
            'flex shrink-0 animate-marquee justify-around gap-(--gap) group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
