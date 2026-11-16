import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

/** Expandable panel (the original "+" toggles on the Clients-Investors page). */
export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`accordion ${open ? "is-open" : ""}`}>
      <h2 className="accordion__heading">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span>{title}</span>
          <span className="accordion__icon" aria-hidden="true"><Plus size={20} /></span>
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="accordion__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="accordion__content">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
