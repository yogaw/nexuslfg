## Website Rules (HTML/CSS/JS)

### Goals
- Keep the site static (upload-ready) and professional.
- Prefer simple, semantic HTML with minimal JavaScript.
- Keep styling consistent and responsive.

### Design System (Reference)
- Visual direction: clean light theme with a deep green accent, soft off-white background, and calm spacing.
- Primary tokens live in `:root` in `assets/css/styles.css` and should be treated as the source of truth.
- Prefer reusing existing components (buttons, cards, panels) before adding new styles.

### Color Tokens (from `:root`)
- Background: `--bg: #f4f6f4`
- Brand: `--brand: #0a6b5a`, `--brand-strong: #075b4d`, `--brand-contrast: #ffffff`
- Brand tint: `--brand-soft` for tags and subtle highlights
- Surfaces: `--surface` / `--surface-strong` (soft white panels)
- Text: `--text`, `--muted`, `--faint`
- Borders: `--stroke`
- Focus ring: `--focus`
- Header/menu: `--header-bg`, `--menu-bg`

### Typography
- Font stack: `--font` (system UI stack)
- Headings: tight line-height, slightly negative letter-spacing for large titles
- Body: readable line-height (1.5) and muted color for supporting copy (`--muted`)

### Spacing + Radius
- Spacing scale: `--space-1` … `--space-8` (use these consistently instead of arbitrary values)
- Radius scale: `--radius-sm`, `--radius-md`, `--radius-lg` (panels/cards use md/lg)
- Layout container: `--container` with `.container` for consistent horizontal gutters

### Components (Style Rules)
- Header: sticky + blurred background; add elevation only when scrolled (`.site-header.is-elevated`)
- Navigation: centered primary nav with right-side CTA
- Buttons: `.button` base with `.button-primary` (green fill), `.button-secondary` (outline), and `.button-inverse` for CTA sections
- Cards/Panels: soft white surfaces with subtle borders and shadows; avoid heavy gradients
- Forms: consistent input styling with visible focus states; labels always present
- Links: default underline on hover only; avoid always-underlined nav links

### Project Structure
- `index.html` is the entry point and should keep semantic sections: `header`, `main`, `footer`.
- `assets/css/styles.css` contains all styles. Keep it organized by sections and shared utilities.
- `assets/js/main.js` contains all JavaScript. No inline scripts in HTML.
- Optional additions later:
  - `assets/img/` for images
  - `privacy.html` and `terms.html` if needed

### HTML Conventions
- Use semantic tags (`header`, `nav`, `section`, `article`, `footer`).
- Always include `lang`, `meta viewport`, and a meaningful `meta description`.
- Navigation links should point to section ids or real pages.
- Forms must have `label` elements connected with `for` + matching input `id`.

### CSS Conventions
- Use CSS custom properties in `:root` for color, spacing, typography.
- Avoid ad-hoc inline styles.
- Ensure visible focus states and sufficient contrast.
- Keep responsive rules in one `@media` block per breakpoint when possible.
- Prefer surfaces using the existing variables (`--surface`, `--surface-strong`, `--stroke`) over introducing new colors.
- Keep class names simple and descriptive, using kebab-case (example: `site-header`, `hero-grid`, `contact-card`).

### JavaScript Conventions
- Keep JS minimal and progressive: the page should remain usable without JS.
- Use `defer` for script loading and keep the script in `assets/js/main.js`.
- Prefer event delegation and small, named functions.

### Contact Form (Recommended)
- Use a hosted form backend (Formspree / Getform / Basin) to avoid needing server code on shared hosting.
- Update the form `action` attribute in `index.html`:
  - Current placeholder: `https://formspree.io/f/yourFormId`
  - Replace `yourFormId` with the real endpoint provided by the form service.
- Keep fields: name, email, message. Add reCAPTCHA only if spam becomes an issue.

### Deployment to GoDaddy (Static Upload)
- Build step is not required (pure HTML/CSS/JS).
- Upload these files/folders to the GoDaddy hosting root (commonly `public_html/`):
  - `index.html`
  - `assets/`
- After upload, confirm:
  - `https://yourdomain.com/` loads
  - CSS loads (no 404 on `assets/css/styles.css`)
  - Form submits to the hosted endpoint
