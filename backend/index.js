const express = require("express")
const connectDB = require("./db")
const cors = require("cors")
require("dotenv").config()
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const taskRoutes = require("./routes/task")
const applicationRoutes = require("./routes/application")

const app = express()
const PORT = process.env.PORT || 8000

// Connect to MongoDB
connectDB()

// Parse JSON request body
app.use(express.json())

// Use CORS
app.use(cors())

// Define authentication routes
app.use("/auth", authRoutes)

// Define user routes
app.use("/user", userRoutes)

// Define task routes
app.use("/api/tasks", taskRoutes)

// Define applications routes
app.use("/api/applications", applicationRoutes)

app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.send("Server is running.")
    next();
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
