# Vietatelier website concept

Bilingual product showcase template for decorative lighting and wall art, following the supplied VIET ATELIER identity. Built with Next.js, TypeScript, and reusable React components. Playwright tests use Page Object Model classes under `tests/pages`, with selectors/actions kept separate from assertions in `tests/*.spec.ts`.

See [docs/viet-atelier-brand-guide.md](./docs/viet-atelier-brand-guide.md) for the approved working brand story, slogan, palette, persona, tone, asset guidance, and notes reconciling the consumer and hospitality audiences. The guide was distilled from the identity and customer files supplied in `C:\Users\Admin\Downloads\VA NHẬN DIỆN THƯƠNG HIỆU`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run build
npm run test:e2e
```

## Content and integration notes

- The product titles and descriptions are sample labels, not verified product catalogue facts.
- Images are copied from the supplied Downloads folders. They are visual references, not verified Vietatelier products or delivered projects.
- The quotation form performs browser-side validation only. It is not connected to email, CRM, or a database and must not be used to receive real enquiries until that integration is configured.
- No catalogue PDF was provided, so this template does not claim to offer a catalogue download.
- Add approved brand assets, product metadata, real project photography, a catalogue PDF, the quotation recipient/workflow, and hosting configuration before production.
