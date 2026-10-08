// Copia los PDFs de /CVs (fuente única) a public/cv para que la web los sirva.
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(app, '..', 'CVs')
const dest = join(app, 'public', 'cv')

mkdirSync(dest, { recursive: true })
for (const lang of ['EN', 'ES']) {
  const file = `CV_PedroGonzalezNunez_${lang}.pdf`
  if (!existsSync(join(src, file))) throw new Error(`Falta ${join(src, file)}`)
  cpSync(join(src, file), join(dest, file))
}
console.log('CVs copiados a public/cv')
