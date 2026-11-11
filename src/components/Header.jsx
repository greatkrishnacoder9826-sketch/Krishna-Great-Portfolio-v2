import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const items = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['github', 'GitHub'], ['contact', 'Contact']]

export default function Header() {
  const [current, setCurrent] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    )
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <header className="wrap">
      <div className="topbar glass">
        <a className="brand" href="#top">{profile.brand.split('_')[0]}<span>_{profile.brand.split('_')[1]}</span></a>
        <nav aria-label="Primary">
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={current === id ? 'true' : undefined}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
