const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Task",
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Application", applicationSchema);
