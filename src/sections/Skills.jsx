import { profile } from '../data/profile'

export default function Skills() {
  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <h2 id="skills-title">Skills</h2>
      <p className="sub">I have the knowledge and experience in the following areas:</p>
      <div className="skills">
        {profile.skills.map((g) => (
          <article className="glass panel" key={g.group}>
            <h3>{g.group}</h3>
            <ul className="chips">{g.items.map((s) => <li className="chip" key={s}>{s}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
