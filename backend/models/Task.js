const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application"
            }
        ],
        description: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        bounty: {
            type: Number,
            required: true
        },
        tags: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Task", taskSchema)
