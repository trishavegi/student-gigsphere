const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus,
    cancelBooking
} = require("../controllers/bookingController");

router.post("/",protect,createBooking);
router.get("/my", protect, getMyBookings);
router.get("/provider", protect, getProviderBookings);
router.put("/:id", protect, updateBookingStatus);
router.put(
  "/cancel/:id",
  protect,
  cancelBooking
);

module.exports = router;