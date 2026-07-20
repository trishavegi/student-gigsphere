const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createService,
  getAllServices,
  searchServices,
  getServiceById,
  getMyServices,
  deleteService,
    updateService


} = require("../controllers/serviceController");

// ✅ Get all services (public)
router.post("/", protect, createService);
router.get("/", getAllServices);
router.get("/search", searchServices);
router.get("/my", protect, getMyServices);
router.get("/:id", getServiceById);


router.delete("/:id", protect, deleteService);
router.put("/:id", protect, updateService);

module.exports = router;