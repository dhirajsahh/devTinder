const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("weak Password");
        }
      },
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid PhotoURL");
        }
      },
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
    about: String,
  },

  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, "MYDEVTINDERAPP", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
