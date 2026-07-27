# Heirloom Project Notes

These notes preserve implementation context for future Codex sessions. Keep this file concise and update it when making meaningful site changes.

## Current Project Context

- Site: Jekyll website for Heirloom.
- Main branch: `main`.
- Recent committed work visible in git history includes:
  - `78276b6 Refine site content and layout`.
  - `e4166a1 Update services page offerings`.
  - `fec4f0a Use Heirloom logo and favicon assets`.
  - `7daccc3 Add Heirloom brand image assets`.
  - `e0e74dd Refine site content and interactions`.
  - `7fb1374 Refine site layout and update page content`.
  - `c9bc03b Refine Heirloom site structure, homepage, about page, FAQ, and footer`.
- The working tree was clean when these notes were created.

## Site Structure

- This is a Jekyll project with pages including `index.html`, `about.md`, `services.md`, `faq.md`, and `contact.md`.
- Shared layouts and includes live in `_layouts/` and `_includes/`.
- Assets live under `assets/`.
- Netlify configuration exists in `netlify.toml`.

## Build And Tooling

- Use `bundle exec jekyll build` to verify site builds.
- ImageMagick is available on this machine as `/opt/homebrew/bin/magick` and can be used for image resizing/compression in this project too.

## Future Codex Maintenance

- Read this file before making substantive site changes.
- Update this file before finishing a session when changes affect layout, content structure, image workflows, deployment URLs, or future maintenance expectations.
- About page hero spacing uses `about-page__hero` for the gap between the “Why Heirloom?” heading and body copy.
- The About page storyteller accent is a same-size filled plum `box-shadow` layer on `.storyteller-card`, offset equally right and bottom; the card uses a persistent gold border.
- “Next Steps” CTA cards use `cta-band--next-steps` for smaller headings; the home CTA includes supporting copy, while the About CTA omits it.
- Services page hero uses `services-hero` to style the secondary `h2` as a smaller sans subheading under the page title.
- Services page separates the hero intro and “Our Process” section with extra `services-process` top padding instead of a divider.
