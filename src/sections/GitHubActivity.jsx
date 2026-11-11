import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const KEY = 'kg-gh-repos-v2'
const API = `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`

export default function GitHubActivity() {
  const [state, setState] = useState({ status: 'loading', repos: [] })

  useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(KEY))
      if (cached) { setState({ status: 'ok', repos: cached }); return }
    } catch { /* storage unavailable: continue */ }

    const ctrl = new AbortController()
    fetch(API, { signal: ctrl.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => { if (!r.ok) throw new Error(`GitHub API ${r.status}`); return r.json() })
      .then((data) => {
        const repos = data.filter((r) => !r.fork).slice(0, 15).map((r) => ({
          id: r.id, name: r.name, description: r.description, language: r.language, stars: r.stargazers_count, url: r.html_url,
        }))
        try { sessionStorage.setItem(KEY, JSON.stringify(repos)) } catch { /* ignore */ }
        setState({ status: 'ok', repos })
      })
      .catch((e) => { if (e.name !== 'AbortError') setState({ status: 'error', repos: [] }) })
    return () => ctrl.abort()
  }, [])

  const hidden = profile.hiddenRepos.map((n) => n.toLowerCase())
  const repos = state.repos.filter((r) => !hidden.includes(r.name.toLowerCase())).slice(0, 6)

  return (
    <section id="github" className="block" aria-labelledby="gh-title">
      <h2 id="gh-title">GitHub</h2>
      <p className="sub">Recently active  repositories, loaded live from GitHub.</p>
      {state.status === 'loading' && <p className="empty" role="status">Loading repositories…</p>}
      {state.status === 'error' && (
        <div className="glass panel" role="status">
          <p>Live repository data couldn’t be loaded right now (GitHub may be rate-limiting requests). All my public work is on my profile.</p>
        </div>
      )}
      {state.status === 'ok' && !repos.length && <p className="empty">No public repositories to show yet.</p>}
      {repos.length > 0 && (
        <ul className="repos">
          {repos.map((r) => (
            <li className="glass panel repo" key={r.id}>
              <h3><a href={r.url} target="_blank" rel="noopener noreferrer">{r.name} ↗</a></h3>
              <p>{r.description || 'No description provided.'}</p>
              <small>{r.language || 'Language not detected'}{r.stars ? ` · ★ ${r.stars}` : ''}</small>
            </li>
          ))}
        </ul>
      )}
      <p className="actions"><a className="btn" href={profile.links.github} target="_blank" rel="noopener noreferrer">View all on GitHub ↗</a></p>
    </section>
  )
}
