const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email address!");
      }
    },
  },
  age: {
    type: Number,
    trim: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("Password cannot contain 'password'");
      }
      if (value.length < 6) {
        throw new Error("Password length must be greater than 6");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hashing the password before it gets saved to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
