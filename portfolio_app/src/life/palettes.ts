// Paletas del fondo: célula joven → vieja (también se usa para el rastro).

export type RGB = [number, number, number]
export type Palette = { name: string; young: RGB; old: RGB }

export const PALETTES = {
  mint: { name: 'Mint', young: [92, 242, 176], old: [122, 162, 255] },
  amber: { name: 'Amber', young: [255, 196, 87], old: [255, 99, 72] },
  synth: { name: 'Synth', young: [255, 110, 199], old: [140, 100, 255] },
  ice: { name: 'Ice', young: [125, 230, 255], old: [70, 110, 220] },
  mono: { name: 'Mono', young: [235, 240, 245], old: [110, 120, 135] },
} satisfies Record<string, Palette>

export type PaletteId = keyof typeof PALETTES

export const PALETTE_IDS = Object.keys(PALETTES) as PaletteId[]

export const rgb = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
