export type Job = {
  id: string
  company: string
  tags: string[]
}

// El orden define el de la timeline; los textos están en i18n (exp.<id>)
export const jobs: Job[] = [
  { id: 'devops', company: 'Galo AI', tags: ['Prometheus', 'Loki', 'Grafana', 'Metabase', 'Cloudflare', 'VPS', 'DNS'] },
  { id: 'ai', company: 'Galo AI', tags: ['Python', 'SQL', 'OpenAI / Anthropic APIs', 'RAG', 'Prompt Engineering', 'LLM Ops'] },
  { id: 'fullstack', company: 'CodifyCo', tags: ['React', 'Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Coolify', 'AWS'] },
  { id: 'backend', company: 'Push&Pop', tags: ['Python', 'FastAPI', 'Google ADK', 'PostgreSQL', 'WhatsApp API', 'Telegram API', 'Azure'] },
]
