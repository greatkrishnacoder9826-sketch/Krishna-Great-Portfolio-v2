import { useMemo, useState } from 'react'
import { projects } from '../data/projects'
import { categories, statuses } from '../data/categories'
import ProjectCard from '../components/ProjectCard.jsx'

const rank = (s) => { const i = statuses.findIndex((x) => x.id === s); return i < 0 ? 99 : i }

export default function Projects() {
  const [cat, setCat] = useState('all')
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')

  // Only show categories/statuses that actually have projects, so adding a project can make a new filter appear.
  const usedCats = categories.filter((c) => projects.some((p) => p.category.includes(c.id)))
  const usedStatuses = statuses.filter((s) => projects.some((p) => p.status === s.id))

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase()
    return projects
      .filter((p) => cat === 'all' || p.category.includes(cat))
      .filter((p) => status === 'all' || p.status === status)
      .filter((p) => !term || [p.name, p.summary, ...p.technologies, ...p.category].join(' ').toLowerCase().includes(term))
      .sort((a, b) => rank(a.status) - rank(b.status) || a.name.localeCompare(b.name))
  }, [cat, status, q])

  return (
    <section id="projects" className="block" aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>
      <p className="sub">Open any card for its overview, technologies, workflow, features and links. </p>
      <div className="tools">
        <div className="filters" role="group" aria-label="Filter by category">
          {[{ id: 'all', label: 'All' }, ...usedCats].map((c) => (
            <button key={c.id} className="filter" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </div>
        <div className="search">
          <label className="sr" htmlFor="q">Search projects</label>
          <input id="q" type="search" placeholder="Search projects or technologies" value={q} onChange={(e) => setQ(e.target.value)} />
          <label className="sr" htmlFor="st">Filter by status</label>
          <select id="st" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            {usedStatuses.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <p className="sr" role="status" aria-live="polite">{shown.length} projects shown</p>
      {shown.length ? (
        <div className="cards">{shown.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
      ) : (
        <p className="empty">No projects match your filters.</p>
      )}
    </section>
  )
}
