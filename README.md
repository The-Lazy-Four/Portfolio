# Web Guru — Agency Portfolio Website

Production Next.js (App Router + TypeScript + Tailwind CSS) portfolio website for **Web Guru**, a four-member digital services agency.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Configuring Content & Contact Delivery

1. **Agency Contact & Social Links**: Update `src/config/site.ts` or copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and social URLs.
2. **Contact Form Delivery (`POST /api/contact`)**:
   - Option A: Set `CONTACT_WEBHOOK_URL` to forward validated JSON submissions to a webhook endpoint.
   - Option B: Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (and optionally `CONTACT_FROM_EMAIL`) to send emails via Resend.
   - Until either is configured, `/api/contact` validates inputs and honestly returns HTTP `503` (`not_configured`) instead of pretending an enquiry was sent.
3. **Team Profiles**: Replace the four reserved member slots in `src/data/team.ts`.
4. **Portfolio & Case Studies**: Replace or append verified client work in `src/data/projects.ts`.
5. **Client Testimonials**: Add verified reviews to `src/data/testimonials.ts`.
