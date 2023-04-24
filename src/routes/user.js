const express = require("express");
const User = require("../model/user");

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
    //generating auth token
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log("❌ Error Occurred! ", error);
    res.status(400).send({ error });
  }
});

module.exports = router;
