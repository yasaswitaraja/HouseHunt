const User = require("../models/User");
const Property = require("../models/Property");
const Booking = require("../models/Booking");

// ==========================================
// GET ALL USERS
// ==========================================
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: users.length,
            users
        });

    } catch (error) {
        console.error("Get all users error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// GET ALL PROPERTIES
// ==========================================
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: properties.length,
            properties
        });

    } catch (error) {
        console.error("Get all properties error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// APPROVE PROPERTY
// ==========================================
const approveProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        property.approved = true;

        await property.save();

        res.status(200).json({
            message: "Property approved successfully",
            property
        });

    } catch (error) {
        console.error("Approve property error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// REJECT PROPERTY
// ==========================================
const rejectProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        property.approved = false;

        await property.save();

        res.status(200).json({
            message: "Property rejected successfully",
            property
        });

    } catch (error) {
        console.error("Reject property error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// GET ALL BOOKINGS
// ==========================================
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("property")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error("Get all bookings error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// APPROVE BOOKING
// ==========================================
const approveBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(
            req.params.id
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Only pending bookings can be approved
        if (booking.status !== "pending") {
            return res.status(400).json({
                message:
                    "Only pending bookings can be approved"
            });
        }

        // Check property
        const property = await Property.findById(
            booking.property
        );

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        // Property must be approved
        if (!property.approved) {
            return res.status(400).json({
                message:
                    "This property is not approved"
            });
        }

        // Check for another approved booking
        // with overlapping dates
        const overlappingBooking =
            await Booking.findOne({
                _id: {
                    $ne: booking._id
                },

                property: booking.property,

                status: "approved",

                startDate: {
                    $lt: booking.endDate
                },

                endDate: {
                    $gt: booking.startDate
                }
            });

        if (overlappingBooking) {
            return res.status(400).json({
                message:
                    "Another approved booking already exists for these dates"
            });
        }

        // Approve booking
        booking.status = "approved";

        await booking.save();

        // Get the saved booking again from MongoDB
        const updatedBooking =
            await Booking.findById(booking._id)
                .populate("property")
                .populate("user", "name email");

        console.log(
            "BOOKING APPROVED:",
            updatedBooking._id.toString()
        );

        console.log(
            "NEW STATUS:",
            updatedBooking.status
        );

        res.status(200).json({
            message:
                "Booking approved successfully",

            booking: updatedBooking
        });

    } catch (error) {
        console.error(
            "Approve booking error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// ==========================================
// REJECT BOOKING
// ==========================================
const rejectBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Only pending bookings can be rejected
        if (booking.status !== "pending") {
            return res.status(400).json({
                message: "Only pending bookings can be rejected"
            });
        }

        booking.status = "rejected";

        await booking.save();

        res.status(200).json({
            message: "Booking rejected successfully",
            booking
        });

    } catch (error) {
        console.error("Reject booking error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    getAllUsers,
    getAllProperties,
    approveProperty,
    rejectProperty,
    getAllBookings,
    approveBooking,
    rejectBooking
};