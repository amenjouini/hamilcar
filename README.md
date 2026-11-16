# HAMILCAR website

React + Vite rebuild of the HAMILCAR site. Same pages, menu, texts, photos and videos as the original — renovated design.

## Run locally

```sh
npm install
npm run dev      # http://localhost:5501
```

## Build & deploy

```sh
npm run build    # outputs the site to dist/
```

Upload the **contents of `dist/`** to the web host (or point Netlify / Vercel at this repo with build command `npm run build` and output folder `dist`).

The site uses clean URLs (`/vehicles`, `/technology`, `/clients`, `/contact`). The host must send every unknown path to `index.html`; this is already configured for:

- Apache / cPanel: `public/.htaccess`
- Netlify: `public/_redirects`
- Vercel: `vercel.json`

Old links (`/vehicles.html`, `/clients.html`, …) redirect automatically.

## Where things live

| What | File |
| --- | --- |
| All texts (French + English) | `src/content/translations.js` |
| Photos, videos, contact details, social links | `src/content/media.js` |
| Pages | `src/pages/` (Home, Vehicles, Technology, Clients, Contact) |
| Header, footer, carousels, slideshows… | `src/components/` |
| Styles (colors, fonts, layout) | `src/styles.css` |
| Logo, icons, local images, spec sheet PDF | `public/assets/` |

Photos and videos are served from Cloudinary (`res.cloudinary.com/diu2cdrmm`) at an optimised size; they are never cropped.

## Contact form

Messages are delivered by FormSubmit to contact@hamilcar.tn (same service as the original site).
The success pop-up only appears when FormSubmit confirms delivery; otherwise an error with the email address is shown.
FormSubmit requires a one-time activation: the first submission sends a confirmation email to contact@hamilcar.tn that must be clicked.
