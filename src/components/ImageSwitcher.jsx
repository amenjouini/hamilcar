import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../i18n.jsx";
import { img } from "../content/media.js";

/** Previous / next image switcher (the original Transmission viewer). Images are never cropped. */
export default function ImageSwitcher({ images, alts = [] }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  return (
    <div className="switcher">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={img(images[index], 1200)}
          alt={alts[index] || ""}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>
      <button type="button" className="switcher__btn switcher__btn--prev" disabled={index === 0} onClick={() => setIndex(index - 1)} aria-label={t.ui.previous}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" className="switcher__btn switcher__btn--next" disabled={index === images.length - 1} onClick={() => setIndex(index + 1)} aria-label={t.ui.next}>
        <ChevronRight size={20} />
      </button>
      <div className="switcher__count">{index + 1} / {images.length}</div>
    </div>
  );
}
