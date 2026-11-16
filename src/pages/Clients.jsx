import { useLanguage, usePageTitle } from "../i18n.jsx";
import { clientsVideo, customerSlides, investorSlidesA, investorSlidesB } from "../content/media.js";
import PageBanner from "../components/PageBanner.jsx";
import Accordion from "../components/Accordion.jsx";
import Slideshow from "../components/Slideshow.jsx";
import Reveal from "../components/Reveal.jsx";
import LazyVideo from "../components/LazyVideo.jsx";

function Block({ item }) {
  return (
    <div className="text-block">
      <h4>{item.title}</h4>
      {item.text && <p>{item.text}</p>}
      {item.intro && <p>{item.intro}</p>}
      {item.bullets && (
        <ul className="bullets">
          {item.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
      {item.paragraphs && item.paragraphs.map((p) => <p key={p}>{p}</p>)}
    </div>
  );
}

function Row({ images, items }) {
  return (
    <div className="image-text">
      <Slideshow images={images} className="image-text__media" alt="HAMILCAR HX 0" />
      <div className="image-text__text">
        {items.map((item) => <Block key={item.title} item={item} />)}
      </div>
    </div>
  );
}

export default function Clients() {
  const { t } = useLanguage();
  const c = t.clients;
  usePageTitle(c.metaTitle);

  return (
    <>
      <PageBanner eyebrow={t.nav.clients} title={c.title} image="v1747852241/i3_bxqtw7.jpg" />

      <section className="section">
        <div className="container">
          <Reveal className="accordions">
            <Accordion title={c.investorHeader}>
              <Row images={investorSlidesA} items={c.investor.slice(0, 2)} />
              <Row images={investorSlidesB} items={c.investor.slice(2)} />
            </Accordion>
            <Accordion title={c.customerHeader}>
              <Row images={customerSlides} items={c.customer} />
            </Accordion>
          </Reveal>

          <Reveal className="frame frame--video mt-xl">
            <LazyVideo id={clientsVideo} label={c.videoLabel} width={1280} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
