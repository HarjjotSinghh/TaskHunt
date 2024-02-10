const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Application = require("../models/Application")
const Task = require("../models/Task")

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Authentication required" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decodedToken.userId)
        const userApplications = await Application.find({applicant: user._id}).populate(["task", "applicant"])
        const userTasks = await Task.find({owner: user._id}).populate(["applications", "owner"])
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user
        req.user.applications = userApplications
        req.user.tasks = userTasks
        // console.log(user);
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = { authenticate }
