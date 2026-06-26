# Katselin.fi

**The official website and public documentation for Katselin.**

This repository powers <https://katselin.fi> and is the canonical, public,
human- and AI-readable documentation for the Katselin browser project.

## Contents

- Project philosophy (Servo as engine, Katselin as harbour, Telakka workflow)
- Majakka — user guide and glossary
- Varustamo — overview of the trusted app ecosystem
- Architecture summary and developer entry points
- Links to source repositories

## Site structure

```
/
├── index.html              Language selection (FI / SV)
├── style.css               Single shared stylesheet
├── assets/
│   ├── logo.png            Main logo (used on hero and as social card)
│   └── favicon.svg         Simplified vector mark
├── fi/                     Finnish version
│   ├── index.html
│   ├── majakka.html        Lighthouse — user guide
│   ├── kehittajille.html   For developers
│   └── filosofia.html      Philosophy
├── sv/                     Swedish version
│   ├── index.html
│   ├── fyren.html          The Lighthouse — user guide
│   ├── utvecklare.html     For developers
│   └── filosofi.html       Philosophy
└── docs/                   Extended documentation (Markdown)
    ├── philosophy/         filosofia.md, avomeri.md
    ├── architecture/       arkkitehtuuri.md, nykytila
    └── developer/          telakka, osallistuminen, tietoturva
```

Finnish HTML subpages under `fi/`:

- `kehittajille-arkkitehtuuri.html`, `kehittajille-telakka.html`, …
- `filosofia-avomeri.html`

## Technology

The site is intentionally minimal:

- Pure HTML5 + CSS3
- No JavaScript
- No build step, no bundlers, no frameworks
- No external fonts, no analytics, no cookies, no tracking
- Designed for mobile first; centred and max 900 px wide on larger screens
- Dark theme matching the Katselin logo

Everything is a flat static file. Just serve the repository root and the site
works.

## Local preview

Open `index.html` directly in a browser, or run any static file server:

```bash
python -m http.server 8000
# or
npx http-server .
```

Then visit <http://localhost:8000/>.

## Deployment (GitHub Pages)

The domain `katselin.fi` is registered. The site is **not published yet** — launch
when DNS and content are ready.

When you go live, the repository is structured to be served directly by GitHub
Pages from the default branch root:

1. In GitHub repository settings, enable Pages on the default branch, root folder.
2. Add a `CNAME` file at the repository root containing the single line:
   `katselin.fi`.
3. Point DNS for `katselin.fi` to GitHub Pages (A/AAAA records or `CNAME` on
   `www`).

## What belongs in this repository

This repo is the canonical **public** documentation and website. Open material
from the Kotisatama and Varustamo projects can be moved here over time.

**Stays in the private repository:**

- Valkoiset sivut / whitelist data (curated site lists, signing, CDN payloads)
- Varustamo closed applications (Pulloposti, Missä olen source and signed builds)
- Signed catalogues and operational secrets

**Can live here (open):**

- User guides (Majakka)
- Philosophy and architecture (FILOSOFIA, Avomeri concept, Telakka workflow)
- Developer documentation and application API specs
- Public Varustamo overview (without proprietary app internals)

## Related repositories

- **Katselin** — Browser source code (Servo-based fork). Public, MPL 2.0.
- **Katselin Private** — Whitelists, signed Varustamo catalogue and internal
  applications such as Pulloposti and Missä olen. Private.

## License

Documentation and original content are licensed under
[CC BY 4.0](LICENSE.md) unless otherwise noted.

The Katselin browser itself is licensed under MPL 2.0 in its own repository.
