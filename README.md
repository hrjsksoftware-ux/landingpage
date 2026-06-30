# Jan Suvidha Kendra — Lead Generation Landing Page

A CRO-focused, Hinglish landing page for the **Jan Suvidha Kendra** partner program
("Aapka Ghar Aapki Dukan"). Single static `index.html` with a shared popup lead form
that saves leads to **both Supabase and Google Sheets**.

## Files
| File | Purpose |
|---|---|
| `index.html` | The full landing page (self-contained: CSS + JS inline). |
| `logo.png`, `favicon.png` | Brand logo + browser icon. |
| `hero-desktop.png`, `hero-mobile.png` | Responsive hero illustrations (the "dukan"). |
| `shopkeeper.png`, `services-illus.png`, `strip-wide.png` | Section visuals. |
| `backend/supabase-setup.sql` | Run in Supabase to create the `leads` table + insert policy. |
| `backend/google-apps-script.gs` | Google Apps Script that writes leads into a Sheet. |

## How leads are captured
Every CTA on the page ("Free Apply Karein", "Free Callback Lein", etc.) opens the
**same popup modal** with one lead form. On submit, the page sends the lead to **both**:
1. **Supabase** — REST insert into the `leads` table (your admin/database).
2. **Google Sheets** — via an Apps Script web app (easy spreadsheet view).

If at least one succeeds, the user sees the "Dhanyavaad!" success state.

## Setup (do these before going live)

### 1. Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. SQL Editor → paste & run `backend/supabase-setup.sql`.
3. Project Settings → API → copy **Project URL** and **anon public key**.
4. In `index.html`, fill `CONFIG.SUPABASE_URL` and `CONFIG.SUPABASE_ANON`.
5. View leads anytime in **Table Editor → leads** (and Export CSV).

> Security: the anon key can only **insert**, never read leads (Row Level Security).

### 2. Google Sheets
1. Create a Sheet with headers: `created_at | name | phone | city | experience | source`.
2. Extensions → Apps Script → paste `backend/google-apps-script.gs`.
3. Deploy → New deployment → **Web app**, Execute as **Me**, Access **Anyone** → copy URL.
4. In `index.html`, fill `CONFIG.SHEET_URL`.

### 3. Contact number
Replace `+919990143166` / `919990143166` throughout `index.html` with the real number.

## Run / preview
Just open `index.html` in a browser. Until the CONFIG values are filled it runs in
**demo mode** (logs the lead to the console and still shows the success screen).

## Deploy
Static hosting works anywhere — **Vercel**, Netlify, GitHub Pages, etc.
Vercel: import this repo → framework "Other" → deploy. No build step needed.
