const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createComplaint,
  getAllComplaints,
  resolveComplaint,
} = require("../controllers/complaintController");

// Customer creates complaint
router.post("/", protect, createComplaint);

// Admin views all complaints
router.get("/", getAllComplaints);

// Admin resolves complaint
router.put("/:id", resolveComplaint);

module.exports = router;