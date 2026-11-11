import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="block" aria-labelledby="about-title">
      <h2 id="about-title">About</h2>
      <div className="grid2">
        <article className="glass panel">
          <h3>Hi, I’m Krishna</h3>
          <p>{profile.about}</p>
          {profile.achievements.map((a) => (
            <div className="award" key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.note}</p>
            </div>
          ))}
        </article>
        <article className="glass panel">
          <h3>At a glance</h3>
          <dl className="facts">
            <div><dt>Education</dt><dd>{profile.education}</dd></div>
            <div><dt>Focus</dt><dd>AI / ML · GenAI</dd></div>
            <div><dt>Goal</dt><dd>{profile.goal}</dd></div>
            <div><dt>GitHub</dt><dd><a href={profile.links.github} target="_blank" rel="noopener noreferrer">@{profile.githubUser} ↗</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">Krishna Great ↗</a></dd></div>
          </dl>
        </article>
      </div>
    </section>
  )
}
