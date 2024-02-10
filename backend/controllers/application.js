const Application = require("../models/Application");

async function getAllApplications(req, res, next) {
  try {
    const applications = await Application.find().populate(["task", "applicant"]);
    return res.status(200).json({
      message: "Successfully fetched all applications",
      applications: applications,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getApplicationByID(req, res, next) {
  try {
    const applicationID = req.params.applicationID;
    const application = await Application.findById(applicationID)
      .populate(["task", "applicant"]);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    return res.status(200).json({
      message: "Successfully fetched the application",
      application: application,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createApplication(req, res, next) {
  try {
    const body = req.body;
    const application = new Application({
      name: body.name,
      applicant: body.applicant,
      task: body.task,
      description: body.description,
      demoLink: body.demoLink,
    });
    await application.save();
    return res.status(200).json({
      message: "Successfully created application",
      application: application,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateApplication(req, res, next) {
  try {
    const applicationID = req.params.applicationID;
    const updates = req.body;
    const application = await Application.findByIdAndUpdate(
      applicationID,
      updates,
      { new: true }
    )
      .populate(["task", "applicant"]);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    return res.status(200).json({
      message: "Successfully updated application",
      application: application,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteApplication(req, res, next) {
  try {
    const applicationID = req.params.applicationID;
    const application = await Application.findByIdAndDelete(applicationID);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    return res.status(200).json({
      message: "Successfully deleted application",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  getAllApplications,
  getApplicationByID,
  createApplication,
  updateApplication,
  deleteApplication,
};
