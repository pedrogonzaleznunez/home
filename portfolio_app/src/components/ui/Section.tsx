import type { ReactNode } from 'react'
import { cn } from '../../lib'
import { Reveal } from './Reveal'

export function Section({ id, index, title, children, className }: {
  id: string
  index: number
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-5xl px-4 py-24 sm:px-8', className)}>
      <Reveal>
        <h2 className="mb-8 flex items-center gap-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="font-mono text-base font-normal text-accent">{String(index).padStart(2, '0')}.</span>
          {title}
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-line to-transparent" />
        </h2>
      </Reveal>
      {children}
    </section>
  )
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="rounded-full border border-accent/20 bg-accent/8 px-2.5 py-1 font-mono text-[0.72rem] text-accent">
          {t}
        </span>
      ))}
    </div>
  )
}
