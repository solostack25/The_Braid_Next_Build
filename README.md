# The Braid Inc — website rebuild

Next.js rebuild of [thebraidinc.org](https://thebraidinc.org), built from the approved
mockups (Home, Donate, Get Help, mobile). Deployed on Vercel (SoloStack team).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

No environment variables needed.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, gift picker, stats, programs, "why a braid", partners, get involved |
| `/donate` | Split one gift across programs with sliders; Monthly/One time; General/Sadaqah/Zakat |
| `/get-help` | Crisis lines, Quick exit (also Esc twice), three entry doors into the confidential intake portal (app.thebraidinc.org), intake line, walk-in address |
| `/programs` | All programs with services and what each "coming soon" program needs |
| `/about` | Story, mission, vision, values, leadership, partners |
| `/resources` | Crisis lines, local services, treatment, support groups, online (from the current site) |
| `/volunteer` | Volunteer roles and partnering |

## Where the content lives

All copy that is likely to change is in `src/content/`:
- `site.ts` — contact details, stats, programs, values, leadership, partners, donation funds
- `resources.ts` — every resource and hotline

Colors and fonts are CSS variables at the top of `src/app/globals.css`.

## Before launch

- **Fill the placeholders** in `src/content/site.ts`: 24/7 intake phone (`intakePhone`
  and `intakePhoneHref`), email, EIN.
- **Checkout isn't connected.** "Continue to payment" shows a "being connected" notice.
  Hook up Stripe (as on the Wisal site) before taking gifts.
- **Photo:** the homepage has one labeled placeholder for a photo of the residence
  (with consent).
- **Logo:** `public/brand/` holds cut-outs from a 1024px image. Ask for the original,
  ideally SVG.
- **Confirm with The Braid:** volunteer roles, partners named publicly (especially the
  Sheriff's Office), stats, and the Yasamine's Place wording.
- **Go live:** remove `robots: { index: false }` in `src/app/layout.tsx`, allow crawlers in
  `src/app/robots.ts`, then point thebraidinc.org at this Vercel project.
