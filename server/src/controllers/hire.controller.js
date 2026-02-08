const Hire = require("../models/Hire.model");

const hireRequest = async (req, res, next) => {
  try {
    const { name, email, projectDetails } = req.body;

    await Hire.create({ name, email, projectDetails });

    res.status(201).json({
      success: true,
      message: "Hire request submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { hireRequest };
