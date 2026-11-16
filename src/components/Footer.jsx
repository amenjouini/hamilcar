import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../i18n.jsx";
import { brand } from "../content/media.js";
import { Socials } from "./Header.jsx";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={brand.logo} alt="HAMILCAR Logo" width="756" height="201" loading="lazy" />
          <p>{t.home.heroSubtitle}</p>
          <Socials />
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <Link to="/">{t.nav.home}</Link>
          <Link to="/vehicles">{t.nav.vehicles}</Link>
          <Link to="/technology">{t.nav.technology}</Link>
          <Link to="/clients">{t.nav.clients}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
        </nav>
        <ul className="footer__contact">
          <li><MapPin size={16} /> {t.contact.address}</li>
          <li><Phone size={16} /> <a href={brand.phoneHref}>{brand.phone}</a></li>
          <li><Mail size={16} /> <a href={`mailto:${brand.email}`}>{brand.email}</a></li>
        </ul>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HAMILCAR. {t.ui.rights}</p>
          <p className="footer__tagline">{t.ui.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
