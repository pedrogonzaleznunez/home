import type { AnchorHTMLAttributes } from 'react'
import { cn } from '../../lib'

export function Button({ primary, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { primary?: boolean }) {
  const external = props.href?.startsWith('http')
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-white/4 px-5 py-3 font-mono text-sm break-all backdrop-blur-md transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_30px_rgb(92_242_176/0.2)]',
        primary && 'border-accent bg-accent font-semibold text-bg hover:bg-[#7dffc6]',
        className,
      )}
    />
  )
}
