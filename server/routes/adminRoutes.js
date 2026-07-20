const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getAllUsers,
  deleteUser,
  deleteService,
  updateServiceStatus,
  getAllBookings,
  updateBookingStatus,
  getAnalytics,
  getMonthlyAnalytics,
    getProviders,
      approveProvider,
suspendProvider,

} = require("../controllers/adminController");
router.get("/dashboard", protect, adminOnly, getDashboard);

router.get("/users", protect, adminOnly, getAllUsers);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.delete("/services/:id", protect, adminOnly, deleteService);

router.put("/services/:id", protect, adminOnly, updateServiceStatus);

router.get("/bookings", protect, adminOnly, getAllBookings);

router.put("/bookings/:id", protect, adminOnly, updateBookingStatus);

router.get("/analytics", protect, adminOnly, getAnalytics);

router.get("/monthly-analytics", protect, adminOnly, getMonthlyAnalytics);

router.get("/providers", protect, adminOnly, getProviders);

router.put("/providers/:id/approve", protect, adminOnly, approveProvider);
router.put("/providers/:id/suspend", protect, adminOnly,suspendProvider);
module.exports = router;