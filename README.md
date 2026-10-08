# home

| Carpeta | Qué hay |
|---|---|
| [`portfolio_app/`](portfolio_app) | Portfolio web (React + Vite + Tailwind) con autómatas celulares de fondo |
| [`CVs/`](CVs) | Últimas versiones del CV en PDF (ES / EN) y su código LaTeX |

## Portfolio

```bash
cd portfolio_app
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
```

- Textos (ES / EN): `src/i18n/es.ts` y `src/i18n/en.ts`
- Experiencia, skills y proyectos: `src/data/`
- Proyectos: agregá elementos a `src/data/projects.ts` y la sección aparece sola
- Los CVs descargables se copian desde `/CVs` en cada `dev`/`build`

Deploy automático a GitHub Pages en cada push a `main` (`.github/workflows/deploy.yml`).
Requiere *Settings → Pages → Source: GitHub Actions*.

## CV

Ver [`CVs/README.md`](CVs/README.md). Resumen: editar `CVs/latex/cv_*.tex` → `./CVs/latex/build.sh` → push.
