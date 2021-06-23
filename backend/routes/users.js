const express = require("express");

// Controllers
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Express router
const router = express.Router();

// Advance results
const advanceResults = require("../middlewares/advanceResults");
const { protect, authorization } = require("../middlewares/auth");
const User = require("../models/user.model");

router.use(protect);
router.use(authorization("admin"));

router.route("/").get(advanceResults(User, ""), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
