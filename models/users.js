const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    image: {
      type: String
    },

    email: {
      type: String,
      required: true,
      unique: true,
      //An alternative to regex to perform email validation
      validate: [validator.isEmail, 'Please Provide a valid email'],
    },

    phone: {
      type: String,
      required: true
    },

    password: {
      type : String,
      required: true
    },

    username: {
      type: String
    },

    following: [],
    followers: []
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


module.exports = mongoose.model("User", userSchema);
