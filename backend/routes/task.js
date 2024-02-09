const express = require("express")
const { authenticate } = require("../middlewares/auth")
const {getAllTasks, createTask} = require("../controllers/task")
const router = express.Router()

router.get("/", getAllTasks)

router.post("/create", authenticate, createTask)

module.exports = router
