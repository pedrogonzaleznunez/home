export type SkillGroup = {
  id: 'languages' | 'frontend' | 'backend' | 'databases' | 'cloud' | 'ai' | 'testing' | 'hardware'
  items: string[]
  // tamaño en el bento grid (columnas en desktop)
  span?: 1 | 2
}

export const skillGroups: SkillGroup[] = [
  { id: 'ai', items: ['RAG', 'AI Agents', 'Tool calling', 'Structured outputs', 'LLM evals', 'Prompt engineering', 'Google ADK'], span: 2 },
  { id: 'languages', items: ['TypeScript', 'Python', 'JavaScript', 'Java', 'C', 'C#', 'HTML', 'CSS'] },
  { id: 'cloud', items: ['AWS', 'Azure', 'Docker', 'Cloudflare', 'Grafana', 'Prometheus', 'Loki', 'Git'] },
  { id: 'backend', items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'Django', 'Spring Boot'], span: 2 },
  { id: 'frontend', items: ['React', 'Next.js', 'React Native', 'iOS'] },
  { id: 'databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite3', 'Prisma'] },
  { id: 'testing', items: ['Unit', 'Integration', 'E2E', 'Jest', 'Cypress'], span: 2 },
  { id: 'hardware', items: ['Arduino', 'ESP32', 'Raspberry Pi'], span: 2 },
]

// Para el marquee
export const marqueeTech = [
  'TypeScript', 'Python', 'React', 'Next.js', 'NestJS', 'FastAPI', 'PostgreSQL', 'Docker',
  'AWS', 'Azure', 'Cloudflare', 'Grafana', 'Prometheus', 'Prisma', 'OpenAI', 'Anthropic', 'Google ADK',
]
