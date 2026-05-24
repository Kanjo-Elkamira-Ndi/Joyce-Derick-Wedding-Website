-- ============================================================
--  Joyce & Derick Wedding DB  —  schema.sql
--  Run: psql -U postgres -d wedding_db -f schema.sql
-- ============================================================

-- ── Extensions ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Admin ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  password_hash TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── RSVPs ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rsvps (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name       TEXT        NOT NULL,
  email           TEXT        NOT NULL,
  attending       BOOLEAN     NOT NULL,
  meal_preference TEXT        CHECK (meal_preference IN ('beef','fish','veg')),
  plus_one_name   TEXT,
  dietary_notes   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Media (photos + videos) ─────────────────────────────
CREATE TABLE IF NOT EXISTS media (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url           TEXT        NOT NULL,         -- Cloudinary secure_url
  public_id     TEXT        NOT NULL UNIQUE,  -- Cloudinary public_id (for deletion)
  resource_type TEXT        NOT NULL DEFAULT 'image' CHECK (resource_type IN ('image','video')),
  album         TEXT        NOT NULL DEFAULT 'pre-wedding' CHECK (album IN ('pre-wedding','engagement','ceremony','reception','honeymoon')),
  caption       TEXT,
  approved      BOOLEAN     NOT NULL DEFAULT TRUE,   -- admin uploaded = auto-approved
  submitted_by  TEXT,                                -- guest name if guest submitted
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_album    ON media(album);
CREATE INDEX IF NOT EXISTS idx_media_approved ON media(approved);

-- ── Guestbook ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS guestbook (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name  TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  approved    BOOLEAN     NOT NULL DEFAULT FALSE,  -- must be approved by admin
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guestbook_approved ON guestbook(approved);
