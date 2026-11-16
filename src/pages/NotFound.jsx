import { Link } from "react-router-dom";
import { useLanguage, usePageTitle } from "../i18n.jsx";
import PageBanner from "../components/PageBanner.jsx";

export default function NotFound() {
  const { t } = useLanguage();
  usePageTitle("404 - HAMILCAR");
  return (
    <>
      <PageBanner eyebrow="404" title="HAMILCAR" subtitle={t.home.heroSubtitle} image="v1748222898/3_fbtiuk.webp" />
      <section className="section center">
        <Link className="btn" to="/">{t.nav.home}</Link>
      </section>
    </>
  );
}
