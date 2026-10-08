# CLAUDE.md

Repo personal de Pedro: su portfolio web y su CV. Se habla en español (rioplatense).

## Estructura

```
CVs/
├── CV_PedroGonzalezNunez_ES.pdf   ← última versión (se genera, NO editar a mano)
├── CV_PedroGonzalezNunez_EN.pdf   ← última versión (se genera, NO editar a mano)
└── latex/
    ├── cv_es.tex / cv_en.tex      ← contenido del CV por idioma
    ├── cv.sty                     ← diseño compartido (márgenes, fuentes, macros)
    ├── photo.jpg
    └── build.sh                   ← compila y copia los PDFs a CVs/
portfolio_app/                     ← web (React + Vite + TS + Tailwind v4)
├── src/i18n/es.ts, en.ts          ← todos los textos de la web por idioma
├── src/data/                      ← experience.ts, skills.ts, projects.ts, profile.ts
└── scripts/sync-cv.mjs            ← copia CVs/*.pdf a public/cv en cada dev/build
.github/workflows/deploy.yml       ← deploy a GitHub Pages en cada push a main
```

Web publicada: https://pedrogonzaleznunez.github.io/home/ (Vite `base: '/home/'`).

## Reglas de trabajo

- **Commit y push directo a `main`**, sin ramas ni PRs.
- **Fuente de verdad de la experiencia laboral: LinkedIn.** Títulos, empresas, tipo de empleo (Part-time, Full-time, Contract, Freelance), fechas y orden tienen que coincidir con LinkedIn, tanto en el CV como en la web.
- **Nada dice "Present"/"Actualidad"** salvo que Pedro siga trabajando ahí.
- **CV ES y EN siempre sincronizados**: mismo contenido, solo traducido. Los títulos de puesto quedan en inglés en ambos (como en LinkedIn).
- **El CV entra en UNA página.** Si se pasa, resumir bullets (Pedro prefiere bullets cortos, 2–3 por trabajo, solo lo importante) antes que achicar la letra.
- Los PDFs de `CVs/` se generan con `build.sh`; la web los toma de ahí (no hay copias versionadas en `portfolio_app/public/cv/`, está en `.gitignore`).
- Puede haber otras sesiones editando en paralelo: antes de commitear, revisar `git status`/`git diff` y no incluir cambios ajenos sin avisar.

## Flujo: actualizar experiencia / CV (ambos idiomas + web)

1. **CV en LaTeX** — editar `CVs/latex/cv_en.tex` y `CVs/latex/cv_es.tex` (los dos).
   - La experiencia va en filas de dos trabajos alineados, en el orden de LinkedIn:
     ```latex
     \explabel{Professional Experience}
     \jobrow{%
       \job{Puesto}{Empresa | Tipo | Mes Año -- Mes Año}
           {Tecnologías.}{
           \item ...
         }%
     }{%
       \job{...}{...}{...}{ \item ... }%
     }
     ```
   - Otras macros (en `cv.sty`): `\cvsection{TÍTULO}{...}`, `\edu{Institución}{Detalle | fechas}`,
     `\inlinelist{a}{b}{c}`, `\lang{Idioma}{Nivel}`.
   - Escapar `&` como `\&` y `#` como `\#`.
2. **Compilar**: `./CVs/latex/build.sh` (o `./CVs/latex/build.sh en` para uno solo).
   Reemplaza `CVs/CV_PedroGonzalezNunez_{ES,EN}.pdf` y avisa si alguno tiene más de 1 página.
3. **Revisar visualmente** los PDFs (p. ej. `pdftoppm -r 80 -png CVs/CV_PedroGonzalezNunez_EN.pdf /tmp/cv`
   y mirar la imagen): alineación de filas, que nada se corte, 1 página.
4. **Web** — reflejar los mismos cambios:
   - `portfolio_app/src/data/experience.ts`: lista de trabajos (`id`, `company`, `tags`) en orden LinkedIn.
     Si se agrega un trabajo, sumar su id al tipo `JobId`.
   - `portfolio_app/src/i18n/es.ts` y `en.ts` → `exp.jobs.<id>`: `role`, `type`, `date`, `bullets`.
     Los `bullets` son **los mismos que en el CV** (cortos, 2–3 por trabajo).
   - Si cambian los puestos actuales: `hero.roles` (texto rotativo del hero) en ambos idiomas,
     el contador de `About.tsx` (`STATS`) y `<title>`/description en `portfolio_app/index.html`.
   - Skills / idiomas / educación de la web: `src/data/skills.ts` y `edu` en `i18n/*.ts`.
5. **Verificar la web**: `cd portfolio_app && npm run build` (corre `sync-cv` + `tsc` + vite) sin errores.
   Para mirarla: `npm run dev` y abrir http://localhost:5173/home/.
6. **Commit + push a `main`**. El workflow despliega solo; se puede seguir con
   `gh run watch $(gh run list --limit 1 --json databaseId -q '.[0].databaseId')`.

## Otros

- Proyectos: agregar elementos en `portfolio_app/src/data/projects.ts`; con la lista vacía la sección no se muestra.
- Requiere LaTeX con `latexmk` (instalado vía Homebrew `texlive`) y Node 22+.
