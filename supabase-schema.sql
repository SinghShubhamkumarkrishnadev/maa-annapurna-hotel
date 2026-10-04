-- ==========================================================
-- Maa Annapurna Home Stay & Hotel - Supabase Schema
-- Run this script in Supabase Dashboard -> SQL Editor -> "+ New Query"
-- ==========================================================

-- 1. Create REVIEWS Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT DEFAULT '',
  avatar TEXT DEFAULT 'zen',
  date TEXT NOT NULL,
  "stayType" TEXT DEFAULT 'Family Pilgrimage',
  verified BOOLEAN DEFAULT true,
  "createdAt" TEXT DEFAULT NOW()::text,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create ROOMS Table
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT DEFAULT '',
  image TEXT NOT NULL,
  beds TEXT DEFAULT '1 Queen / Double Bed',
  guests TEXT DEFAULT '2 Guests',
  price NUMERIC NOT NULL DEFAULT 1299,
  "originalPrice" NUMERIC DEFAULT 1899,
  discount TEXT DEFAULT '',
  "priceNote" TEXT DEFAULT 'Direct Host Deal',
  status TEXT DEFAULT 'Available Today',
  "statusType" TEXT DEFAULT 'available',
  "availableUnits" INTEGER DEFAULT 2,
  "totalUnits" INTEGER DEFAULT 2,
  "bookedToday" INTEGER DEFAULT 0,
  "availabilityText" TEXT DEFAULT '2 Rooms Available Today',
  "isAvailable" BOOLEAN DEFAULT true,
  "isActive" BOOLEAN DEFAULT true,
  features JSONB DEFAULT '[]'::jsonb,
  description TEXT DEFAULT '',
  alt TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create PHOTOS Table
CREATE TABLE IF NOT EXISTS public.photos (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'rooms',
  src TEXT NOT NULL,
  width INTEGER DEFAULT 1600,
  height INTEGER DEFAULT 738,
  alt TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- Enable Row Level Security (RLS) & Grant Full Access Policies
-- ==========================================================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Allow public and server keys to select, insert, update, and delete
CREATE POLICY "Public full access reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access rooms" ON public.rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access photos" ON public.photos FOR ALL USING (true) WITH CHECK (true);
