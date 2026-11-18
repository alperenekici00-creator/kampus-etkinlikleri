import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

async function runSeed() {
  try {
    await connectDatabase();
    await Event.deleteMany({});
    const created = await Event.insertMany(seedEvents);
    console.log(`${created.length} etkinlik eklendi`);
  } catch (err) {
    console.error("Seed hatası:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

runSeed();
