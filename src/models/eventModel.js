import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  image: String,
  isFeatured: Boolean,
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
