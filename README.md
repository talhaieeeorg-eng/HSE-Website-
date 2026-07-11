# Mohsin Hussain — Portfolio

An animated personal portfolio for **Mohsin Hussain**, a Digital Marketing
Strategist with an IT background and deep expertise in performance marketing,
UGC ads, paid social and growth.

## Stack

Zero-dependency static site — pure **HTML, CSS & vanilla JS**. Just open
`index.html`; there is no build step.

```
index.html    # markup & content
styles.css    # cinematic dark theme + all keyframe animations
script.js     # cursor, scroll reveals, counters, tilt, magnetic buttons…
```

## Features / animations

- Animated preloader with letter-by-letter name reveal
- Custom trailing cursor (with hover-grow states)
- Kinetic gradient hero typography with word-by-word entrance
- Scroll progress bar + sticky glass nav with active-section tracking
- Animated gradient blob background, grid + noise overlay
- Scroll-reveal (IntersectionObserver), animated counters & skill bars
- Magnetic buttons, 3D card tilt with cursor-tracked glow, marquee ticker
- Fully responsive with a mobile slide-in menu
- Respects `prefers-reduced-motion` and degrades gracefully without JS

## Local preview

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## Customising

- **Content**: edit the sections in `index.html` (about, expertise, work, etc.).
- **Contact form**: currently opens the visitor's mail client via `mailto:`.
  Swap the handler in `script.js` for a form endpoint (Formspree, Getform, an
  API route) when a backend is available. Update the email/social links too.
- **Colors & fonts**: tweak the CSS custom properties at the top of `styles.css`.

## Design intelligence

Built with guidance from the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
skill installed under `.claude/skills/` (kinetic typography + cinematic dark
direction, GSAP-style scroll-reveal timing).
