const express = require("express");

const {
    getAllUsers,
    getAllProperties,
    approveProperty,
    rejectProperty,
    getAllBookings,
    approveBooking,
    rejectBooking
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// USERS
router.get("/users", protect, adminOnly, getAllUsers);

// PROPERTIES
router.get("/properties", protect, adminOnly, getAllProperties);

router.put(
    "/properties/:id/approve",
    protect,
    adminOnly,
    approveProperty
);

router.put(
    "/properties/:id/reject",
    protect,
    adminOnly,
    rejectProperty
);

// BOOKINGS
router.get("/bookings", protect, adminOnly, getAllBookings);

router.put(
    "/bookings/:id/approve",
    protect,
    adminOnly,
    approveBooking
);

router.put(
    "/bookings/:id/reject",
    protect,
    adminOnly,
    rejectBooking
);

module.exports = router;