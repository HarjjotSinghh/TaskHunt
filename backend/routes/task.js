const express = require("express")
const { authenticate } = require("../middlewares/auth")
const {getAllTasks, createTask, getTaskByID, deleteTask, updateTask, getAllTags} = require("../controllers/task")
const router = express.Router()

router.get("/", getAllTasks)
router.get("/tags", getAllTags)
router.get("/:taskID", getTaskByID)
router.post("/create", authenticate, createTask)
router.post("/delete/:taskID", authenticate, deleteTask)
router.post("/update/:taskID", authenticate, updateTask)

module.exports = router
