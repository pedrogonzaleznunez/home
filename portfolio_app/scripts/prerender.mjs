// Después de `vite build`: mete el HTML de la app en dist/index.html (para que scrapers y
// buscadores vean el contenido sin ejecutar JS) y genera dist/llms.txt con el perfil.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SITE_URL = 'https://pedrogonzaleznunez.github.io/home/'
const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = join(app, 'dist-ssr')
const { render, llmsTxt } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const indexPath = join(app, 'dist', 'index.html')
const html = readFileSync(indexPath, 'utf8')
const root = '<div id="root"></div>'
if (!html.includes(root)) throw new Error('No encontré <div id="root"></div> en dist/index.html')
writeFileSync(indexPath, html.replace(root, `<div id="root">${render()}</div>`))
writeFileSync(join(app, 'dist', 'llms.txt'), llmsTxt(SITE_URL))
rmSync(ssrDir, { recursive: true, force: true })
console.log('Pre-render listo: dist/index.html + dist/llms.txt')
