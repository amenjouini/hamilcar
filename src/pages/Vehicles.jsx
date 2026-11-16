import { useLanguage, usePageTitle } from "../i18n.jsx";
import { exteriorImages, interiorImages, vehicleDrawing, vehicleModels } from "../content/media.js";
import PageBanner from "../components/PageBanner.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Carousel from "../components/Carousel.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Vehicles() {
  const { t } = useLanguage();
  const v = t.vehicles;
  usePageTitle(v.metaTitle);

  return (
    <>
      <PageBanner eyebrow={t.nav.vehicles} title={v.rangeTitle} image="v1748223156/14_sliol4.webp" />

      <section className="section">
        <div className="container">
          <div className="design-block">
            <Reveal className="design-block__head">
              <h2 className="design-block__title">{v.exteriorTitle}</h2>
              <p>{v.exteriorText}</p>
            </Reveal>
            <Carousel images={exteriorImages} alt={v.exteriorAlt} />
          </div>

          <div className="design-block">
            <Reveal className="design-block__head">
              <h2 className="design-block__title">{v.interiorTitle}</h2>
              <p>{v.interiorText}</p>
            </Reveal>
            <Carousel images={interiorImages} alt={v.interiorAlt} />
          </div>

          <Reveal className="drawing">
            <img src={vehicleDrawing} alt={v.drawingAlt} width="602" height="231" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle title={v.ourVehiclesTitle} subtitle={v.ourVehiclesSubtitle} />
          <div className="models">
            {vehicleModels.map((m, i) => (
              <Reveal key={m.key} className="model" delay={i * 0.08}>
                <div className="model__img">
                  <img src={m.src} alt={v.models[m.key]} loading="lazy" />
                </div>
                <h3 className="model__title">{v.models[m.key]}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
