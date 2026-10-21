export type JobId = 'galoSwe' | 'galoFde' | 'codify' | 'rocketry' | 'research' | 'pushpop'

export type Job = {
  id: JobId
  company: string
  tags: string[]
}

// Mismo orden que LinkedIn; los textos (puesto, tipo, fechas, bullets) están en i18n (exp.jobs.<id>)
export const jobs: Job[] = [
  { id: 'galoSwe', company: 'Galo AI', tags: ['Prometheus', 'Loki', 'Grafana', 'Metabase', 'Kafka', 'RabbitMQ', 'Cloudflare', 'Docker', 'VPS'] },
  { id: 'galoFde', company: 'Galo AI', tags: ['Python', 'Spring Boot', 'React', 'PostgreSQL', 'pgvector', 'OpenAI / Anthropic APIs', 'MCP'] },
  { id: 'codify', company: 'Codify Company', tags: ['React', 'Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Coolify', 'Mercado Pago', 'AWS'] },
  { id: 'rocketry', company: 'ITBA Rocketry Team', tags: ['Next.js', 'React'] },
  { id: 'research', company: 'ITBA', tags: ['Python', 'Signal Processing'] },
  { id: 'pushpop', company: 'Push&Pop Growth', tags: ['Python', 'FastAPI', 'Google ADK', 'PostgreSQL', 'Docker', 'WhatsApp API', 'Telegram API', 'Azure'] },
]
