# 💍 Joyce & Derick — Wedding Website

> *Some love stories deserve more than a card. This one gets a whole website.*

A bilingual (French/English) wedding website and digital invitation built for Joyce & Derick's special day. Guests can explore their story, get event details, RSVP, browse photos, and leave heartfelt messages — all in one place. The bride has a private admin panel to upload photos and videos, manage RSVPs, and moderate the guestbook.

---

## ✨ Features

### Guest-facing site
- **Hero** — full-screen landing with the couple's names, wedding date, and a live countdown timer
- **Our Story** — an animated vertical timeline from first meeting to engagement
- **Event Details** — ceremony and reception cards with venue info, maps, and a dress code palette
- **Gallery** — masonry photo grid with album tabs (pre-wedding, engagement, ceremony), lightbox viewer, and a guest photo submission portal
- **RSVP** — elegant form with meal preferences, plus-one, and a WhatsApp RSVP shortcut
- **Guestbook** — guests leave wishes; messages go live after admin approval
- **Bilingual** — full French / English toggle across every section

### Admin panel
- Drag-and-drop photo & video uploads (via Cloudinary)
- RSVP manager with CSV export
- Guest photo submission moderation
- Guestbook message approval queue
- Live site content editing (venue, time, story milestones)

---

## 🛠 Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18 · Vite · TypeScript · Tailwind CSS |
| Animations | Framer Motion |
| Backend | Node.js · Express · TypeScript |
| Database | PostgreSQL |
| Media storage | Cloudinary |
| Auth | JWT (single admin password) |

---

## 🎨 Brand

| Role | Color | Hex |
|---|---|---|
| Primary | Chocolate Brown | `#5A3319` |
| Secondary | Champagne Gold | `#E5C290` |
| Background | Warm Cream | `#FDF8F2` |
| Accent | Light Gold Tint | `#F5ECD8` |

Typography: **Cormorant Garamond** (headings) · **Inter** (body)

---

## 🗂 Project structure

```
wedding-site/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── assets/
│       ├── components/      # Navbar, Countdown, GalleryGrid, RsvpForm…
│       ├── pages/           # Hero, OurStory, EventDetails, Gallery, Rsvp, Guestbook
│       ├── pages/admin/     # AdminLogin, Dashboard, Gallery, Rsvp, Guestbook
│       ├── context/         # LangContext (FR/EN)
│       ├── i18n/            # fr.json · en.json
│       └── styles/          # globals.css (brand tokens + Tailwind base)
└── server/                  # Express + TypeScript API
    └── src/
        ├── routes/          # auth · gallery · rsvp · guestbook
        ├── middleware/       # JWT auth guard
        └── db/              # schema.sql · pg pool
```

---

## 🚀 Getting started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- A Cloudinary account (free tier is fine)

### 1. Clone the repo

```bash
git clone https://github.com/Kanjo-Elkamira-Ndi/Joyce-Derick-Wedding-Website
cd Joyce-Derick-Wedding-Website
```

### 2. Install dependencies

```bash
npm install          # installs both client and server via workspaces
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wedding_db

# Auth
JWT_SECRET=your_super_secret_key
ADMIN_PASSWORD_HASH=bcrypt_hash_of_admin_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# App
PORT=3000
CLIENT_URL=http://localhost:5173
```

### 4. Set up the database

```bash
psql -U your_user -d wedding_db -f server/src/db/schema.sql
```

### 5. Run in development

```bash
# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend
npm run dev:client
```

The client runs at `http://localhost:5173` and the API at `http://localhost:3000`.

---

## 📦 Build for production

```bash
npm run build        # builds both client and server
npm start            # starts the Express server (serves built client)
```

---

## 🗄 Database schema

```sql
-- RSVPs from guests
rsvps (id, full_name, email, attending, meal_preference, plus_one_name, dietary_notes, created_at)

-- Gallery media (photos + videos)
media (id, url, public_id, album, type, approved, uploaded_by, created_at)

-- Guestbook messages
guestbook (id, guest_name, message, approved, created_at)

-- Admin account (single-user)
admin (id, password_hash, created_at)
```

---

## 🌍 Internationalisation

All visible strings live in `client/src/i18n/fr.json` and `en.json`. The active language is managed via `LangContext` and toggled from the navbar. French is the default.

---

## 📸 Media uploads

Photos and videos are uploaded directly from the admin panel to Cloudinary. The server stores the Cloudinary `public_id` and `url` in PostgreSQL. On deletion, the server calls the Cloudinary API to remove the asset before deleting the database record.

---

## 🔐 Admin access

The admin panel lives at `/admin`. It is protected by a single-password login that returns a JWT stored in `localStorage`. The token is sent as a `Bearer` header on all protected API routes. There is intentionally only one admin account — the bride.

---

## 🗺 Roadmap

- [x] Public site — all sections
- [x] FR/EN bilingual toggle
- [x] Admin panel — media uploads
- [x] Admin panel — RSVP manager
- [x] Admin panel — guestbook moderation
- [x] Guest photo submission portal
- [x] Post-wedding gallery unlock (date-triggered)
- [ ] Email/WhatsApp notification to all RSVPs when gallery goes live

---

## 🙏 Built with love

This website was built as a gift for **Joyce & Derick** — may their love be as enduring as this codebase (and far better maintained).

---

*Made in Yaoundé, Cameroon 🇨🇲, Developed by Kanjo Elkamira Ndi*