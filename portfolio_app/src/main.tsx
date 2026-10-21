import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// #root ya trae HTML pre-renderizado (scripts/prerender.mjs) para scrapers y buscadores;
// createRoot lo reemplaza por la app interactiva en el idioma del visitante.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
