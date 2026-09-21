const Booking = require("../models/Booking");
const Property = require("../models/Property");

// =========================
// CREATE BOOKING
// =========================
const createBooking = async (req, res) => {
    try {
        const {
            propertyId,
            startDate,
            endDate
        } = req.body;

        if (!propertyId || !startDate || !endDate) {
            return res.status(400).json({
                message:
                    "Please provide property, start date and end date"
            });
        }

        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        if (!property.approved) {
            return res.status(400).json({
                message:
                    "This property is not approved for booking"
            });
        }

        if (property.status === "rented") {
            return res.status(400).json({
                message: "Property is already rented"
            });
        }

        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                message: "End date must be after start date"
            });
        }

        const overlappingBooking =
            await Booking.findOne({
                property: propertyId,
                status: {
                    $in: ["pending", "approved"]
                },
                startDate: {
                    $lt: new Date(endDate)
                },
                endDate: {
                    $gt: new Date(startDate)
                }
            });

        if (overlappingBooking) {
            return res.status(400).json({
                message:
                    "This property is already booked for the selected dates"
            });
        }

        const booking = await Booking.create({
            property: propertyId,
            user: req.user.id,
            startDate,
            endDate
        });

        console.log(
            "BOOKING CREATED:",
            booking._id.toString(),
            "Status:",
            booking.status
        );

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        console.error(
            "Create booking error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =========================
// GET MY BOOKINGS
// =========================
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user.id
        })
            .populate("property")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        console.log(
            "MY BOOKINGS USER:",
            req.user.id
        );

        console.log(
            "MY BOOKINGS:",
            bookings.map((booking) => ({
                id: booking._id.toString(),
                property: booking.property?.title,
                status: booking.status
            }))
        );

        res.status(200).json({
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error(
            "Get bookings error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =========================
// GET SINGLE BOOKING
// =========================
const getBookingById = async (req, res) => {
    try {
        const booking =
            await Booking.findById(req.params.id)
                .populate("property")
                .populate("user", "name email");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (
            booking.user._id.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You can only view your own booking"
            });
        }

        res.status(200).json({
            booking
        });

    } catch (error) {
        console.error(
            "Get booking error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =========================
// CANCEL BOOKING
// =========================
const cancelBooking = async (req, res) => {
    try {
        const booking =
            await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (
            booking.user.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You can only cancel your own booking"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message:
                    "Booking is already cancelled"
            });
        }

        booking.status = "cancelled";

        await booking.save();

        console.log(
            "BOOKING CANCELLED:",
            booking._id.toString()
        );

        res.status(200).json({
            message:
                "Booking cancelled successfully",
            booking
        });

    } catch (error) {
        console.error(
            "Cancel booking error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking
};