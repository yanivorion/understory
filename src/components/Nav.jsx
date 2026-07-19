import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const dark = !scrolled && isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-700 ${
        scrolled ? "bg-parchment/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`h-px w-full transition-colors duration-700 ${
          scrolled ? "bg-line" : "bg-transparent"
        }`}
      />
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 md:py-6">
        <Link
          to="/"
          className={`font-display text-[19px] md:text-[21px] tracking-[0.02em] transition-colors duration-500 ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          Understory
        </Link>

        <div
          className={`hidden md:flex items-center gap-9 meta-row transition-colors duration-500 ${
            dark ? "text-paper/85" : "text-ink-soft"
          }`}
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative pb-1 hover:opacity-100 transition-opacity ${
                  isActive ? "opacity-100" : "opacity-70"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-px ${
                      dark ? "bg-paper" : "bg-clay"
                    } transition-transform origin-left duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className={`ml-2 px-4 py-2 border rounded-full transition-colors duration-500 ${
              dark
                ? "border-paper/50 text-paper hover:bg-paper hover:text-forest"
                : "border-ink/30 text-ink hover:bg-ink hover:text-parchment"
            }`}
          >
            Book a Session
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden flex flex-col gap-[5px] p-2 ${dark ? "text-paper" : "text-ink"}`}
        >
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out bg-parchment ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-6 pb-8 pt-2 meta-row text-ink-soft">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="opacity-80">
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="text-clay">
            Book a Session
          </Link>
        </div>
      </div>
    </header>
  );
}
