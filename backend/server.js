const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://house-hunt-three.vercel.app"
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.options("*", cors());

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "HouseHunt API is running"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);

    res.status(500).json({
        message: "Internal server error"
    });
});

// Render provides PORT through environment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});