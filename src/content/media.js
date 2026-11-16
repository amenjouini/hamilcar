// All photos and videos used by the original HAMILCAR site, in their original order.
// They are served from Cloudinary; `img()` / `video()` request an optimised size and format
// without cropping (the original aspect ratio is always preserved).

const CLOUD = "https://res.cloudinary.com/diu2cdrmm";

export const img = (id, width = 1600) => `${CLOUD}/image/upload/f_auto,q_auto,w_${width}/${id}`;
export const srcSet = (id, widths = [640, 1024, 1600, 2400]) =>
  widths.map((w) => `${img(id, w)} ${w}w`).join(", ");
export const video = (id, width = 1600) => `${CLOUD}/video/upload/q_auto,w_${width}/${id}.mp4`;
export const poster = (id, width = 1600) => `${CLOUD}/video/upload/so_1,q_auto,w_${width}/${id}.jpg`;

// Home hero slideshow (index.html)
export const heroSlides = [
  "v1747852257/i5_mnjguz.jpg",
  "v1747852261/i6_pbcs7f.jpg",
  "v1747852257/i7_cudic5.jpg",
  "v1747852262/i8_p8srmy.jpg",
  "v1747852260/i9_hv5fcv.jpg",
];

export const foundersImage = "v1747852203/20221014_112425_hkv5lg.jpg";
export const homeVideo = "v1748223775/20221029_150951_mdgmgr";

// Vehicles page — exterior carousel (original order)
export const exteriorImages = [
  "v1748223166/17_j3nvaw.webp",
  "v1748223161/16_t46v69.webp",
  "v1748223158/15_yygq3c.webp",
  "v1748223156/14_sliol4.webp",
  "v1748223140/12_lsbcuw.webp",
  "v1748223142/13_roxlgj.webp",
  "v1748222927/9_twb41q.webp",
  "v1748223127/10_oqd16p.webp",
  "v1748223138/11_a8bkaf.webp",
  "v1748222910/7_mczt8m.webp",
  "v1748222912/8_xsumzn.webp",
  "v1748222903/5_bxrrqh.webp",
  "v1748222901/4_uri3bh.webp",
  "v1748222762/2_fyzfsq.webp",
  "v1748222905/6_aeb7dj.webp",
  "v1748222719/1_menvqc.webp",
  "v1748222898/3_fbtiuk.webp",
];

// Vehicles page — interior carousel (original order)
export const interiorImages = [
  "v1748224640/yvancjrzbsgzehzxrtuw_epafob.webp",
  "v1748224636/18_q1cp9o.webp",
  "v1748224632/17_mlcqsw.webp",
  "v1748224629/16_utfy7b.webp",
  "v1748224625/15_qofccy.webp",
  "v1748224615/12_vzmdqp.webp",
  "v1748224618/13_t20xlt.webp",
  "v1748224622/14_yjxtta.webp",
  "v1748224611/11_tmjwke.webp",
  "v1748224608/10_ix1fyj.webp",
  "v1748224605/9_o6d2il.webp",
  "v1748224601/8_wqf8nm.webp",
  "v1748224598/7_osqfjo.webp",
  "v1748224594/6_lra6j3.webp",
  "v1748224592/5_ahnfbb.webp",
  "v1748224582/2_cfhjw9.webp",
  "v1748224579/1_bvrb2h.webp",
  "v1748224585/3_tzmqh5.webp",
  "v1748224588/4_asj1gd.webp",
];

// Local images (public/assets/images)
export const vehicleDrawing = "/assets/images/vehichule.png";
export const vehicleModels = [
  { key: "pickup4", src: "/assets/images/PICK UP 4 Portes.png" },
  { key: "pickup2", src: "/assets/images/PICK UP 2 Portes.png" },
  { key: "suv", src: "/assets/images/SUV.png" },
  { key: "commercial", src: "/assets/images/VEHICLE COMMERCIAL.png" },
];

// Technology page
export const bodyVideo = "v1748197707/body1_kgdb7h";
export const transmissionImages = [
  "v1748197598/transmission1_e0mma9.png",
  "v1748197599/transmission2_nmgg4s.png",
];
export const actionVideo = "v1748196956/368302621741965313_ba4lcc";

// Clients-Investors page
export const investorSlidesA = heroSlides;
export const investorSlidesB = [
  "v1747852260/i10_azl5yc.jpg",
  "v1747852255/i1_zg6kf9.jpg",
  "v1747852198/i2_xj8gle.jpg",
  "v1747852241/i3_bxqtw7.jpg",
  "v1747852257/i4_kuyuxn.jpg",
];
export const customerSlides = [
  "v1747852230/c1_drojcq.jpg",
  "v1747852257/c2_nc7sh3.jpg",
  "v1747852236/c3_nd5tav.jpg",
  "v1747852173/c4_dl59pg.jpg",
  "v1748194468/c5_cjxkyp.jpg",
];
export const clientsVideo = "v1748194632/video-car-side3_xvuxiv";

// Shared
export const brand = {
  logo: "/assets/icons/signature-hamilcar-nobg.png",
  favicon: "/assets/icons/logo-modified.png",
  facebook: "https://www.facebook.com/profile.php?id=100083210768748",
  linkedin: "https://www.linkedin.com/in/hamilcar-tunisie-012b48252/",
  email: "contact@hamilcar.tn",
  phone: "+216 94 888 342",
  phoneHref: "tel:+21694888342",
  specs: "/assets/specifications.pdf",
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.2342772865427!2d10.244869275646986!3d36.83686487223675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd35dc7780a589%3A0xbbd2e033a7e6d757!2sLac%20Luxury%20Apartment!5e0!3m2!1sen!2stn!4v1747934071581!5m2!1sen!2stn",
};
