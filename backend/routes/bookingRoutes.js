const express = require("express");

const {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create booking
router.post("/", protect, createBooking);

// Get my bookings
router.get("/my", protect, getMyBookings);

// Get single booking
router.get("/:id", protect, getBookingById);

// Cancel booking
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;