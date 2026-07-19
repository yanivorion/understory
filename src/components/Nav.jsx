import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/collection', label: 'Journeys' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-breath ${
        scrolled ? 'bg-ink/85 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-container items-center justify-between px-6 md:px-10">
        <Link to="/" className="group flex items-center gap-3" aria-label="Understory home">
          <span className="display text-lg tracking-wide text-paper transition-colors group-hover:text-amber">
            Understory
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `meta transition-colors hover:text-amber ${
                  isActive ? 'text-amber' : 'text-paper/70'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="meta rounded-full border border-paper/25 px-5 py-2 text-paper/90 transition-all duration-500 hover:border-amber hover:text-amber"
          >
            Book a Session
          </Link>
        </div>

        <button
          className="meta text-paper/80 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div className="mx-6 mt-4 rounded-2xl border border-paper/10 bg-ink/95 p-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="meta text-paper/80">
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="meta text-amber">
              Book a Session
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
