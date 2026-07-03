# DESIGN.md: Adam Hickey-inspired editorial portfolio

## Source
- URL: https://adamhickey.com/
- Capture date: 2026-06-30
- Evidence: rendered screenshot, DOM/style inspection, and source HTML/CSS references.

## Design Summary
Use Adam Hickey's site as the structural reference: a quiet white editorial portfolio, proportionate serif hero statement, animated halftone-style portrait on the left, compact icon actions in the header, grayscale logo strip, and restrained case-study/card sections. Use a dark green accent to connect the reference style with this AI portfolio.

## Design Tokens

### Colors
- Paper: `#ffffff`
- Warm section surface: `#f5f5f0`
- Ink: `#111111`
- Muted text: `#5c5f5c`
- Rule/border: `#e5e5dd`
- AI accent: `#315c3f`
- Secondary AI accent: `#4f7d5c`
- Soft accent wash: `#e4efe6`

### Typography
- Body/navigation: Montserrat, system sans fallback.
- Hero and major section headings: Crimson Text, Georgia fallback.
- Use large but proportionate serif hero text with tight line height, normal weight, and an accent-colored phrase.
- Use small, semibold sans-serif labels for eyebrow text and icon link labels.

### Spacing And Layout
- Max content width: 1200-1320px.
- Header: left brand mark, right compact icon actions.
- Hero: two-column desktop layout with portrait left and large statement right; single-column on mobile.
- Section rhythm: tight editorial gaps, thin top rules, no heavy card shadows.
- Logo strip: grayscale logos in equal cells separated by hairline borders.

## Components
- Header actions: icon above label, black by default, dark green on hover.
- Portrait: grayscale, high contrast, animated halftone texture via dot overlay.
- Capability cards: cream background, square edges, 1px borders, dense copy.
- Content sections: large serif title with body/card content below.
- Buttons/chips: quiet borders with dark green/sage hover states.

## Agent Build Instructions
- Keep the site light by default; do not introduce dark mode visuals for this direction.
- Use dark green/sage accents consistently. Avoid scattered blue, purple, amber, or red accents.
- Keep imagery and logos grayscale unless the user explicitly asks for color.
- Prefer editorial restraint over decorative gradients, glassmorphism, or sticker effects.
- Maintain existing functionality: contact actions, résumé downloads, photo lightbox, and section anchors.
