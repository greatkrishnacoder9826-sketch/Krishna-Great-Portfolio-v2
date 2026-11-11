import { profile } from '../data/profile'
import { asset } from '../utils/url'

export default function Contact() {
  const { email, github, linkedin } = profile.links
  return (
    <section id="contact" className="block" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <p className="sub">For internship opportunities, collaboration, project feedback or professional conversations.</p>
      <div className="glass panel contacts">
        <a className="contactlink" href={`mailto:${email}`}><span className="ico" aria-hidden="true">✉</span><span><small>Email</small><strong>{email}</strong></span></a>
        <a className="contactlink" href={github} target="_blank" rel="noopener noreferrer"><span className="ico" aria-hidden="true">⌘</span><span><small>GitHub</small><strong>@{profile.githubUser} ↗</strong></span></a>
        <a className="contactlink" href={linkedin} target="_blank" rel="noopener noreferrer"><span className="ico" aria-hidden="true">in</span><span><small>LinkedIn</small><strong>Krishna Great ↗</strong></span></a>
        {profile.resume && (
          <a className="contactlink" href={asset(profile.resume)} target="_blank" rel="noopener noreferrer"><span className="ico" aria-hidden="true">↓</span><span><small>Resume</small><strong>View resume (PDF) ↗</strong></span></a>
        )}
      </div>
    </section>
  )
}
