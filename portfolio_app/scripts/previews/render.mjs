// Regenera las mini previews de las webs de cada trabajo (public/previews/<id>.webp) con Chrome headless (macOS).
// No corre en el build. Requiere cwebp (Homebrew `webp`).
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { jobs } from '../../src/data/experience.ts'

const here = dirname(fileURLToPath(import.meta.url))
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const outDir = join(here, '..', '..', 'public', 'previews')
mkdirSync(outDir, { recursive: true })

for (const job of jobs.filter((j) => j.url)) {
  const png = join(tmpdir(), `preview-${job.id}.png`)
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--virtual-time-budget=8000', '--window-size=1280,800', `--screenshot=${png}`, job.url,
  ], { stdio: 'ignore' })
  const out = join(outDir, `${job.id}.webp`)
  execFileSync('cwebp', ['-quiet', '-q', '78', '-resize', '640', '0', png, '-o', out])
  rmSync(png)
  console.log(`${job.url} → ${out}`)
}
