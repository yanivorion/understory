import { Link } from "react-router-dom";
import { contactDetails } from "../lib/content";

export default function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-16 border-b border-line-dark">
          <div className="md:col-span-5">
            <div className="font-display text-[28px] tracking-[0.02em] mb-5">Understory</div>
            <p className="text-paper/70 font-body text-[15px] leading-relaxed max-w-sm">
              Return to what remembers you. Guided journeys where nature and sound meet the self.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <div className="eyebrow text-paper/45 mb-4">Explore</div>
            <ul className="flex flex-col gap-3 meta-row text-paper/80">
              <li><Link to="/collection" className="hover:text-clay-soft transition-colors">Collection</Link></li>
              <li><Link to="/about" className="hover:text-clay-soft transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-clay-soft transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow text-paper/45 mb-4">Reach Us</div>
            <ul className="flex flex-col gap-3 meta-row text-paper/80">
              <li>{contactDetails.address[0]}</li>
              <li>{contactDetails.address[1]}</li>
              <li>
                <a href={`tel:${contactDetails.phone}`} className="hover:text-clay-soft transition-colors">
                  {contactDetails.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactDetails.email}`} className="hover:text-clay-soft transition-colors">
                  {contactDetails.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-8 meta-row text-paper/40">
          <span>&copy; {new Date().getFullYear()} Understory. Held gently, not hurried.</span>
          <span>Ein Gedi &middot; Yatir &middot; Jerusalem Hills &middot; Negev</span>
        </div>
      </div>
    </footer>
  );
}
