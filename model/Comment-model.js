import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
