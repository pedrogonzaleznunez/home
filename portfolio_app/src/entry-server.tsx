// Entrada para el pre-render en build (scripts/prerender.mjs): genera el HTML estático y llms.txt
import { renderToString } from 'react-dom/server'
import App from './App'
import { en } from './i18n/en'
import { jobs } from './data/experience'
import { skillGroups } from './data/skills'
import { profile } from './data/profile'

export const render = () => renderToString(<App />)

export function llmsTxt(siteUrl: string) {
  const cv = (lang: string) => `${siteUrl}cv/CV_PedroGonzalezNunez_${lang}.pdf`
  return [
    `# ${profile.name}`,
    '',
    `> ${en.hero.lead}`,
    '',
    en.about.p1,
    '',
    en.about.p2,
    '',
    `Target roles: ${en.hero.roles.slice(0, 3).join(', ')}.`,
    '',
    '## Links',
    '',
    `- [CV (English, PDF)](${cv('EN')})`,
    `- [CV (Spanish, PDF)](${cv('ES')})`,
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${profile.github})`,
    `- Email: ${profile.email}`,
    `- Location: ${profile.location}`,
    '',
    '## Experience',
    '',
    ...jobs.flatMap((j) => {
      const t = en.exp.jobs[j.id]
      return [
        `### ${t.role} — ${j.company} (${t.type}, ${t.date})`,
        '',
        ...t.bullets.map((b) => `- ${b}`),
        `- Technologies: ${j.tags.join(', ')}`,
        '',
      ]
    }),
    '## Skills',
    '',
    ...skillGroups.map((g) => `- ${en.skills.groups[g.id]}: ${g.items.join(', ')}`),
    '',
    '## Education',
    '',
    ...en.edu.items.map((e) => `- ${e.title} — ${e.place} (${e.date})`),
    '',
    '## Languages',
    '',
    ...en.edu.languages.map((l) => `- ${l.name}: ${l.level}`),
    '',
  ].join('\n')
}
