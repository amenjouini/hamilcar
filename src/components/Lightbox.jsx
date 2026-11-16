import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "../i18n.jsx";
import { img } from "../content/media.js";

/** Full-screen image viewer. `index === null` means closed. */
export default function Lightbox({ images, index, onChange, onClose, alt = "" }) {
  const { t } = useLanguage();
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const open = index !== null && index !== undefined;

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.classList.remove("no-scroll");
      prevFocus?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onChange, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) onChange((index + (dx < 0 ? 1 : -1) + images.length) % images.length);
            touchX.current = null;
          }}
        >
          <div className="lightbox__bar">
            <span className="lightbox__count">{index + 1} / {images.length}</span>
            <button ref={closeRef} type="button" className="icon-btn" aria-label={t.ui.close} onClick={onClose}>
              <X />
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              className="lightbox__img"
              src={img(images[index], 2400)}
              alt={`${alt} ${index + 1}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
          <button type="button" className="icon-btn lightbox__prev" aria-label={t.ui.previous} onClick={() => onChange((index - 1 + images.length) % images.length)}>
            <ChevronLeft />
          </button>
          <button type="button" className="icon-btn lightbox__next" aria-label={t.ui.next} onClick={() => onChange((index + 1) % images.length)}>
            <ChevronRight />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
