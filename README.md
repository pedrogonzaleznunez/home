# home

Portfolio personal de Pedro González Núñez — React + Vite + Tailwind, con autómatas celulares (Conway, Day & Night, Brian's Brain, Langton's Ant) de fondo.

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
```

- Textos (ES / EN): `src/i18n/es.ts` y `src/i18n/en.ts`
- Experiencia, skills y proyectos: `src/data/`
- Proyectos: agregá elementos a `src/data/projects.ts` y la sección aparece sola
- CVs descargables: `public/cv/`

Deploy automático a GitHub Pages en cada push a `main` (`.github/workflows/deploy.yml`).
Requiere *Settings → Pages → Source: GitHub Actions*.
