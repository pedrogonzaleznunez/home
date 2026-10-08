export type Project = {
  title: string
  description: { es: string; en: string }
  tags: string[]
  repo?: string // URL del repo en GitHub
  demo?: string // URL de la demo
  image?: string // ruta dentro de /public, ej: 'projects/mi-proyecto.png'
}

// Para mostrar la sección "Proyectos", agregá elementos acá. Vacío = la sección se oculta.
// Ejemplo:
// {
//   title: 'Mi proyecto',
//   description: { es: 'Qué hace…', en: 'What it does…' },
//   tags: ['React', 'FastAPI'],
//   repo: 'https://github.com/pedrogonzaleznunez/mi-proyecto',
// },
export const projects: Project[] = []
