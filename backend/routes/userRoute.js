const express = require("express");
const { getUser, getUserId, createUser, login, deleteUser, updateUser } = require("../controller/userController");
const router = express.Router();

// get all user
router.get("/", getUser);

// get user by ID
router.get("/:id", getUserId);

// create user
router.post("/", createUser);

// login user
router.post("/login", login);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router
