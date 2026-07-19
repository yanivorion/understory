import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="mx-auto max-w-container px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-3xl text-paper">Understory</p>
            <p className="prose-serif mt-5 max-w-sm text-fog/70">
              Guided journeys where nature and sound meet the self. Not an escape — an arrival.
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
              <li>500 Terry Francine St</li>
              <li>San Francisco, CA 94158</li>
              <li className="pt-2">
                <a href="tel:1234567890" className="transition-colors hover:text-amber">
                  123-456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@mysite.com" className="transition-colors hover:text-amber">
                  info@mysite.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="meta text-mist/60">© {new Date().getFullYear()} Understory</p>
          <p className="meta text-mist/60">Return to what remembers you</p>
        </div>
      </div>
    </footer>
  )
}
