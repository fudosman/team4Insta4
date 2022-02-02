const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String
    },

    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    profilePicture: {
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
      hash: {
        type: String,
        required: true
      },
      salt: String
    },

    feed: []
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


//INSTANCE METHODS
userSchema.methods.setPassword = (pwd) => {
  this.password.salt = await bcrypt.genSalt(10);
  this.password.hash = await bcrypt.hash(pwd, this.password.salt);
};

module.exports = mongoose.model("User", userSchema);
