const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("skills cannot be greater than 10");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
