const Task = require("../models/Task")

async function getAllTasks(req, res, next) {
    try {
        const tasks = await Task.find().populate("owner")
        return res.status(200).json({
            message: "Successfully fetched all tasks",
            tasks: tasks
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function getTaskByID(req, res, next) {
    try {
        const taskID = req.params.taskID
        const task = await Task.findById(taskID).populate("owner")
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        return res.status(200).json({
            message: "Successfully fetched the task",
            task: task
        })
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
            bounty: body.bounty
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

module.exports = { getAllTasks, createTask, getTaskByID }
