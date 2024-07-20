import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUser: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
