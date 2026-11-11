import { profile } from '../data/profile'
import { asset } from '../utils/url'

// Static geometry for the HUD wheel (viewBox 400x400, centre 200,200).
const C = 200
const pt = (r, deg) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)]
const ticks = Array.from({ length: 120 }, (_, i) => {
  const long = i % 5 === 0
  const [x1, y1] = pt(long ? 184 : 188, i * 3)
  const [x2, y2] = pt(196, i * 3)
  return { x1, y1, x2, y2, long }
})
const nodes = Array.from({ length: 6 }, (_, i) => pt(102, i * 60 - 90))
const lines = nodes.map((n, i) => [n, nodes[(i + 2) % 6]])

function Wheel() {
  return (
    <svg className="wheel" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9cff72" stopOpacity=".0" />
          <stop offset="1" stopColor="#9cff72" stopOpacity=".38" />
        </linearGradient>
        <radialGradient id="coreFill" cx=".35" cy=".25" r=".9">
          <stop offset="0" stopColor="#9cff72" stopOpacity=".18" />
          <stop offset="1" stopColor="#08100a" stopOpacity=".95" />
        </radialGradient>
        <clipPath id="photoClip"><circle cx={C} cy={C} r="62" /></clipPath>
      </defs>

      <g className="g-ticks" stroke="#9cff72" strokeLinecap="round">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.long ? 2 : 1} opacity={t.long ? 0.7 : 0.4} />
        ))}
      </g>
      <circle cx={C} cy={C} r="178" fill="none" stroke="#9cff72" strokeOpacity=".5" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
      <circle cx={C} cy={C} r="160" fill="none" stroke="#9cff72" strokeOpacity=".28" />
      <circle cx={C} cy={C} r="132" fill="none" stroke="#9cff72" strokeOpacity=".22" />

      <g className="g-sweep">
        <path d={`M${C} ${C} L${C + 160} ${C} A160 160 0 0 0 ${pt(160, -62)[0]} ${pt(160, -62)[1]} Z`} fill="url(#sweep)" />
        <circle cx={C + 142} cy={C - 55} r="4" fill="#9cff72" className="blip" />
      </g>

      <g className="g-arcs" fill="none" stroke="#9cff72" strokeWidth="7" strokeLinecap="round" filter="url(#none)">
        <circle cx={C} cy={C} r="118" strokeDasharray="88 34 52 34 70 34 40 34" />
      </g>

      <g className="g-hex" stroke="#9cff72" strokeOpacity=".45">
        {lines.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />)}
        {nodes.map((n, i) => <circle key={i} cx={n[0]} cy={n[1]} r="3.2" fill="#d4ffc2" stroke="none" />)}
      </g>

      <g className="g-node">
        <circle cx={C - 150} cy={C - 40} r="13" fill="none" stroke="#9cff72" strokeOpacity=".8" />
        <circle cx={C - 150} cy={C - 40} r="6" fill="#9cff72" />
      </g>
      <circle cx={C} cy={C + 160} r="12" fill="none" stroke="#9cff72" strokeOpacity=".8" />
      <circle cx={C} cy={C + 160} r="5.5" fill="#9cff72" />

      <circle cx={C} cy={C} r="66" fill="url(#coreFill)" stroke="#9cff72" strokeWidth="2.5" className="core-ring" />
      <circle cx={C} cy={C} r="54" fill="none" stroke="#9cff72" strokeOpacity=".25" strokeDasharray="2 4" />
      {profile.photo ? (
        <image href={asset(profile.photo)} x={C - 62} y={C - 62} width="124" height="124" preserveAspectRatio="xMidYMid slice" clipPath="url(#photoClip)" />
      ) : (
        <>
          <text x={C} y={C + 14} textAnchor="middle" className="wheel-k">KG</text>
          <text x={C} y={C + 34} textAnchor="middle" className="wheel-sub">KRISHNA_GREAT</text>
        </>
      )}
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow"><i className="dot" aria-hidden="true" /> {profile.role}</p>
        <h1 id="hero-title">Ideas into <span>intelligent</span> systems.</h1>
        <p className="lead">{profile.intro}</p>
        <div className="actions">
          <a className="btn primary" href="#projects">Explore projects ↗</a>
          <a className="btn" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub profile ↗</a>
          {profile.resume && (
            <a className="btn" href={asset(profile.resume)} target="_blank" rel="noopener noreferrer">Resume ↗</a>
          )}
        </div>
      </div>
      <div className="visual" aria-hidden="true">
        <Wheel />
        <span className="pill p1">FOCUS <b>AI / ML</b></span>
        <span className="pill p2">STACK <b>PYTHON</b></span>
        <span className="pill p3">MODE <b>BUILDING</b></span>
        <span className="pill p4">GOAL <b>INTERNSHIP</b></span>
      </div>
    </section>
  )
}
