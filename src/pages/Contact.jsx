import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone, Send, X } from "lucide-react";
import { useLanguage, usePageTitle } from "../i18n.jsx";
import { brand } from "../content/media.js";
import PageBanner from "../components/PageBanner.jsx";
import Reveal from "../components/Reveal.jsx";

// Same delivery service as the original site (FormSubmit → contact@hamilcar.tn),
// using its JSON endpoint so success is only shown when delivery is confirmed.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${brand.email}`;

const FIELDS = [
  { name: "first_name", type: "text", label: "firstName", autoComplete: "given-name", required: true },
  { name: "last_name", type: "text", label: "lastName", autoComplete: "family-name", required: true },
  { name: "email", type: "email", label: "email", autoComplete: "email", required: true },
  { name: "phone", type: "tel", label: "phone", autoComplete: "tel", required: true },
];

function SuccessModal({ open, onClose, title, text, closeLabel }) {
  const btn = useRef(null);
  useEffect(() => {
    if (!open) return;
    btn.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div
            className="modal__box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button ref={btn} type="button" className="modal__close" aria-label={closeLabel} onClick={onClose}>
              <X size={20} />
            </button>
            <CheckCircle2 className="modal__icon" size={52} />
            <h3 id="modal-title">{title}</h3>
            <p id="modal-desc">{text}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  usePageTitle(c.metaTitle);

  const [values, setValues] = useState({ first_name: "", last_name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [success, setSuccess] = useState(false);

  const validate = (v = values) => {
    const e = {};
    FIELDS.forEach((f) => {
      if (f.required && !v[f.name].trim()) e[f.name] = c.required;
    });
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = c.invalidEmail;
    return e;
  };

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (errors[e.target.name]) setErrors(validate(next));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    if (e.target.elements._honey?.value) return; // spam trap

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          _subject: `HAMILCAR website — ${values.first_name} ${values.last_name}`,
          _captcha: "false",
          _template: "table",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === true || data.success === "true")) throw new Error(data.message || "failed");
      setValues({ first_name: "", last_name: "", email: "", phone: "", message: "" });
      setStatus("idle");
      setSuccess(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageBanner eyebrow={t.nav.contact} title={c.title} subtitle={c.subtitle} image="v1748223142/13_roxlgj.webp" />

      <section className="section">
        <div className="container contact">
          <Reveal className="contact__info">
            <h2>{c.detailsTitle}</h2>
            <p className="muted">{c.detailsText}</p>
            <ul className="contact__list">
              <li>
                <span className="contact__icon"><MapPin size={20} /></span>
                <span><small>{c.addressLabel}</small>{c.address}</span>
              </li>
              <li>
                <span className="contact__icon"><Phone size={20} /></span>
                <span><small>{c.phoneLabel}</small><a href={brand.phoneHref}>{brand.phone}</a></span>
              </li>
              <li>
                <span className="contact__icon"><Mail size={20} /></span>
                <span><small>{c.emailLabel}</small><a href={`mailto:${brand.email}`}>{brand.email}</a></span>
              </li>
            </ul>
            <div className="map">
              <iframe title={c.mapTitle} src={brand.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          </Reveal>

          <Reveal className="contact__form" delay={0.12}>
            <h2 className="accent">{c.formTitle}</h2>
            <form noValidate onSubmit={onSubmit}>
              <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="form-grid">
                {FIELDS.map((f) => (
                  <div className="field" key={f.name}>
                    <label htmlFor={`f-${f.name}`}>{c[f.label]}</label>
                    <input
                      id={`f-${f.name}`}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      required={f.required}
                      value={values[f.name]}
                      onChange={onChange}
                      aria-invalid={errors[f.name] ? "true" : "false"}
                      aria-describedby={errors[f.name] ? `f-${f.name}-err` : undefined}
                    />
                    {errors[f.name] && <span className="field__error" id={`f-${f.name}-err`}>{errors[f.name]}</span>}
                  </div>
                ))}
              </div>
              <div className="field">
                <label htmlFor="f-message">{c.message}</label>
                <textarea id="f-message" name="message" rows="5" value={values.message} onChange={onChange} />
              </div>
              {status === "error" && <p className="form-error" role="alert">{c.error}</p>}
              <button type="submit" className="btn btn--block" disabled={status === "sending"}>
                <Send size={18} />
                <span>{status === "sending" ? c.sending : c.submit}</span>
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <SuccessModal open={success} onClose={() => setSuccess(false)} title={c.successTitle} text={c.successText} closeLabel={t.ui.close} />
    </>
  );
}
