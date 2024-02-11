const express = require("express")
const { authenticate } = require("../middlewares/auth")
const {
    getAllApplications,
    createApplication,
    getApplicationByID,
    deleteApplication,
    updateApplication
} = require("../controllers/application")
const router = express.Router()

router.get("/", getAllApplications)
router.get("/:applicationID", getApplicationByID)
router.post("/create", authenticate, createApplication)
router.delete("/delete/:applicationID", authenticate, deleteApplication)
router.patch("/update/:applicationID", authenticate, updateApplication)

module.exports = router
