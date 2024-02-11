const Application = require("../models/Application")
const Task = require("../models/Task")

async function getAllTasks(req, res, next) {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }).populate("owner")
        return res.status(200).json({
            message: "Successfully fetched all tasks",
            tasks: tasks
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function getAllTags(req, res, next) {
    try {
        const tags = await Task.distinct("tags")
        return res.status(200).json({
            message: "Successfully fetched all tags",
            tags: tags
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function getTaskByID(req, res, next) {
    try {
        const taskID = req.params.taskID
        const task = await Task.findById(taskID).populate(["owner"])
        const applications = await Application.find({task: taskID}).populate(["applicant"])
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        return res
            .status(200)
            .json({ message: "Successfully fetched the task", task: task, applications: applications })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function createTask(req, res, next) {
    try {
        const body = req.body
        const task = new Task({
            name: body.name,
            owner: body.owner,
            description: body.description,
            deadline: body.deadline,
            bounty: body.bounty,
            tags: body.tags,
        })
        await task.save()
        return res.status(200).json({
            message: "Successfully created task",
            task: task
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function updateTask(req, res, next) {
    try {
        const taskID = req.params.taskID
        const updates = req.body
        const task = await Task.findByIdAndUpdate(taskID, updates, {
            new: true
        })
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        return res
            .status(200)
            .json({ message: "Successfully updated task", task: task })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function deleteTask(req, res, next) {
    try {
        const taskID = req.params.taskID
        const task = await Task.findByIdAndDelete(taskID)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        return res.status(200).json({ message: "Successfully deleted task" })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

module.exports = {
    getAllTasks,
    getAllTags,
    createTask,
    getTaskByID,
    updateTask,
    deleteTask
}
