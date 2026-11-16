import { Download } from "lucide-react";
import { useLanguage, usePageTitle } from "../i18n.jsx";
import { actionVideo, bodyVideo, brand, transmissionImages } from "../content/media.js";
import PageBanner from "../components/PageBanner.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Reveal from "../components/Reveal.jsx";
import LazyVideo from "../components/LazyVideo.jsx";
import ImageSwitcher from "../components/ImageSwitcher.jsx";

export default function Technology() {
  const { t } = useLanguage();
  const k = t.technology;
  usePageTitle(k.metaTitle);

  return (
    <>
      <PageBanner eyebrow={t.nav.technology} title={k.title} image="v1748222903/5_bxrrqh.webp" />

      <section className="section">
        <div className="container">
          <div className="tech-row">
            <Reveal className="tech-row__media frame frame--white">
              <LazyVideo id={bodyVideo} label={k.videoLabel} width={1280} />
            </Reveal>
            <Reveal className="tech-row__text" delay={0.12}>
              <span className="tech-row__num">01</span>
              <h2>{k.bodyTitle}</h2>
              <p>{k.bodyText}</p>
            </Reveal>
          </div>

          <div className="tech-row tech-row--reverse">
            <Reveal className="tech-row__media frame frame--white">
              <ImageSwitcher images={transmissionImages} alts={k.transmissionAlt} />
            </Reveal>
            <Reveal className="tech-row__text" delay={0.12}>
              <span className="tech-row__num">02</span>
              <h2>{k.transmissionTitle}</h2>
              <p>{k.transmissionText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="spec-grid">
            {k.tables.map((table, i) => (
              <Reveal key={table.title + i} className="spec-card" delay={i * 0.08}>
                <h3>{table.title}</h3>
                <table>
                  <tbody>
                    {table.rows.map(([label, value]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            ))}
          </div>

          <Reveal className="center mt-l">
            <a className="btn" href={brand.specs} download>
              <Download size={18} />
              <span>{k.specsButton}</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionTitle title={k.actionTitle} as="h2" />
          <Reveal className="frame frame--video">
            <LazyVideo id={actionVideo} label={k.videoLabel} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
