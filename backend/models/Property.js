const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        propertyType: {
            type: String,
            enum: ["Apartment", "House", "Villa", "PG", "Room"],
            required: true
        },

        bedrooms: {
            type: Number,
            required: true,
            min: 0
        },

        bathrooms: {
            type: Number,
            required: true,
            min: 0
        },

        area: {
            type: Number,
            required: true,
            min: 0
        },

        images: [
            {
                type: String
            }
        ],

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["available", "rented"],
            default: "available"
        },

        approved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Property", propertySchema);