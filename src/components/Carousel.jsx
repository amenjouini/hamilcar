import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useLanguage } from "../i18n.jsx";
import { img } from "../content/media.js";
import Lightbox from "./Lightbox.jsx";

/**
 * Horizontal photo carousel (as on the original Vehicles page), with arrows,
 * swipe / scroll-snap and a full-screen viewer. Photos keep their 4:3 format — nothing is cropped.
 */
export default function Carousel({ images, alt }) {
  const { t } = useLanguage();
  const track = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(null);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < max - 2);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (dir) => {
    const el = track.current;
    const item = el?.firstElementChild;
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        <div className="carousel__track" ref={track} onScroll={update} tabIndex={0} role="region" aria-label={alt}>
          {images.map((id, i) => (
            <button key={id} type="button" className="carousel__item" onClick={() => setOpen(i)} aria-label={`${t.ui.enlarge} — ${alt} ${i + 1}`}>
              <img src={img(id, 900)} srcSet={`${img(id, 600)} 600w, ${img(id, 900)} 900w, ${img(id, 1300)} 1300w`} sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 88vw" alt={`${alt} ${i + 1}`} loading="lazy" decoding="async" />
              <span className="carousel__zoom" aria-hidden="true"><Expand size={16} /></span>
            </button>
          ))}
        </div>
        <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => scroll(-1)} disabled={!canPrev} aria-label={t.ui.previous}>
          <ChevronLeft />
        </button>
        <button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => scroll(1)} disabled={!canNext} aria-label={t.ui.next}>
          <ChevronRight />
        </button>
      </div>
      <div className="carousel__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.06, progress)})` }} />
      </div>
      <Lightbox images={images} index={open} onChange={setOpen} onClose={() => setOpen(null)} alt={alt} />
    </div>
  );
}
