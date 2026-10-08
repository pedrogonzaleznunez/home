import { LangProvider } from './i18n/LangContext'
import { LifeCanvas } from './life/LifeCanvas'
import { LifeControls } from './life/LifeControls'
import { projects } from './data/projects'
import { SmoothScroll } from './components/SmoothScroll'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Terminal } from './components/Terminal'
import { GithubActivity } from './components/GithubActivity'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { profile } from './data/profile'

export default function App() {
  // numeración de secciones: "Proyectos" solo cuenta si tiene contenido
  const offset = projects.length ? 1 : 0

  return (
    <LangProvider>
      <SmoothScroll />
      <LifeCanvas />
      <Cursor />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Terminal />
        <GithubActivity />
        <Projects index={5} />
        <Education index={5 + offset} />
        <Contact index={6 + offset} />
      </main>
      <footer className="relative z-[2] px-4 pt-7 pb-24 text-center font-mono text-xs text-muted sm:px-12">
        © {new Date().getFullYear()} {profile.name} · built with React + a few cellular automata
      </footer>
      <LifeControls />
    </LangProvider>
  )
}
