import { useEffect, useRef, useState } from 'react'
import { categories, statuses } from '../data/categories'
import { profile } from '../data/profile'

const TABS = [
  ['overview', 'Overview'],
  ['tech', 'Technologies'],
  ['workflow', 'Architecture / Workflow'],
  ['features', 'Features'],
  ['challenges', 'Challenges & Solutions'],
  ['results', 'Results'],
  ['links', 'Project Links'],
]

const Empty = () => <p className="empty">This section hasn’t been published yet. It will appear once the details are verified.</p>
const List = ({ items, ordered }) => {
  if (!items?.length) return <Empty />
  const Tag = ordered ? 'ol' : 'ul'
  return <Tag className="plain">{items.map((x) => <li key={x}>{x}</li>)}</Tag>
}
const lab = (list, id) => list.find((x) => x.id === id)?.label || id
const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Panel({ id, p }) {
  const l = p.links || {}
  switch (id) {
    case 'overview':
      return (
        <>
          <p>{p.description || p.summary}</p>
          {p.problem && <><h4>Problem</h4><p>{p.problem}</p></>}
          {p.objectives?.length > 0 && <><h4>Objectives</h4><List items={p.objectives} /></>}
          <h4>Category</h4>
          <ul className="chips">{p.category.map((c) => <li className="chip" key={c}>{lab(categories, c)}</li>)}</ul>
        </>
      )
    case 'tech':
      return p.technologies?.length ? <ul className="chips">{p.technologies.map((t) => <li className="chip" key={t}>{t}</li>)}</ul> : <Empty />
    case 'workflow': return <List items={p.architecture} ordered />
    case 'features': return <List items={p.features} />
    case 'challenges':
      return p.challenges?.length ? (
        <ul className="plain">{p.challenges.map((c) => (
          <li key={c.challenge}><strong>Challenge:</strong> {c.challenge}<br /><strong>Solution:</strong> {c.solution}</li>
        ))}</ul>
      ) : <Empty />
    case 'results': return <List items={p.results} />
    default: {
      const rel = l.related || []
      const any = l.repo || l.demo || l.docs || rel.length
      return (
        <ul className="plain linklist">
          {l.repo && <li><a className="btn" href={l.repo} {...ext}>GitHub repository ↗</a></li>}
          {l.demo && <li><a className="btn primary" href={l.demo} {...ext}>Live demo ↗</a></li>}
          {l.docs && <li><a className="btn" href={l.docs} {...ext}>Documentation ↗</a></li>}
          {rel.map((r) => <li key={r.url}><a className="btn" href={r.url} {...ext}>{r.label} ↗</a></li>)}
          {!l.repo && <li className="empty">Repository link not confirmed yet. <a href={profile.links.github} {...ext}>Browse my GitHub profile ↗</a></li>}
          {!any && null}
        </ul>
      )
    }
  }
}

export default function ProjectModal({ project: p, onClose }) {
  const [i, setI] = useState(0)
  const dialog = useRef(null)
  const tabRefs = useRef([])
  const opener = useRef(document.activeElement)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab') return
      const f = [...dialog.current.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')]
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const el = opener.current
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      el?.focus?.()
    }
  }, [onClose])

  const go = (n) => { const k = (n + TABS.length) % TABS.length; setI(k); tabRefs.current[k]?.focus() }
  const onTabKey = (e) => {
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }
    if (e.key in map) { e.preventDefault(); go(map[e.key]) }
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal glass" role="dialog" aria-modal="true" aria-labelledby="pm-title" tabIndex={-1} ref={dialog}>
        <header className="mhead">
          <div>
            <span className={`badge s-${p.status}`}>{lab(statuses, p.status)}</span>
            <h2 id="pm-title">{p.name}</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close project details">✕</button>
        </header>
        <div className="tabs" role="tablist" aria-label="Project sections" onKeyDown={onTabKey}>
          {TABS.map(([id, text], k) => (
            <button key={id} role="tab" id={`tab-${id}`} aria-selected={i === k} aria-controls={`panel-${id}`}
              tabIndex={i === k ? 0 : -1} ref={(el) => (tabRefs.current[k] = el)} onClick={() => setI(k)}>{text}</button>
          ))}
        </div>
        <div className="mbody" role="tabpanel" id={`panel-${TABS[i][0]}`} aria-labelledby={`tab-${TABS[i][0]}`} tabIndex={0} key={TABS[i][0]}>
          <Panel id={TABS[i][0]} p={p} />
        </div>
        <footer className="mfoot">
          <button className="btn" onClick={() => go(i - 1)} disabled={i === 0}>← Previous</button>
          <span aria-hidden="true">{i + 1} / {TABS.length}</span>
          <button className="btn primary" onClick={() => go(i + 1)} disabled={i === TABS.length - 1}>Next →</button>
        </footer>
      </div>
    </div>
  )
}
