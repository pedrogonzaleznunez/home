// Banderas en SVG (los emojis de banderas no se ven en Windows: muestran "AR", "US"...)
export type FlagCode = 'ar' | 'us' | 'de' | 'fr'

const FLAGS: Record<FlagCode, React.ReactNode> = {
  ar: (
    <>
      <rect width="30" height="20" fill="#74acdf" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <circle cx="15" cy="10" r="2.2" fill="#f6b40e" />
    </>
  ),
  us: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((k) => (
        <rect key={k} y={(k * 20) / 13} width="30" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(7 * 20) / 13} fill="#3c3b6e" />
    </>
  ),
  de: (
    <>
      <rect width="30" height="6.67" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
      <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
    </>
  ),
  fr: (
    <>
      <rect width="10" height="20" fill="#0055a4" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#ef4135" />
    </>
  ),
}

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" className={`shrink-0 overflow-hidden rounded-[3px] ${className ?? ''}`}>
      {FLAGS[code]}
    </svg>
  )
}
