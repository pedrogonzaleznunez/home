export type SkillGroup = {
  id: 'languages' | 'frontend' | 'backend' | 'databases' | 'cloud' | 'ai' | 'testing' | 'hardware'
  items: string[]
  // tamaño en el bento grid (columnas en desktop)
  span?: 1 | 2
}

export const skillGroups: SkillGroup[] = [
  { id: 'ai', items: ['RAG', 'Embeddings / pgvector', 'AI Agents', 'Multi-agent systems', 'Google ADK', 'MCP', 'Tool calling', 'Structured outputs', 'Prompt engineering', 'LLM evals'], span: 2 },
  { id: 'languages', items: ['TypeScript', 'Python', 'Java', 'JavaScript', 'SQL', 'C', 'C#'] },
  { id: 'cloud', items: ['Docker', 'Coolify', 'Linux / VPS', 'CI/CD', 'AWS', 'Azure', 'Cloudflare', 'Prometheus', 'Loki', 'Grafana', 'Git'] },
  { id: 'backend', items: ['Node.js', 'NestJS', 'Express', 'FastAPI', 'Spring Boot', 'Django', 'REST APIs', 'Webhooks'], span: 2 },
  { id: 'frontend', items: ['React', 'Next.js', 'React Native', 'iOS'] },
  { id: 'databases', items: ['PostgreSQL', 'pgvector', 'MySQL', 'MongoDB', 'Prisma', 'Kafka', 'RabbitMQ', 'Metabase'] },
  { id: 'testing', items: ['Unit', 'Integration', 'E2E', 'Jest', 'Cypress', 'Mercado Pago', 'WhatsApp API'], span: 2 },
  { id: 'hardware', items: ['Arduino', 'ESP32', 'Raspberry Pi'], span: 2 },
]

// Para el marquee
export const marqueeTech = [
  'TypeScript', 'Python', 'React', 'Next.js', 'NestJS', 'FastAPI', 'PostgreSQL', 'Docker',
  'AWS', 'Azure', 'Cloudflare', 'Grafana', 'Prometheus', 'Prisma', 'pgvector', 'Kafka', 'OpenAI', 'Anthropic', 'Google ADK', 'MCP',
]
