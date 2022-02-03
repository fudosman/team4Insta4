const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
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
      type: String,
      unique: true
    },

    following: [
      { 
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      }
    ],
    followers: [
      {
         user : {
           type: mongoose.Schema.ObjectId,
           ref: 'User'
         }
      }
    ]
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


module.exports = mongoose.model("User", userSchema);
