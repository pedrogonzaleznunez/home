# CVs

- `CV_PedroGonzalezNunez_ES.pdf` — última versión en español
- `CV_PedroGonzalezNunez_EN.pdf` — última versión en inglés
- `latex/` — código fuente

## Cómo actualizar el CV

1. Editá el contenido en `latex/cv_es.tex` y/o `latex/cv_en.tex`.
   El diseño (márgenes, fuentes, columnas) está en `latex/cv.sty` y es compartido.
2. Compilá:
   ```bash
   ./CVs/latex/build.sh        # ambos idiomas
   ./CVs/latex/build.sh en     # solo uno
   ```
   Los PDFs se reemplazan solos en esta carpeta. Si alguno pasa de 1 página, el script avisa.
3. Commit + push: la web (`portfolio_app`) usa estos mismos PDFs para el botón "Descargar CV".

### Macros útiles (en `cv.sty`)

| Macro | Uso |
|---|---|
| `\job{Puesto}{Empresa \| fechas}{Tecnologías}{\item ... }` | un trabajo |
| `\nextcolumn` | pasa a la columna derecha dentro de `experience` |
| `\edu{Institución}{Detalle \| fechas}` | un estudio |
| `\cvsection{TÍTULO}{contenido}` | sección con título a la izquierda |

Requiere una distribución de LaTeX con `latexmk` (por ejemplo `brew install texlive` o MacTeX).
