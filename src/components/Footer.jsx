import { Link } from 'react-router-dom'
import { useSiteConfig } from '../lib/ConfigProvider'
import { useTextStyle } from './StyledText'

export default function Footer() {
  const { config } = useSiteConfig()
  const { tagline, bottomNote } = config.footer
  const { email, phone, addressLine1, addressLine2 } = config.contact
  const taglineStyle = useTextStyle('footer.tagline')
  const bottomNoteStyle = useTextStyle('footer.bottomNote')
  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="mx-auto max-w-container px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-3xl text-paper">Understory</p>
            <p className="prose-serif mt-5 max-w-sm" style={taglineStyle}>
              {tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow text-mist">Wander</p>
            <ul className="mt-5 space-y-3">
              {[
                ['Home', '/'],
                ['Journeys', '/collection'],
                ['About', '/about'],
                ['Contact', '/contact'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="prose-serif text-fog/75 transition-colors hover:text-amber">
                    <span className="font-light">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-mist">Reach</p>
            <ul className="mt-5 space-y-3 meta text-fog/70">
              <li>{addressLine1}</li>
              <li>{addressLine2}</li>
              <li className="pt-2">
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="transition-colors hover:text-amber">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-amber">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="meta text-mist/60">© {new Date().getFullYear()} Understory</p>
          <p className="meta" style={bottomNoteStyle}>
            {bottomNote}
          </p>
        </div>
      </div>
    </footer>
  )
}
