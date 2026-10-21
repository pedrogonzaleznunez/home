export type JobId = 'galo' | 'codify' | 'rocketry' | 'research' | 'pushpop'

export type Job = {
  id: JobId
  company: string
  tags: string[]
}

// Orden elegido por Pedro (lo más relevante primero); los textos (puesto, tipo, fechas, bullets) están en i18n (exp.jobs.<id>)
export const jobs: Job[] = [
  { id: 'galo', company: 'Galo AI', tags: ['Python', 'Spring Boot', 'React', 'PostgreSQL', 'pgvector', 'OpenAI / Anthropic APIs', 'MCP', 'Kafka', 'RabbitMQ', 'Prometheus', 'Loki', 'Grafana', 'Cloudflare', 'Docker'] },
  { id: 'codify', company: 'Codify Company', tags: ['React', 'Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Coolify', 'Mercado Pago', 'AWS'] },
  { id: 'pushpop', company: 'Push&Pop Growth', tags: ['Python', 'FastAPI', 'Google ADK', 'PostgreSQL', 'Docker', 'WhatsApp API', 'Telegram API', 'Azure'] },
  { id: 'research', company: 'ITBA', tags: ['Python', 'Signal Processing'] },
  { id: 'rocketry', company: 'ITBA Rocketry Team', tags: ['Next.js', 'React'] },
]
