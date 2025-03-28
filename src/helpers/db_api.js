import mongoose from "mongoose";
import event from "../models/eventModel";

export async function connectDatabase() {
  const DB_URL = process.env.DB_URL;

  mongoose
    .connect(DB_URL)
    .then(() => console.log("DB connected!"))
    .catch((e) => {
      console.log("Database connection error", e);
      process.exit(1);
    });
}

export async function getFeaturedEvents() {
  const documents = await event.find({ isFeatured: true });

  return documents;
}

export async function getAllEvents() {
  const documents = await event.find();

  return documents;
}

export async function getEventById(eventId) {
  const documents = await event.findOne({ _id: eventId });

  return documents;
}

export async function getFilteredEvents(year, month) {
  const startDate = new Date(year, month - 1, 1);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(year, month, 0);

  const filteredEvents = await event.find({
    date: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    },
  });

  return filteredEvents;
}
