const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ],
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application"
            }
        ],
        bio: {
            type: String,
            default: "",
        },
        backgroundImageURL: {
            type: String,
            default: "",
        },
        profilePictureURL: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
)

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
userSchema.virtual("populatedApplications", {
    ref: "Application",
    localField: "_id",
    foreignField: "applicant",
  });

const User = mongoose.model("User", userSchema)

module.exports = User
