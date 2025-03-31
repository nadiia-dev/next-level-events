import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    eventId: String,
    name: String,
    email: String,
    message: String,
  },
  { versionKey: false }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
