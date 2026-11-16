import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { poster, video } from "../content/media.js";

/**
 * Autoplaying, muted, looping video (as on the original site) that only downloads
 * when it approaches the screen and pauses when out of view. Visitors can pause it.
 */
export default function LazyVideo({ id, label, width = 1600, className = "" }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc((s) => s || video(id, width));
          if (!reduce && !paused) el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, width, reduce, paused]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setPaused(false);
    } else {
      el.pause();
      setPaused(true);
    }
  };

  return (
    <div className={`video ${className}`}>
      <video
        ref={ref}
        src={src || undefined}
        poster={poster(id, width)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onLoadedData={() => !reduce && !paused && ref.current?.play().catch(() => {})}
      />
      <button type="button" className="video__toggle" onClick={toggle} aria-label={paused || reduce ? "Play" : "Pause"}>
        {paused || reduce ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </div>
  );
}
