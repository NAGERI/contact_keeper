const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contacts");

// Include CORS in the API calls

/**
 * @route  GET api/users
 * @desc   Get all user contacts
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route  POST api/users
 * @desc   Get akk user contacts
 * @access Private
 */
router.post(
  "/",
  [auth, check("name", "Name is requires").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const new_contact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await new_contact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * @route  PUT api/users
 * @desc   Update user contacts
 * @access Private
 */
router.put("/:id", (req, res) => {
  res.send("Update Contacts");
});

/**
 * @route  DELETE api/users
 * @desc   Update user contacts
 * @access Private
 */
router.delete("/:id", (req, res) => {
  res.send("Delete Contacts");
});

module.exports = router;
