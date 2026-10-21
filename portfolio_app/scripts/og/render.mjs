// Regenera public/og.png a partir de og.html con Chrome headless (macOS). No corre en el build.
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const out = join(here, '..', '..', 'public', 'og.png')
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
  '--virtual-time-budget=4000', '--window-size=1200,630', `--screenshot=${out}`,
  pathToFileURL(join(here, 'og.html')).href,
], { stdio: 'ignore' })
console.log(`OG image → ${out}`)
