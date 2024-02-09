const express = require("express");
const connectDB = require("./db");
const cors = require('cors')
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Use CORS
app.use(cors())

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
