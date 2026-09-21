const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const User = require("./models/User");
const Property = require("./models/Property");

dotenv.config();

const properties = [
    {
        title: "2 BHK Modern Apartment",
        description:
            "Modern 2 BHK apartment with spacious rooms, natural lighting, parking and excellent connectivity.",
        location: "Visakhapatnam",
        price: 18000,
        propertyType: "Apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1250,
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "1 BHK City Apartment",
        description:
            "Comfortable 1 BHK apartment located close to shopping areas, restaurants and public transport.",
        location: "Vijayawada",
        price: 11000,
        propertyType: "Apartment",
        bedrooms: 1,
        bathrooms: 1,
        area: 700,
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "3 BHK Family House",
        description:
            "Spacious independent house suitable for families with a peaceful neighborhood and dedicated parking.",
        location: "Eluru",
        price: 22000,
        propertyType: "House",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Luxury 3 BHK Villa",
        description:
            "Premium villa featuring spacious bedrooms, modern interiors, private parking and a beautiful outdoor area.",
        location: "Visakhapatnam",
        price: 35000,
        propertyType: "Villa",
        bedrooms: 3,
        bathrooms: 3,
        area: 2400,
        image:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Premium PG for Students",
        description:
            "Fully furnished PG accommodation with essential amenities, comfortable rooms and convenient access to colleges.",
        location: "Vijayawada",
        price: 7500,
        propertyType: "PG",
        bedrooms: 1,
        bathrooms: 1,
        area: 450,
        image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "2 BHK Gated Community",
        description:
            "Well-maintained 2 BHK apartment in a gated community with security, parking and recreational facilities.",
        location: "Hyderabad",
        price: 25000,
        propertyType: "Apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1350,
        image:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Spacious 4 BHK Villa",
        description:
            "Large premium villa with four bedrooms, modern interiors, spacious living areas and private parking.",
        location: "Hyderabad",
        price: 45000,
        propertyType: "Villa",
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Cozy Single Room",
        description:
            "Affordable furnished single room ideal for working professionals looking for convenient city accommodation.",
        location: "Bengaluru",
        price: 9000,
        propertyType: "Room",
        bedrooms: 1,
        bathrooms: 1,
        area: 500,
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "3 BHK Independent House",
        description:
            "Independent 3 BHK house with spacious interiors, good ventilation, parking and a family-friendly neighborhood.",
        location: "Vijayawada",
        price: 28000,
        propertyType: "House",
        bedrooms: 3,
        bathrooms: 3,
        area: 2100,
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Budget 1 BHK Apartment",
        description:
            "Affordable 1 BHK apartment with a clean interior, good ventilation and easy access to local facilities.",
        location: "Eluru",
        price: 9000,
        propertyType: "Apartment",
        bedrooms: 1,
        bathrooms: 1,
        area: 650,
        image:
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=900&q=85"
    }
];


const seedProperties = async () => {
    try {
        await connectDB();

        console.log("Connected to MongoDB");


        // Find existing admin/test user
        const owner = await User.findOne({
            email: "testuser@gmail.com"
        });

        if (!owner) {
            console.log(
                "Owner user not found. Please make sure testuser@gmail.com exists."
            );

            process.exit(1);
        }


        console.log(
            `Using property owner: ${owner.name}`
        );


        let addedCount = 0;
        let skippedCount = 0;


        for (const propertyData of properties) {

            // Prevent duplicate properties if script is run again
            const existingProperty =
                await Property.findOne({
                    title: propertyData.title
                });

            if (existingProperty) {
                console.log(
                    `Skipped: ${propertyData.title}`
                );

                skippedCount++;

                continue;
            }


            await Property.create({
                title: propertyData.title,
                description: propertyData.description,
                location: propertyData.location,
                price: propertyData.price,
                propertyType: propertyData.propertyType,
                bedrooms: propertyData.bedrooms,
                bathrooms: propertyData.bathrooms,
                area: propertyData.area,
                images: [propertyData.image],
                owner: owner._id,
                status: "available",
                approved: true
            });


            console.log(
                `Added: ${propertyData.title}`
            );

            addedCount++;
        }


        console.log("");
        console.log("=================================");
        console.log("Property seeding completed");
        console.log("=================================");
        console.log(`Added: ${addedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        console.log("=================================");


        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {

        console.error(
            "Error seeding properties:",
            error.message
        );

        await mongoose.connection.close();

        process.exit(1);
    }
};


seedProperties();