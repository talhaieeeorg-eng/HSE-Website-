# HSE Website

Repository for the HSE (Health, Safety & Environment) website.

Planned stack: **Next.js + React**.

## UI/UX Pro Max skill

This repo has the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
design-intelligence skill installed under `.claude/skills/`. It provides
searchable databases of UI styles, color palettes, font pairings, UX
guidelines, and chart types to guide design decisions when building the site.

### Using the skill

Claude Code discovers the skill automatically. You can also query the
databases directly:

```bash
# Color palettes for a product type
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "safety consultancy website" --domain color

# UI styles (with AI prompts + CSS keywords)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "corporate trustworthy" --domain style

# Font pairings
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "professional" --domain typography

# Stack-specific guidelines
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero section" --stack nextjs
```

Available domains: `product`, `style`, `typography`, `color`, `landing`,
`chart`, `ux`, `gsap`. Requires Python 3 (no external dependencies).

Companion skills also installed: `design-system`, `brand`, `design`,
`slides`, `ui-styling`, `banner-design`.
