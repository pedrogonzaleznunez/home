#!/usr/bin/env bash
# Compila el CV en ES y EN y deja los PDFs finales en /CVs.
# Uso:  ./build.sh        (ambos idiomas)
#       ./build.sh es     (solo español)
#       ./build.sh en     (solo inglés)
set -euo pipefail
cd "$(dirname "$0")"

if [ $# -eq 0 ]; then langs=(es en); else langs=("$@"); fi

for lang in "${langs[@]}"; do
  echo "→ compilando cv_${lang}.tex"
  latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=build "cv_${lang}.tex" > /dev/null 2>&1 \
    || { echo "  ✗ error, ver build/cv_${lang}.log"; exit 1; }
  upper=$(echo "$lang" | tr '[:lower:]' '[:upper:]')
  cp "build/cv_${lang}.pdf" "../CV_PedroGonzalezNunez_${upper}.pdf"

  pages=$(pdfinfo "build/cv_${lang}.pdf" 2>/dev/null | awk '/^Pages:/{print $2}' || true)
  if [ -n "${pages:-}" ] && [ "$pages" != "1" ]; then
    echo "  ⚠️  cv_${lang}.pdf tiene ${pages} páginas"
  fi
  echo "  ✓ CVs/CV_PedroGonzalezNunez_${upper}.pdf"
done
