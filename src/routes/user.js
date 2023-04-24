const express = require("express");
const User = require("../model/user");
const auth = require("../middleware/auth");

const router = new express.Router();

//creating user
router.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    //generating auth token
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log("❌ Error Occurred! ", error);
    res.status(400).send({ error });
  }
});

//user login
router.post("/user/login", async (req, res) => {
  try {
    //finding user by credentials
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //generating auth token
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log("❌ Error Occurred! ", error);
    res.status(400).send({ error });
  }
});

//get user
router.get("/user/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log("❌ Error Occurred! ", error);
    res.status(401).send({ error });
  }
});

//delete user
router.delete("/user", auth, async (req, res) => {
  try {
    //finding user by credentials
    const user = await User.findByCredentialsAndDelete(
      req.user.email,
      req.body.password
    );
    if (!user) {
      throw new Error("Unable to find the user");
    }
    res.send({ message: "User Deleted!" });
  } catch (error) {
    console.log("❌ Error Occurred! ", error);
    res.status(401).send({ error });
  }
});

module.exports = router;
