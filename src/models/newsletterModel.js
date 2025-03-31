import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
  {
    email: String,
  },
  { versionKey: false }
);

export default mongoose.models.Newsletter ||
  mongoose.model("Newsletter", NewsletterSchema);
