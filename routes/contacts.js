const express = require("express");
const router = express.Router();

// Include CORS in the API calls

/**
 * @route  GET api/users
 * @desc   Get all user contacts
 * @access Private
 */
router.get("/", (req, res) => {
  res.send("Get all Contacts");
});

/**
 * @route  POST api/users
 * @desc   Get akk user contacts
 * @access Private
 */
router.post("/", (req, res) => {
  res.send("Add a Contact");
});

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
