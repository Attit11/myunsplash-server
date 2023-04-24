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

//generating auth token using jsonwebtoken
//methods are accessible on instances
userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    //creating an auth token
    const token = jwt.sign({ _id: user._id.toString() }, "myunsplash");
    //adding token in user instance
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (error) {
    console.log("❌Error generating auth token!", e);
    throw new Error({ e });
  }
};

//finding user by credentials for implementing login functionality
//statics function are accessible to model
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = User.findOne({email})
    if(!user){
        throw new Error("Unable to login!")
    }
    //comparing stored password with user entered password
    const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login!")
    }
    return user

}

//user image relationship
userSchema.virtual("images", {
    ref:"Image",
    localField: "_id",
    foreignField: "owner"
})




const User = mongoose.model("User", userSchema);

module.exports = User;
