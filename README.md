# Mike Flynn Horsemanship: Landing Page

A static landing page and waitlist for the 52-week online program. Month 1 is the **Foundation Series**.

| File | What it is |
|---|---|
| `index.html` | Landing page |
| `styles.css` | Styles, using the brand tokens from `BRAND.md` |
| `script.js` | Waitlist form handling |
| `config.js` | Waitlist endpoint setting |
| `thanks.html` | Confirmation page if JavaScript is off |
| `BRAND.md` | Brand guide: voice, logo, colors, type |
| `assets/` | Logo marks and favicon |

## Preview locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Waitlist setup (pick one)
**A. Netlify (simplest).** Deploy this folder to Netlify. The form already has `data-netlify="true"`,
so sign-ups show up under **Site → Forms → waitlist**. Turn on email notifications there, or export to CSV.

**B. Any other host (e.g. GitHub Pages).** Create a free form at formspree.io and paste its endpoint into
`config.js` as `WAITLIST_ENDPOINT`.

The form collects first name, email, horse's name (optional), the person's current situation, and consent.

## Before launch
- Replace the placeholder bio in the "Meet your guide" section (marked `EDIT:` in `index.html`) and add Mike's photo.
- Create the promised **"Calm Before You Start"** safety guide and the welcome email.
- Add real testimonials once you have them.
