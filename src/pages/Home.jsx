import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage, usePageTitle } from "../i18n.jsx";
import { foundersImage, heroSlides, homeVideo, img, srcSet } from "../content/media.js";
import Slideshow from "../components/Slideshow.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Reveal from "../components/Reveal.jsx";
import LazyVideo from "../components/LazyVideo.jsx";

const ease = [0.16, 1, 0.3, 1];

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;
  usePageTitle(h.metaTitle);

  return (
    <>
      {/* Hero — full-screen slideshow, as on the original */}
      <section className="hero" aria-labelledby="hero-title">
        <Slideshow images={heroSlides} variant="cover" kenBurns priority interval={4000} />
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__content">
          <motion.h1
            id="hero-title"
            className="hero__title"
            initial={{ opacity: 0, y: -30, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.04em" }}
            transition={{ duration: 1.4, ease }}
          >
            {h.heroTitle}
          </motion.h1>
          <motion.span className="hero__rule" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.9, ease }} />
          <motion.p className="hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }}>
            {h.heroSubtitle}
          </motion.p>
        </div>
        <a href="#about-legacy" className="hero__scroll" aria-label={t.ui.scrollDown}>
          <ChevronDown />
        </a>
      </section>

      {/* Welcome + founders */}
      <section id="about-legacy" className="section">
        <div className="container">
          <SectionTitle eyebrow={t.nav.home} title={h.welcomeTitle} subtitle={h.welcomeText} />

          <div className="about">
            <Reveal className="about__image frame">
              <img
                src={img(foundersImage, 1200)}
                srcSet={srcSet(foundersImage, [600, 900, 1200, 1800])}
                sizes="(min-width: 900px) 50vw, 100vw"
                alt={h.foundersImageAlt}
                loading="lazy"
                width="3248"
                height="2160"
              />
            </Reveal>
            <Reveal className="about__text" delay={0.15}>
              <h3>{h.foundersTitle}</h3>
              <p>{h.foundersText1}</p>
              <p>{h.foundersText2}</p>
            </Reveal>
          </div>

          <Reveal className="frame frame--video">
            <LazyVideo id={homeVideo} label={h.videoLabel} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
