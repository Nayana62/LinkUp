import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    createdAt: {
      type: Date,
    },
    image: String,
    firstname: String,
    lastname: String,
    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
