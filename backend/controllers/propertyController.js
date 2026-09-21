const Property = require("../models/Property");


// ======================================
// CREATE PROPERTY
// ======================================

const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            price,
            propertyType,
            bedrooms,
            bathrooms,
            area,
            images
        } = req.body;

        if (
            !title ||
            !description ||
            !location ||
            price === undefined ||
            !propertyType ||
            bedrooms === undefined ||
            bathrooms === undefined ||
            area === undefined
        ) {
            return res.status(400).json({
                message:
                    "Please provide all required property details"
            });
        }

        const property = await Property.create({
            title,
            description,
            location,
            price,
            propertyType,
            bedrooms,
            bathrooms,
            area,
            images: images || [],
            owner: req.user.id
        });

        res.status(201).json({
            message: "Property created successfully",
            property
        });
    } catch (error) {
        console.error(
            "Create property error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ======================================
// GET ALL / SEARCH PROPERTIES
// ======================================

const getProperties = async (req, res) => {
    try {
        const {
            location,
            minPrice,
            maxPrice,
            propertyType,
            bedrooms
        } = req.query;

        const filter = {
            approved: true
        };


        // LOCATION FILTER

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }


        // PRICE FILTER

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }


        // PROPERTY TYPE

        if (propertyType) {
            filter.propertyType = propertyType;
        }


        // BEDROOMS

        if (bedrooms) {
            filter.bedrooms = Number(bedrooms);
        }


        const properties = await Property.find(filter)
            .populate("owner", "name email")
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            count: properties.length,
            properties
        });
    } catch (error) {
        console.error(
            "Get properties error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ======================================
// GET SINGLE PROPERTY
// ======================================

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(
            req.params.id
        ).populate(
            "owner",
            "name email"
        );

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        res.status(200).json({
            property
        });
    } catch (error) {
        console.error(
            "Get property error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ======================================
// UPDATE PROPERTY
// ======================================

const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(
            req.params.id
        );

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }


        // CHECK PROPERTY OWNER

        if (
            property.owner.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You can only update your own property"
            });
        }


        // ONLY THESE FIELDS CAN BE UPDATED

        const allowedFields = [
            "title",
            "description",
            "location",
            "price",
            "propertyType",
            "bedrooms",
            "bathrooms",
            "area",
            "images"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });


        // NO VALID FIELDS

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message:
                    "No valid fields provided for update"
            });
        }


        const updatedProperty =
            await Property.findByIdAndUpdate(
                req.params.id,
                updates,
                {
                    new: true,
                    runValidators: true
                }
            );


        res.status(200).json({
            message:
                "Property updated successfully",
            property: updatedProperty
        });
    } catch (error) {
        console.error(
            "Update property error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ======================================
// DELETE PROPERTY
// ======================================

const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(
            req.params.id
        );

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }


        // CHECK PROPERTY OWNER

        if (
            property.owner.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You can only delete your own property"
            });
        }


        await property.deleteOne();

        res.status(200).json({
            message:
                "Property deleted successfully"
        });
    } catch (error) {
        console.error(
            "Delete property error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ======================================
// EXPORT
// ======================================

module.exports = {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
};