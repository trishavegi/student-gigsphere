const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  toggleFavorite,
  getFavorites
} = require("../controllers/favoriteController");

router.post("/", protect, toggleFavorite);

router.get("/", protect, getFavorites);

module.exports = router;