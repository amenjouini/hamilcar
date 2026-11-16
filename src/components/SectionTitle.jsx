import Reveal from "./Reveal.jsx";

/** Centered section heading, as on the original site, with a yellow accent rule. */
export default function SectionTitle({ eyebrow, title, subtitle, as = "h2", align = "center" }) {
  const H = as;
  return (
    <Reveal className={`section-title section-title--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H>{title}</H>
      <span className="section-title__rule" aria-hidden="true" />
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </Reveal>
  );
}
