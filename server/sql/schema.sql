-- Portfolio Supabase Schema
-- Run in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL DEFAULT 'Hello, I am' CHECK (char_length(heading) <= 100),
  subheading TEXT NOT NULL DEFAULT 'Full Stack Developer' CHECK (char_length(subheading) <= 200),
  cta_text TEXT DEFAULT 'View My Work' CHECK (char_length(cta_text) <= 50),
  cta_link TEXT DEFAULT '#portfolio' CHECK (char_length(cta_link) <= 200),
  profile_image TEXT DEFAULT 'default-avatar.png',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL DEFAULT 'Write about yourself here...' CHECK (char_length(description) <= 2000),
  image TEXT DEFAULT 'default-about.png',
  extra_info TEXT DEFAULT '' CHECK (char_length(extra_info) <= 1000),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  github TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  twitter TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- express-session store (connect-pg-simple)
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey";
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_hero_updated_at ON hero;
CREATE TRIGGER update_hero_updated_at BEFORE UPDATE ON hero
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_about_updated_at ON about;
CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_updated_at ON contact;
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket note:
-- Create public bucket "portfolio-images" in Supabase Dashboard → Storage
