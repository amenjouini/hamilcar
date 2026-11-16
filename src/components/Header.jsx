import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n.jsx";
import { brand } from "../content/media.js";
import { FacebookIcon, FlagEN, FlagFR, LinkedinIcon } from "./Flags.jsx";

const LINKS = [
  { to: "/", key: "home" },
  { to: "/vehicles", key: "vehicles" },
  { to: "/technology", key: "technology" },
  { to: "/clients", key: "clients" },
  { to: "/contact", key: "contact" },
];

const LANGS = [
  { code: "fr", name: "Français", Flag: FlagFR },
  { code: "en", name: "English", Flag: FlagEN },
];

function LanguageSelector() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const Current = (LANGS.find((l) => l.code === lang) || LANGS[1]).Flag;

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__current"
        aria-label={t.ui.changeLanguage}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Current className="flag" />
        <ChevronDown size={14} className={open ? "is-open" : ""} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="lang__menu"
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {LANGS.map(({ code, name, Flag }) => (
              <button
                key={code}
                type="button"
                role="menuitem"
                className={code === lang ? "is-active" : ""}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
              >
                <Flag className="flag" />
                <span>{name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Socials({ className = "" }) {
  return (
    <div className={`socials ${className}`}>
      <a href={brand.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FacebookIcon />
      </a>
      <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <LinkedinIcon />
      </a>
    </div>
  );
}

export { Socials };

export default function Header() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || !overHero || menuOpen;

  return (
    <>
    <header className={`header ${solid ? "header--solid" : ""}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="HAMILCAR">
          <img src={brand.logo} alt="HAMILCAR Logo" width="756" height="201" />
        </Link>

        <nav className="nav" aria-label="Main">
          <ul>
            {LINKS.map(({ to, key }) => (
              <li key={key}>
                <NavLink to={to} end={to === "/"} className={({ isActive }) => (isActive ? "is-active" : "")}>
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__tools">
          <Socials className="socials--header" />
          <LanguageSelector />
          <button
            type="button"
            className="menu-toggle"
            aria-label={t.ui.toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop blur would otherwise trap this fixed panel inside the header box */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul>
              {LINKS.map(({ to, key }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                >
                  <NavLink to={to} end={to === "/"} className={({ isActive }) => (isActive ? "is-active" : "")}>
                    {t.nav[key]}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <Socials />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
