import { lazy, Suspense, useEffect, useState } from 'react'
import { projects } from './data/projects'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import GitHubActivity from './sections/GitHubActivity.jsx'
import Contact from './sections/Contact.jsx'
import { profile } from './data/profile'

const ProjectModal = lazy(() => import('./components/ProjectModal.jsx'))

// Project deep links use the hash (#/project/<id>), which works on GitHub Pages without server rewrites.
const readId = () => (window.location.hash.match(/^#\/project\/([\w-]+)/) || [])[1] || null

export default function App() {
  const [activeId, setActiveId] = useState(readId)

  useEffect(() => {
    const onHash = () => setActiveId(readId())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const active = projects.find((p) => p.id === activeId)
  const close = () => {
    window.location.hash = '#projects'
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="wrap">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Contact />
      </main>
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} {profile.brand}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
      {active && (
        <Suspense fallback={null}>
          <ProjectModal project={active} onClose={close} />
        </Suspense>
      )}
    </>
  )
}
