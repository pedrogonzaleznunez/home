export type JobId = 'galoSwe' | 'galoFde' | 'codify' | 'rocketry' | 'research' | 'pushpop'

export type Job = {
  id: JobId
  company: string
  tags: string[]
}

// Mismo orden que LinkedIn; los textos (puesto, tipo, fechas, bullets) están en i18n (exp.jobs.<id>)
export const jobs: Job[] = [
  { id: 'galoSwe', company: 'Galo AI', tags: ['Prometheus', 'Loki', 'Grafana', 'Metabase', 'Cloudflare', 'VPS', 'DNS'] },
  { id: 'galoFde', company: 'Galo AI', tags: ['Python', 'SQL', 'OpenAI / Anthropic APIs', 'RAG', 'Prompt Engineering', 'LLM Ops'] },
  { id: 'codify', company: 'Codify Company', tags: ['React', 'Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Coolify', 'AWS'] },
  { id: 'rocketry', company: 'ITBA Rocketry Team', tags: ['Next.js', 'React'] },
  { id: 'research', company: 'ITBA', tags: ['Python', 'Signal Processing'] },
  { id: 'pushpop', company: 'Push&Pop Growth', tags: ['Python', 'FastAPI', 'Google ADK', 'PostgreSQL', 'WhatsApp API', 'Telegram API', 'Azure'] },
]
