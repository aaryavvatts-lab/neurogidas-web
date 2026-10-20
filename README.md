# NeuroGIDAS website

The site for NeuroGIDAS, Eastview High School's neuroscience and genetics research club. Live at https://neurogidas-web.vercel.app

Built with [Astro](https://astro.build). Every push to `main` deploys automatically on Vercel.

## Updating the schedule

Everything about meetings lives in one file: `src/data/meetings.ts`.

- To lock in a date, set `confirmed: true` on that meeting.
- To change a topic or date, edit that meeting's `date`, `title`, or `summary`.
- After a meeting, add a `recap` (two or three plain sentences about what happened). It shows up under "What we have done so far".
- The "Next meeting" card, the year chromosome, and the schedule table all update from today's date on their own, so you never need to edit them after a meeting ends.

Links (GroupMe, Instagram, email, textbook) live in `src/data/site.ts`.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Writing rules

No em dashes. Plain, short sentences. Only claim what the club actually does.
