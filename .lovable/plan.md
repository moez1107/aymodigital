# Admin Panel — Deep Detail Plan

## 1. Backend: Lovable Cloud (Supabase)
Enable Lovable Cloud and provision the following tables (all with RLS + grants):

| # | Table | Purpose | Public read | Admin write |
|---|---|---|---|---|
| 1 | `team_members` | Founders + team (Ayesha Tabassum pinned top via `display_order`, role=`founder`) | ✅ | ✅ |
| 2 | `services` | Services shown on /services | ✅ | ✅ |
| 3 | `about_sections` | About page blocks (mission, vision, story) | ✅ | ✅ |
| 4 | `testimonials` | Marquee + carousel | ✅ | ✅ |
| 5 | `case_studies` | Portfolio | ✅ | ✅ |
| 6 | `blog_posts` | Blog | ✅ (published only) | ✅ |
| 7 | `faqs` | FAQ page | ✅ | ✅ |
| 8 | `pricing_plans` | Pricing page | ✅ | ✅ |
| 9 | `industries` | Industries page | ✅ | ✅ |
| 10 | `careers` | Job openings | ✅ | ✅ |
| 11 | `clients_logos` | Featured-clients strip | ✅ | ✅ |
| 12 | `stats` | Hero / success metrics | ✅ | ✅ |
| 13 | `leads` | Contact-form submissions | ❌ | ✅ (admin only) |
| 14 | `messages` | WhatsApp-mirror inbox | ❌ | ✅ |
| 15 | `site_settings` | Logo, phone, WhatsApp #, social, SEO meta | ✅ | ✅ |

Plus `user_roles` (enum `app_role`: `admin`, `editor`) and `has_role()` security-definer function.

## 2. Storage
Bucket `public-media` (public read) for team photos, service icons, case-study covers, blog images, client logos.

## 3. Auth & Admin Bootstrap
- Email/password auth.
- Admin login: `admin@aymo.digital` / `aymo@1107` — seeded via migration that creates the auth user and grants `admin` role.
- `/admin` route guarded by `_authenticated` + `has_role('admin')`. Non-admins are redirected.

## 4. Admin Panel UI (`/admin`)
- Sidebar layout with the 15 modules (icons + labels).
- Dashboard module = overview: counts (leads today, total team, services, posts), recent leads, recent messages.
- Each module page: list table → create/edit dialog → delete confirm. Forms use react-hook-form + zod.
- Image fields: drag-and-drop upload to `public-media` (PC file picker), preview, store public URL.
- Reorder support (drag handle) for team, services, testimonials via `display_order`.

## 5. Public Site Wiring
Replace all hard-coded arrays on `index`, `about`, `services`, `case-studies`, `blog`, `pricing`, `industries`, `careers`, `faq`, `contact` with TanStack Query reads from the tables. Changes in admin are instantly visible.

Contact form & floating WhatsApp form:
- On submit → insert into `leads` / `messages` table (visible in admin).
- AND open WhatsApp deep link with prefilled text to `0325 6900925` (existing behavior).

## 6. Founder Ordering
`team_members` seed:
1. **Ayesha Tabassum** — Founder & CEO (display_order = 0, is_founder = true)
2. Existing leaders below her (display_order ≥ 10).

Admin UI enforces founders sort above non-founders.

## 7. Tech Notes
- Server fns: `createServerFn` + `requireSupabaseAuth` + `has_role` check for all admin mutations.
- Public reads via publishable-key server client OR direct browser client with anon SELECT policies.
- Real-time: subscribe to `leads` & `messages` in admin dashboard for live updates.
- File uploads use Supabase Storage signed upload from the browser after admin auth check.

## 8. Deliverables
- 1 migration creating all tables, enums, role function, policies, grants, storage bucket, seed data (Ayesha + admin user + role).
- `/admin/*` route tree with 15 module pages.
- Refactored public pages reading from DB.
- Reusable `<DataTable>`, `<CrudDialog>`, `<ImageUpload>` admin components.

## 9. Scope Confirmation Needed
This is ~30–40 files of work in one shot. Confirm:
- (a) Proceed end-to-end as described, OR
- (b) Ship in phases (Phase 1: Cloud + auth + team/services/leads/messages/settings; Phase 2: remaining 9 modules + public wiring).

Recommend **(b) phased** for stability — each phase is testable before moving on. Reply "all at once" or "phased" to proceed.
