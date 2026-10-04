import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding Supabase database...");

  // 1. Seed Reviews
  try {
    const reviewsRaw = await fs.readFile(path.join(process.cwd(), "src/data/reviews.json"), "utf-8");
    const reviews = JSON.parse(reviewsRaw);
    console.log(`Found ${reviews.length} local reviews. Uploading to Supabase...`);

    const { error: revErr } = await supabase.from("reviews").upsert(reviews, { onConflict: "id" });
    if (revErr) {
      console.error("Error seeding reviews:", revErr.message);
    } else {
      console.log("✓ Successfully seeded reviews into Supabase!");
    }
  } catch (e) {
    console.error("Reviews file error:", e.message);
  }

  // 2. Seed Rooms
  try {
    const roomsRaw = await fs.readFile(path.join(process.cwd(), "src/data/rooms.json"), "utf-8");
    const rooms = JSON.parse(roomsRaw);
    console.log(`Found ${rooms.length} local rooms. Uploading to Supabase...`);

    const { error: roomErr } = await supabase.from("rooms").upsert(rooms, { onConflict: "id" });
    if (roomErr) {
      console.error("Error seeding rooms:", roomErr.message);
    } else {
      console.log("✓ Successfully seeded rooms into Supabase!");
    }
  } catch (e) {
    console.error("Rooms file error:", e.message);
  }

  // 3. Seed Photos
  try {
    const photosRaw = await fs.readFile(path.join(process.cwd(), "src/data/photos.json"), "utf-8");
    const photos = JSON.parse(photosRaw);
    console.log(`Found ${photos.length} local photos. Uploading to Supabase...`);

    const { error: photoErr } = await supabase.from("photos").upsert(photos, { onConflict: "id" });
    if (photoErr) {
      console.error("Error seeding photos:", photoErr.message);
    } else {
      console.log("✓ Successfully seeded photos into Supabase!");
    }
  } catch (e) {
    console.error("Photos file error:", e.message);
  }
}

seed();
