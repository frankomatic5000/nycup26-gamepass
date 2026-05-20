# NYCUP26 GAME PASS MVP Spec

## Goal

Build the MVP for `nycup26.com`: a visitor bracelet/pass platform for World Cup 2026 fans in New York City.

The MVP should let visitors understand the offer, join the waitlist, browse partner venues, see placeholder perks, and prepare for ticketing/pickup once those details are confirmed.

## Product Promise

NYCUP26 GAME PASS helps visitors unlock NYC during the World Cup through:

- Watch parties
- Restaurant, bar, and nightlife perks
- Food and drink specials
- Curated venue discovery
- Sponsor activations and giveaways
- Bracelet-based passholder recognition

The site must not imply official FIFA affiliation.

## MVP Scope

### Public Site

- Premium mobile-first landing page
- Hero section with Statue of Liberty bracelet visual
- Live-board ticker for upcoming events, partner promos, and future match updates
- Bracelet benefits section
- How it works section
- Featured venue directory
- Pickup location placeholder
- Ticketing placeholder
- Sponsor / partner inquiry section
- Email signup form
- English-first structure with Portuguese and Spanish support prepared

### Lead Capture

Capture:

- Email
- Language preference
- Visit dates or duration
- Optional visitor type later: fan, venue, sponsor, community partner

Store leads in Supabase.

### Venue Directory

Each venue should support:

- Name
- Category
- Neighborhood
- Address or map URL
- Benefit description
- Active date range
- Status: draft, pending, confirmed, paused
- Tags: watch party, food, nightlife, rooftop, pickup candidate, sponsor activation

MVP can start with manually managed venue data.

### Admin MVP

For the first MVP, avoid building a custom admin dashboard unless needed.

Recommended starting point:

- Manage leads and venues directly in Supabase tables.
- Add a protected admin UI only after the data model stabilizes.

## Non-Goals For MVP

- No payment processing inside the app yet
- No official match score API until data source is approved
- No custom bracelet QR validation system yet
- No native mobile app
- No complex CRM integration
- No paid analytics or observability platform
- No Kubernetes, Redis, queues, or background job infrastructure

## Recommended Architecture

### Frontend

- React + Vite
- Tailwind CSS
- Local shadcn-style primitives
- Hosted on Vercel

### Backend

Use Supabase for MVP backend:

- Postgres database
- Row Level Security
- Auth later if admin UI is added
- Edge Functions only if server-side form validation or integrations become necessary

### DNS / Edge

- Cloudflare for DNS, CDN, WAF, and redirects
- Vercel for frontend hosting

### Repository / CI

- GitHub repo: `frankomatic5000/nycup26-gamepass`
- Pull requests for changes
- Vercel preview deployments
- Add GitHub Actions later for lint/build if Vercel checks are not enough

## Data Model

### `leads`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | primary key |
| `email` | text | required, unique optional |
| `language` | text | English, Portuguese, Spanish |
| `visit_window` | text | flexible MVP field |
| `source` | text | default `landing_page` |
| `created_at` | timestamptz | default now |

### `venues`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | primary key |
| `name` | text | required |
| `category` | text | bar, restaurant, rooftop, nightlife, etc. |
| `neighborhood` | text | NYC neighborhood |
| `address` | text | optional |
| `map_url` | text | optional |
| `benefit` | text | placeholder or confirmed benefit |
| `valid_from` | date | optional |
| `valid_to` | date | optional |
| `status` | text | draft, pending, confirmed, paused |
| `tags` | text[] | optional |
| `created_at` | timestamptz | default now |

### `ticker_items`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | primary key |
| `label` | text | e.g. Game Pass, Venues, Pickup |
| `message` | text | ticker copy |
| `priority` | int | sort order |
| `active` | boolean | show/hide |
| `starts_at` | timestamptz | optional |
| `ends_at` | timestamptz | optional |

## User Flows

### Visitor

1. Arrives from social, search, partner, or QR.
2. Understands the bracelet value in under 5 seconds.
3. Browses benefits and venues.
4. Joins the waitlist.
5. Receives future updates when ticketing and pickup are confirmed.

### Venue Partner

1. Reviews the sponsor/partner section.
2. Submits interest through email or future partner form.
3. Team manually follows up.

### Sponsor

1. Understands NYCUP26 can reach visiting fans.
2. Requests partnership details.
3. Team manually handles sponsorship pipeline.

## Implementation Phases

### Phase 1: Static MVP

- Current landing page
- Static venue/ticker content
- Vercel deploy
- No backend dependency

### Phase 2: Lead Capture

- Add Supabase project
- Create `leads` table
- Connect signup form
- Add spam protection with low-friction approach
- Add success/error states tied to real persistence

### Phase 3: Managed Content

- Add `venues` and `ticker_items` tables
- Load venue and ticker data from Supabase
- Keep fallback static content for resilience

### Phase 4: Ticketing / Pickup

- Add confirmed ticketing links
- Add confirmed pickup location
- Add post-purchase instructions
- Consider QR code or order reference later

### Phase 5: Real-Time Match/Event Feed

- Select an approved data source for World Cup schedules/scores
- Confirm cost, usage limits, and licensing
- Cache results to avoid unnecessary API calls
- Show clearly sourced match/ticker updates

## Cost Architecture

### Cheapest Option

- Vercel free tier
- Supabase free tier
- Cloudflare free DNS/CDN
- Manual venue/ticker management

Estimated monthly cost: `$0` until traffic, storage, or backend usage exceeds free tiers.

### Recommended MVP Option

- Vercel for frontend
- Supabase for leads and managed content
- Cloudflare for DNS and security
- GitHub for source control and PR workflow

Estimated monthly cost: `$0-$25` depending on traffic and whether paid Vercel/Supabase features become necessary.

### Cost Risks

- Paid sports data APIs for real-time scores
- Email marketing platforms
- SMS or WhatsApp messaging
- High traffic image bandwidth
- Paid analytics or CRM tools

### Vendor Lock-In Risk

- Vercel lock-in: low for static frontend
- Supabase lock-in: moderate but Postgres keeps data portable
- Sports data API lock-in: high if custom schema depends on one provider

### Simpler Alternative

Keep the site static until:

- Final venue list is known
- Ticketing platform is selected
- Waitlist volume justifies backend work

## Security / Privacy

- Do not collect unnecessary personal data.
- Store only email, language, visit window, and consent/source metadata.
- Add Supabase Row Level Security before accepting production leads.
- Never expose Supabase service-role keys in frontend code.
- Use environment variables for public anon key and project URL.
- Add a privacy policy before serious lead collection.

## Open Questions

- Final ticketing platform: Camarote Tickets, Eventbrite, or both?
- Final pickup location?
- Will bracelet have QR validation, visual validation, or both?
- Does the MVP need sponsor lead capture or just a contact CTA?
- Which languages are required at launch: English only, or English + Portuguese + Spanish?
- What is the approved source for real-time match schedules/scores?
- Is `nycup26.com` managed in Cloudflare already?

## Definition Of Done For MVP

- Production site loads on `nycup26.com`.
- Page is mobile and desktop responsive.
- Signup form stores leads in Supabase.
- Venue list can be updated without code deployment.
- Ticker can be updated without code deployment.
- Placeholder benefits are clearly marked until confirmed.
- Site includes disclaimer that it is not an official FIFA website.
- Lint and build pass.
- Vercel production deployment succeeds.
