# TTCCUL Website — Supabase Setup

Seven files, one project:
- `index.html` + `index.css` + `index.js` — the public site
- `admin.html` + `admin.css` + `admin.js` — the dashboard that edits it
- `schema.sql` — creates the database both of them talk to

The six website files must stay together in the same folder when you deploy — each HTML file loads its matching `.css` and `.js` by filename (`index.html` looks for `index.css`/`index.js` sitting right next to it, same for `admin.html`). `schema.sql` isn't uploaded anywhere on the web host; it only ever gets pasted into Supabase's SQL Editor.

**This copy is already connected** to a live Supabase project (URL and anon key are filled in, in `index.js` and `admin.js`). If that's still the project you're using, skip to **Step 6 — Deploy**. Steps 1–5 are here for the day you need to point these files at a *different* Supabase project.

Takes about 10 minutes.

## 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) → sign up (free tier is enough) → **New Project**.
Pick any name/region, set a database password (save it somewhere — not the same thing as the admin login password), and wait ~2 minutes for it to spin up.

## 2. Run the schema

In your project: **SQL Editor** → **New Query** → paste the entire contents of `schema.sql` → **Run**.

This creates all the tables, locks them down (public can read, only the admin email can write), sets up storage for board photos, form uploads, and site images, and seeds them with exactly what's already on the site today — so nothing changes visually until you actually edit something.

Already ran this once before? Just run it again — every part of it is safe to re-run. Each version has only ever added things (new columns, new tables, new storage buckets), never removed or reset anything you've already entered.

If you ever want a different admin email, change the one line near the top of `schema.sql` (`admin_email text := 'info@ttccul.com'`) before running it, or re-run the `do $$ ... $$` block later with the new address.

## 3. Create the admin login

**Authentication → Users → Add User** (top right). Use TTCCUL's real email and set a password — this is the *only* account that will ever be able to log into `admin.html`, since there's no public sign-up form anywhere on the dashboard. Anyone else who tries a different email or a wrong password is turned away by Supabase itself, not just by the page.

## 4. Get your API keys

**Project Settings → API**. You need two values:
- **Project URL** (looks like `https://xxxxxxxxxxxxx.supabase.co`)
- **anon / public key** (a long string — on newer projects this may be labeled "publishable key" instead of "anon key"; either works the same way here)

This key is *meant* to be public and to live in client-side code like this — it's what your browser uses to talk to Supabase. The actual security is enforced by the row-level security rules `schema.sql` set up (public can read, only your logged-in admin account can write), not by keeping this key secret. Never copy the separate **service_role** key into these files, though — that one bypasses all security and should never leave Supabase's dashboard.

## 5. Connect both files

Open `index.js` and `admin.js` (not the `.html` files — the config now lives in the JavaScript files). Near the top of each, replace:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

with your real values — same two lines, same two values, in both files.

## 6. Deploy

Upload all six website files to wherever you're hosting the site — **same folder, all together**:
`index.html`, `index.css`, `index.js`, `admin.html`, `admin.css`, `admin.js`.

If a file is missing or ends up in a different folder from its HTML file, that page will load with no styling or no functionality (broken layout, or buttons that don't do anything) — the browser just won't find it.

`admin.html` doesn't need to be linked from anywhere public — you (or whoever's admin) just goes to `yoursite.com/admin.html` directly and signs in.

## 7. First login

Go to `admin.html`, sign in with the email + password from step 3, then open **Account Settings** and set a password only you know, if you want to change it from the one you picked in the Supabase dashboard.

---

### If something doesn't work

- **Login says "Incorrect email or password"** → double-check the user exists under Authentication → Users, and that you're not still using the Supabase *database* password from step 1 instead of the auth user's password.
- **Dashboard shows a yellow "not connected" banner** → the two config lines in `admin.js` still have placeholder text, or `admin.js` didn't upload to the same folder as `admin.html`.
- **Page loads with no styling at all (plain black text, no layout)** → the matching `.css` file isn't sitting next to that page's `.html` file.
- **Buttons/forms/menus don't do anything when clicked** → the matching `.js` file isn't sitting next to that page's `.html` file, or didn't finish uploading.
- **Public site shows old content after you edit something** → check that you edited the same values in both `index.js` and `admin.js`, and that you're editing the correct Supabase project if you have more than one.
- **A save fails with "permission denied"** → the grants in `schema.sql` didn't run — re-run the whole script (it's safe to run more than once).
