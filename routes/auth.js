const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
/**
 * @route  GET api/users
 * @desc   Get logged in user
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
});

/**
 * @route  POST api/users
 * @desc   Auth user and get token
 * @access Public
 */
router.post(
  "/",
  [
    check("email", "Please include a valid email ").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid Credentials, Password or username is wrong" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      /**The token is for the logged/this in user is returned
       * and a middleware extracts the id to keep track of this user.
       */
      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
