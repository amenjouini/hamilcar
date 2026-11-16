import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { img, srcSet } from "../content/media.js";

/**
 * Auto-advancing cross-fade slideshow (the original switched images every 3 seconds).
 * variant="cover"  → fills its box (hero)
 * variant="contain" → the whole photo is always visible, never cropped
 */
export default function Slideshow({ images, interval = 3000, variant = "contain", alt = "", className = "", kenBurns = false, priority = false }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Preload the next photo so the cross-fade never reveals an empty frame.
  useEffect(() => {
    if (images.length < 2) return;
    const next = new Image();
    next.sizes = variant === "cover" ? "100vw" : "(min-width: 900px) 50vw, 100vw";
    next.srcset = srcSet(images[(index + 1) % images.length]);
    next.src = img(images[(index + 1) % images.length], 1600);
  }, [index, images, variant]);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [paused, images.length, interval]);

  return (
    <div
      className={`slideshow slideshow--${variant} ${className}`}
      onMouseEnter={() => variant === "contain" && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={img(images[index], 1600)}
          srcSet={srcSet(images[index])}
          sizes={variant === "cover" ? "100vw" : "(min-width: 900px) 50vw, 100vw"}
          alt={alt ? `${alt} ${index + 1}` : ""}
          fetchpriority={priority && index === 0 ? "high" : undefined}
          decoding="async"
          initial={{ opacity: 0, scale: kenBurns && !reduce ? 1.08 : 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: interval / 1000 + 1.2, ease: "linear" } }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="slideshow__dots" role="tablist">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1} / ${images.length}`}
              className={i === index ? "is-active" : ""}
              onClick={() => setIndex(i)}
            >
              <span style={i === index && !paused ? { animationDuration: `${interval}ms` } : undefined} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
