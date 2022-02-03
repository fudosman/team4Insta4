const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    uploader: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
      // get the id of the creator of this post
    },
    image: {
      // get the image
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: [],
    // list of ids of people that liked the post
    comments: [],
    // list of ids of people that commented on the post
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Post", postSchema);
