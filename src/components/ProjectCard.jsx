import { categories, statuses } from '../data/categories'

const label = (list, id) => list.find((x) => x.id === id)?.label || id

export default function ProjectCard({ project: p }) {
  return (
    <article className={`glass card ${p.status === 'featured' ? 'featured' : ''}`}>
      <div className="cardtop">
        <span className={`badge s-${p.status}`}>{label(statuses, p.status)}</span>
        <span className="type">{label(categories, p.category[0])}</span>
      </div>
      <h3>
        <a className="stretch" href={`#/project/${p.id}`} aria-haspopup="dialog">{p.name}</a>
      </h3>
      <p>{p.summary}</p>
      <ul className="chips" aria-label="Technologies">
        {p.technologies.map((t) => <li className="chip" key={t}>{t}</li>)}
      </ul>
      <span className="more" aria-hidden="true">View details →</span>
    </article>
  )
}
