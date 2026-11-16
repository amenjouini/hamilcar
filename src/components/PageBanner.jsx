import { motion } from "framer-motion";
import { img } from "../content/media.js";

/** Title banner at the top of each inner page, over one of the page's own photos. */
export default function PageBanner({ eyebrow, title, subtitle, image }) {
  return (
    <section className="banner">
      {image && (
        <motion.img
          className="banner__img"
          src={img(image, 2000)}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <div className="banner__shade" aria-hidden="true" />
      <div className="container banner__content">
        {eyebrow && (
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {title}
        </motion.h1>
        <motion.span className="banner__rule" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
        {subtitle && (
          <motion.p className="banner__subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
